import fs from 'node:fs/promises'
import path from 'node:path'

const rawPath = path.resolve('docs/wikidata_raw.json')
const financialsPath = path.resolve('docs/movie_financials.csv')
const outputMoviesPath = path.resolve('src/data/movies.ts')
const outputRankingsPath = path.resolve('src/data/movieRankings.ts')
const currentYear = new Date().getFullYear()

const slugify = (value) =>
  String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const readJson = async (filePath) => {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Missing ${filePath}. Run tools/fetchWikidataMovies.mjs first.`)
      process.exit(1)
    }
    throw error
  }
}

const readOptionalText = async (filePath) => {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

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
      if (char === '\r' && nextChar === '\n') index += 1
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

  if (rows.length === 0) return []

  const headers = rows[0].map((header) =>
    header.replace(/^\uFEFF/, '').trim(),
  )

  return rows.slice(1).map((values) =>
    Object.fromEntries(
      headers.map((header, index) => [header, values[index]?.trim() ?? '']),
    ),
  )
}

const parseNumber = (value) => {
  if (value === null || value === undefined) return null
  const text = String(value).trim()
  if (!text || text === 'N/A') return null
  const number = Number(text.replace(/[$,\s_]/g, ''))
  return Number.isFinite(number) ? number : null
}

const raw = await readJson(rawPath)
const results = raw.results ?? []

if (results.length === 0) {
  console.error('Wikidata raw data has no matched movies. Refusing to overwrite movie data.')
  process.exit(1)
}

const movies = results.map((entry) => {
  const item = entry.wikidata
  const title = item.label ?? entry.input.title
  const year = Number(item.year ?? entry.input.year)
  const genres = item.genres?.map((genre) => genre.label).filter(Boolean) ?? []
  const directorNames =
    item.directors?.map((director) => director.label).filter(Boolean) ?? []

  return {
    id: slugify(`${title}-${year}`),
    title,
    year,
    director: directorNames.length > 0 ? directorNames.join(', ') : undefined,
    genres,
    runtimeMinutes: item.runtimeMinutes
      ? Math.round(item.runtimeMinutes)
      : undefined,
    shortBio: item.description || undefined,
  }
})

const moviesById = new Map(movies.map((movie) => [movie.id, movie]))
const moviesByLookupKey = new Map()
for (const movie of movies) {
  const titleKey = slugify(movie.title)
  for (const key of [
    movie.id,
    slugify(`${movie.title}-${movie.year}`),
    `${titleKey}::${movie.year}`,
  ]) {
    moviesByLookupKey.set(key, movie)
  }
}

const metricValuesByKey = new Map()
const pushMetric = (categoryId, movieId, value) => {
  if (value !== null && value !== undefined && Number.isFinite(value)) {
    metricValuesByKey.set(`${categoryId}::${movieId}`, {
      categoryId,
      movieId,
      value,
    })
  }
}

for (const entry of results) {
  const item = entry.wikidata
  const title = item.label ?? entry.input.title
  const year = Number(item.year ?? entry.input.year)
  const movieId = slugify(`${title}-${year}`)

  pushMetric('release-year', movieId, year)
  pushMetric('movie-age', movieId, currentYear - year)
  pushMetric('title-character-count', movieId, title.replace(/\s/g, '').length)
  pushMetric('title-word-count', movieId, title.trim().split(/\s+/).length)
  pushMetric('runtime-minutes', movieId, item.runtimeMinutes)
  pushMetric('genre-count', movieId, item.genres?.length)
  pushMetric('director-count', movieId, item.directors?.length)
  pushMetric('cast-count', movieId, item.castCount || null)
  pushMetric('producer-count', movieId, item.producerCount || null)
  pushMetric('screenwriter-count', movieId, item.screenwriterCount || null)
  pushMetric('composer-count', movieId, item.composerCount || null)
  pushMetric('country-count', movieId, item.countries?.length)
  pushMetric('language-count', movieId, item.languages?.length)
  pushMetric('awards-won', movieId, item.awardsReceivedCount || null)
  pushMetric('worldwide-box-office', movieId, item.boxOfficeUsd)
  pushMetric('production-budget', movieId, item.budgetUsd)

  if (item.boxOfficeUsd !== null && item.budgetUsd !== null) {
    pushMetric('profit', movieId, item.boxOfficeUsd - item.budgetUsd)
    if (item.budgetUsd > 0) {
      pushMetric('return-on-budget', movieId, item.boxOfficeUsd / item.budgetUsd)
    }
  }
}

const financialsText = await readOptionalText(financialsPath)
const financialRows = financialsText ? parseCsv(financialsText) : []
let unmatchedFinancialRows = 0

for (const row of financialRows) {
  const movie =
    (row.id ? moviesById.get(slugify(row.id)) : null) ??
    moviesByLookupKey.get(`${slugify(row.title)}::${Number(row.year)}`)

  if (!movie) {
    unmatchedFinancialRows += 1
    continue
  }

  const productionBudget = parseNumber(row.production_budget_usd)
  const worldwideGross = parseNumber(row.worldwide_gross_usd)

  pushMetric('worldwide-box-office', movie.id, worldwideGross)
  pushMetric('production-budget', movie.id, productionBudget)

  if (worldwideGross !== null && productionBudget !== null) {
    pushMetric('profit', movie.id, worldwideGross - productionBudget)
    if (productionBudget > 0) {
      pushMetric('return-on-budget', movie.id, worldwideGross / productionBudget)
    }
  }
}

const metricValues = [...metricValuesByKey.values()]
const rankings = []

for (const categoryId of [...new Set(metricValues.map((item) => item.categoryId))]) {
  const categoryItems = metricValues
    .filter((item) => item.categoryId === categoryId)
    .sort((left, right) => right.value - left.value)

  categoryItems.forEach((item, index) => {
    rankings.push({
      categoryId,
      movieId: item.movieId,
      rank: index + 1,
      value: Number(item.value.toFixed(2)),
    })
  })
}

const toTs = (value) =>
  JSON.stringify(value, null, 2).replace(/"([^"]+)":/g, '$1:')

await fs.writeFile(
  outputMoviesPath,
  `export type Movie = {
  id: string
  title: string
  year: number
  director?: string
  genres: string[]
  runtimeMinutes?: number
  posterUrl?: string
  shortBio?: string
}

export const movies: Movie[] = ${toTs(movies)}
`,
  'utf8',
)

await fs.writeFile(
  outputRankingsPath,
  `export type MovieRanking = {
  categoryId: string
  movieId: string
  rank: number
  value: number
  year?: number
}

export const movieRankings: MovieRanking[] = ${toTs(rankings)}
`,
  'utf8',
)

console.log(`Movies: ${movies.length}`)
console.log(`Rankings: ${rankings.length}`)
console.log(`Financial rows: ${financialRows.length}`)
if (unmatchedFinancialRows > 0) {
  console.warn(`Unmatched financial rows: ${unmatchedFinancialRows}`)
}
console.log(`Wrote ${outputMoviesPath}`)
console.log(`Wrote ${outputRankingsPath}`)
