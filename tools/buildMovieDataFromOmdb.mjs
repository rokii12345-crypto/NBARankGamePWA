import fs from 'node:fs/promises'
import path from 'node:path'

const rawPath = path.resolve('docs/omdb_raw.json')
const financialsPath = path.resolve('docs/movie_financials.csv')
const outputMoviesPath = path.resolve('src/data/movies.ts')
const outputRankingsPath = path.resolve('src/data/movieRankings.ts')
const currentYear = new Date().getFullYear()

const readRequiredJson = async (filePath) => {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Missing ${filePath}.`)
      console.error('Run tools/fetchOmdbMovies.mjs before building movie data.')
      process.exit(1)
    }

    throw error
  }
}

const readOptionalText = async (filePath) => {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null
    }

    throw error
  }
}

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
      if (row.some((value) => value.trim() !== '')) {
        rows.push(row)
      }
      row = []
      cell = ''
      continue
    }

    cell += char
  }

  row.push(cell)
  if (row.some((value) => value.trim() !== '')) {
    rows.push(row)
  }

  if (rows.length === 0) {
    return []
  }

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

  const cleaned = text.replace(/[$,\s_]/g, '')
  const number = Number(cleaned)
  return Number.isFinite(number) ? number : null
}

const parseRuntime = (value) => {
  if (!value || value === 'N/A') return null
  const match = String(value).match(/(\d+)/)
  return match ? Number(match[1]) : null
}

const parseAwards = (value) => {
  if (!value || value === 'N/A') {
    return {
      oscarWins: null,
      oscarNominations: null,
      awardsWon: null,
      awardsNominations: null,
    }
  }

  const text = String(value)
  const oscarWins =
    text.match(/Won (\d+) Oscars?/)?.[1] ??
    (text.match(/Won 1 Oscar/) ? '1' : null)
  const oscarNominations =
    text.match(/Nominated for (\d+) Oscars?/)?.[1] ?? null
  const awardsWon = text.match(/(\d+) wins?/)?.[1] ?? null
  const awardsNominations = text.match(/(\d+) nominations?/)?.[1] ?? null

  return {
    oscarWins: oscarWins ? Number(oscarWins) : null,
    oscarNominations: oscarNominations ? Number(oscarNominations) : null,
    awardsWon: awardsWon ? Number(awardsWon) : null,
    awardsNominations: awardsNominations ? Number(awardsNominations) : null,
  }
}

const getMovieYear = (movie) => Number(String(movie.Year).slice(0, 4))

const raw = await readRequiredJson(rawPath)
const valid = raw.filter((entry) => entry.omdb?.Response === 'True')
const failedRows = raw.filter((entry) => entry.omdb?.Response !== 'True')

if (raw.length > 0 && valid.length === 0) {
  const hasInvalidApiKey = failedRows.some(
    (entry) => entry.omdb?.Error === 'Invalid API key!',
  )

  if (hasInvalidApiKey) {
    console.error('OMDb raw data contains only invalid API key errors.')
    console.error('Refusing to overwrite movies.ts and movieRankings.ts.')
    console.error('Set a real OMDB_API_KEY and rerun tools/fetchOmdbMovies.mjs.')
    process.exit(1)
  }

  console.error('OMDb raw data contains no successful movie responses.')
  console.error('Refusing to overwrite movies.ts and movieRankings.ts.')
  for (const entry of failedRows) {
    const input = entry.input ?? {}
    console.error(`- ${input.title ?? 'Unknown title'} (${input.year ?? 'unknown year'}): ${entry.omdb?.Error ?? 'Unknown error'}`)
  }
  process.exit(1)
}

const movies = valid.map((entry) => {
  const movie = entry.omdb
  const year = getMovieYear(movie)
  const id = slugify(`${movie.Title}-${year}`)

  return {
    id,
    title: movie.Title,
    year,
    director:
      movie.Director && movie.Director !== 'N/A' ? movie.Director : undefined,
    genres:
      movie.Genre && movie.Genre !== 'N/A'
        ? movie.Genre.split(',').map((genre) => genre.trim())
        : [],
    runtimeMinutes: parseRuntime(movie.Runtime) ?? undefined,
    posterUrl: movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : undefined,
    shortBio: movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : undefined,
  }
})

const moviesByLookupKey = new Map()
for (const movie of movies) {
  const titleKey = slugify(movie.title)
  const keys = [
    movie.id,
    titleKey,
    slugify(`${movie.title}-${movie.year}`),
    `${titleKey}::${movie.year}`,
  ]

  for (const key of keys) {
    moviesByLookupKey.set(key, movie)
  }
}

const resolveFinancialMovie = (row) => {
  if (row.id) {
    const movie = moviesByLookupKey.get(slugify(row.id))
    if (movie) return movie
  }

  const titleKey = slugify(row.title)
  const year = Number(row.year)
  if (!titleKey || !Number.isFinite(year)) {
    return null
  }

  return moviesByLookupKey.get(`${titleKey}::${year}`) ?? null
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

for (const entry of valid) {
  const movie = entry.omdb
  const year = getMovieYear(movie)
  const movieId = slugify(`${movie.Title}-${year}`)
  const runtime = parseRuntime(movie.Runtime)
  const boxOffice = parseNumber(movie.BoxOffice)
  const imdbRating = parseNumber(movie.imdbRating)
  const imdbVotes = parseNumber(movie.imdbVotes)
  const metascore = parseNumber(movie.Metascore)
  const awards = parseAwards(movie.Awards)
  const genreCount =
    movie.Genre && movie.Genre !== 'N/A' ? movie.Genre.split(',').length : null
  const age = Number.isFinite(year) ? currentYear - year : null

  pushMetric('domestic-box-office', movieId, boxOffice)
  pushMetric('imdb-rating', movieId, imdbRating)
  pushMetric('imdb-votes', movieId, imdbVotes)
  pushMetric('metascore', movieId, metascore)
  pushMetric('runtime-minutes', movieId, runtime)
  pushMetric('movie-age', movieId, age)
  pushMetric('oscar-wins', movieId, awards.oscarWins)
  pushMetric('oscar-nominations', movieId, awards.oscarNominations)
  pushMetric('awards-won', movieId, awards.awardsWon)
  pushMetric('awards-nominations', movieId, awards.awardsNominations)
  pushMetric('genre-count', movieId, genreCount)

  if (boxOffice && runtime) {
    pushMetric('box-office-per-minute', movieId, boxOffice / runtime)
  }
  if (imdbVotes && age && age > 0) {
    pushMetric('votes-per-year', movieId, imdbVotes / age)
  }
}

const financialsText = await readOptionalText(financialsPath)
const financialRows = financialsText ? parseCsv(financialsText) : []
let unmatchedFinancialRows = 0

for (const row of financialRows) {
  const movie = resolveFinancialMovie(row)

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
    .sort((a, b) => b.value - a.value)

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
