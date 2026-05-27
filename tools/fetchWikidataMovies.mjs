import fs from 'node:fs/promises'
import path from 'node:path'

const csvPath = path.resolve('docs/movie_titles.csv')
const overridesPath = path.resolve('docs/movie_wikidata_overrides.csv')
const outputPath = path.resolve('docs/wikidata_raw.json')
const apiUrl = 'https://www.wikidata.org/w/api.php'
const userAgent = 'NBARankGamePWA/1.0 local no-key movie data builder'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const slugify = (value) =>
  String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const parseCsv = (text) => {
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    const nextChar = text[index + 1]

    if (char === '"' && inQuotes && nextChar === '"') {
      cell += '"'
      index += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(cell)
      cell = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        index += 1
      }
      row.push(cell)
      if (row.some((value) => value.trim() !== '')) rows.push(row)
      row = []
      cell = ''
      continue
    }

    cell += char
  }

  row.push(cell)
  if (row.some((value) => value.trim() !== '')) rows.push(row)

  const headers = rows[0].map((header) =>
    header.replace(/^\uFEFF/, '').trim(),
  )

  return rows.slice(1).map((values) =>
    Object.fromEntries(
      headers.map((header, index) => [header, values[index]?.trim() ?? '']),
    ),
  )
}

const readOptionalText = async (filePath) => {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

const readOptionalJson = async (filePath) => {
  const text = await readOptionalText(filePath)
  return text ? JSON.parse(text) : null
}

const getInputKey = (input) => `${slugify(input.title)}::${Number(input.year)}`

const fetchJson = async (url, attempt = 1) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': userAgent,
      Accept: 'application/json',
    },
  })

  if (response.status === 429 && attempt <= 5) {
    const retryAfter = Number(response.headers.get('retry-after'))
    const delayMs = Number.isFinite(retryAfter)
      ? retryAfter * 1000
      : attempt * 2500

    await sleep(delayMs)
    return fetchJson(url, attempt + 1)
  }

  if (!response.ok) {
    throw new Error(`Wikidata request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

const searchEntities = async (title) => {
  const url = new URL(apiUrl)
  url.searchParams.set('action', 'wbsearchentities')
  url.searchParams.set('search', title)
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', '10')

  const data = await fetchJson(url)
  return data.search?.map((item) => item.id).filter(Boolean) ?? []
}

const getEntities = async (ids) => {
  if (ids.length === 0) return {}

  const url = new URL(apiUrl)
  url.searchParams.set('action', 'wbgetentities')
  url.searchParams.set('ids', ids.join('|'))
  url.searchParams.set('props', 'claims|labels|descriptions')
  url.searchParams.set('languages', 'en')
  url.searchParams.set('format', 'json')

  const data = await fetchJson(url)
  return data.entities ?? {}
}

const getClaimValues = (entity, propertyId) =>
  entity.claims?.[propertyId]
    ?.map((claim) => claim.mainsnak?.datavalue?.value)
    .filter(Boolean) ?? []

const getClaimEntityIds = (entity, propertyId) =>
  [
    ...new Set(
      getClaimValues(entity, propertyId)
        .map((value) => value.id)
        .filter(Boolean),
    ),
  ]

const getClaimCount = (entity, propertyId) =>
  getClaimEntityIds(entity, propertyId).length

const parseYearFromTime = (timeValue) => {
  const match = String(timeValue ?? '').match(/^\+?(-?\d{1,6})/)
  return match ? Number(match[1]) : null
}

const getPublicationYear = (entity) => {
  const years = getClaimValues(entity, 'P577')
    .map((value) => parseYearFromTime(value.time))
    .filter((year) => Number.isFinite(year))

  return years[0] ?? null
}

const parseUnitId = (unit) => String(unit ?? '').split('/').pop()

const getQuantity = (entity, propertyId) => {
  const values = getClaimValues(entity, propertyId)
    .map((value) => ({
      amount: Number(value.amount),
      unitId: parseUnitId(value.unit),
    }))
    .filter((value) => Number.isFinite(value.amount))

  return values[0] ?? null
}

const getDurationMinutes = (entity) => {
  const quantity = getQuantity(entity, 'P2047')
  if (!quantity) return null

  if (quantity.unitId === 'Q11574') {
    return quantity.amount / 60
  }

  return quantity.amount
}

const getUsdQuantity = (entity, propertyId) => {
  const quantity = getQuantity(entity, propertyId)
  if (!quantity) return null

  if (quantity.unitId !== '1' && quantity.unitId !== 'Q4917') {
    return null
  }

  return quantity.amount
}

const getLabel = (entity) => entity.labels?.en?.value ?? null
const getDescription = (entity) => entity.descriptions?.en?.value ?? ''

const isLikelyFilm = (entity) => {
  const instanceIds = getClaimEntityIds(entity, 'P31')
  const description = getDescription(entity).toLowerCase()

  return instanceIds.includes('Q11424') || description.includes('film')
}

const scoreEntity = (entity, input) => {
  const label = getLabel(entity) ?? ''
  const labelKey = slugify(label)
  const titleKey = slugify(input.title)
  const publicationYear = getPublicationYear(entity)
  let score = 0

  if (isLikelyFilm(entity)) score += 100
  if (publicationYear === Number(input.year)) score += 50
  if (labelKey === titleKey) score += 35
  if (labelKey.includes(titleKey) || titleKey.includes(labelKey)) score += 10

  return score
}

const chunk = (items, size) => {
  const chunks = []
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }
  return chunks
}

const readLabelMap = async (ids) => {
  const labelMap = new Map()
  const uniqueIds = [...new Set(ids)]

  for (const idChunk of chunk(uniqueIds, 50)) {
    const entities = await getEntities(idChunk)
    for (const [id, entity] of Object.entries(entities)) {
      labelMap.set(id, getLabel(entity) ?? id)
    }
    await sleep(80)
  }

  return labelMap
}

const toLabelItems = (ids, labelMap) =>
  ids.map((id) => ({
    id,
    label: labelMap.get(id) ?? id,
  }))

const text = await fs.readFile(csvPath, 'utf8')
const rows = parseCsv(text)
const overridesText = await readOptionalText(overridesPath)
const overrides = new Map(
  (overridesText ? parseCsv(overridesText) : [])
    .filter((row) => row.wikidata_id)
    .map((row) => [getInputKey(row), row.wikidata_id]),
)
const existingRaw = await readOptionalJson(outputPath)
const existingResults = new Map(
  (existingRaw?.results ?? []).map((entry) => [getInputKey(entry.input), entry]),
)
const selectedEntities = []
const resultByKey = new Map(existingResults)
const failureByKey = new Map()

for (const [index, row] of rows.entries()) {
  const key = getInputKey(row)
  const overrideId = overrides.get(key)

  if (!overrideId && existingResults.has(key)) {
    console.log(`${index + 1}/${rows.length} ${row.title} (${row.year}) - CACHED`)
    continue
  }

  const searchIds = overrideId ? [overrideId] : await searchEntities(row.title)
  const entities = await getEntities(searchIds)
  const candidates = Object.values(entities)
    .map((entity) => ({
      entity,
      score: scoreEntity(entity, row),
    }))
    .sort((left, right) => right.score - left.score)

  const selected = candidates[0]?.score >= 120 ? candidates[0].entity : null

  if (selected) {
    selectedEntities.push({ input: row, entity: selected })
    console.log(`${index + 1}/${rows.length} ${row.title} (${row.year}) - OK ${selected.id}`)
  } else {
    failureByKey.set(key, {
      input: row,
      error: 'No matching Wikidata film entity',
    })
    console.log(`${index + 1}/${rows.length} ${row.title} (${row.year}) - ERROR`)
  }

  await sleep(350)
}

const labelIds = []
for (const item of selectedEntities) {
  for (const propertyId of ['P57', 'P136', 'P495', 'P364']) {
    labelIds.push(...getClaimEntityIds(item.entity, propertyId))
  }
}

const labelMap = await readLabelMap(labelIds)

for (const { input, entity } of selectedEntities) {
  const directorIds = getClaimEntityIds(entity, 'P57')
  const genreIds = getClaimEntityIds(entity, 'P136')
  const countryIds = getClaimEntityIds(entity, 'P495')
  const languageIds = getClaimEntityIds(entity, 'P364')

  resultByKey.set(getInputKey(input), {
    input,
    wikidata: {
      id: entity.id,
      label: getLabel(entity),
      description: getDescription(entity),
      year: getPublicationYear(entity) ?? Number(input.year),
      runtimeMinutes: getDurationMinutes(entity),
      budgetUsd: getUsdQuantity(entity, 'P2130'),
      boxOfficeUsd: getUsdQuantity(entity, 'P2142'),
      directors: toLabelItems(directorIds, labelMap),
      genres: toLabelItems(genreIds, labelMap),
      countries: toLabelItems(countryIds, labelMap),
      languages: toLabelItems(languageIds, labelMap),
      castCount: getClaimCount(entity, 'P161'),
      producerCount: getClaimCount(entity, 'P162'),
      screenwriterCount: getClaimCount(entity, 'P58'),
      composerCount: getClaimCount(entity, 'P86'),
      awardsReceivedCount: getClaimCount(entity, 'P166'),
    },
  })
}

const results = rows
  .map((row) => resultByKey.get(getInputKey(row)))
  .filter(Boolean)
const failures = rows
  .map((row) => failureByKey.get(getInputKey(row)))
  .filter(Boolean)

await fs.writeFile(
  outputPath,
  JSON.stringify(
    {
      source: 'Wikidata',
      generatedAt: new Date().toISOString(),
      results,
      failures,
    },
    null,
    2,
  ),
  'utf8',
)

console.log(`Saved ${outputPath}`)
console.log(`Matched: ${results.length}`)
console.log(`Failed: ${failures.length}`)

if (failures.length > 0) {
  console.warn('Fix these titles/years in docs/movie_titles.csv if needed:')
  for (const failure of failures) {
    console.warn(`- ${failure.input.title} (${failure.input.year}): ${failure.error}`)
  }
}
