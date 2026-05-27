import fs from 'node:fs/promises'
import path from 'node:path'

const rawPath = path.resolve('docs/omdb_raw.json')
const outputMoviesPath = path.resolve('src/data/movies.ts')
const outputRankingsPath = path.resolve('src/data/movieRankings.ts')
const currentYear = new Date().getFullYear()

const raw = JSON.parse(await fs.readFile(rawPath, 'utf8'))

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const parseNumber = (value) => {
  if (!value || value === 'N/A') return null
  const cleaned = String(value).replace(/[$,]/g, '').trim()
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
    return { oscarWins: null, oscarNominations: null, awardsWon: null, awardsNominations: null }
  }

  const text = String(value)
  const oscarWins = text.match(/Won (\d+) Oscars?/)?.[1] ?? (text.match(/Won 1 Oscar/) ? '1' : null)
  const oscarNominations = text.match(/Nominated for (\d+) Oscars?/)?.[1] ?? null
  const awardsWon = text.match(/(\d+) wins?/)?.[1] ?? null
  const awardsNominations = text.match(/(\d+) nominations?/)?.[1] ?? null

  return {
    oscarWins: oscarWins ? Number(oscarWins) : null,
    oscarNominations: oscarNominations ? Number(oscarNominations) : null,
    awardsWon: awardsWon ? Number(awardsWon) : null,
    awardsNominations: awardsNominations ? Number(awardsNominations) : null,
  }
}

const valid = raw.filter((entry) => entry.omdb?.Response === 'True')
const movies = valid.map((entry) => {
  const movie = entry.omdb
  const id = slugify(`${movie.Title}-${movie.Year}`)
  return {
    id,
    title: movie.Title,
    year: Number(String(movie.Year).slice(0, 4)),
    director: movie.Director && movie.Director !== 'N/A' ? movie.Director : undefined,
    genres: movie.Genre && movie.Genre !== 'N/A' ? movie.Genre.split(',').map((genre) => genre.trim()) : [],
    runtimeMinutes: parseRuntime(movie.Runtime) ?? undefined,
    posterUrl: movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : undefined,
    shortBio: movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : undefined,
  }
})

const metricValues = []
for (const entry of valid) {
  const movie = entry.omdb
  const movieId = slugify(`${movie.Title}-${movie.Year}`)
  const year = Number(String(movie.Year).slice(0, 4))
  const runtime = parseRuntime(movie.Runtime)
  const boxOffice = parseNumber(movie.BoxOffice)
  const imdbRating = parseNumber(movie.imdbRating)
  const imdbVotes = parseNumber(movie.imdbVotes)
  const metascore = parseNumber(movie.Metascore)
  const awards = parseAwards(movie.Awards)
  const genreCount = movie.Genre && movie.Genre !== 'N/A' ? movie.Genre.split(',').length : null
  const age = Number.isFinite(year) ? currentYear - year : null

  const push = (categoryId, value) => {
    if (value !== null && value !== undefined && Number.isFinite(value)) {
      metricValues.push({ categoryId, movieId, value })
    }
  }

  push('domestic-box-office', boxOffice)
  push('imdb-rating', imdbRating)
  push('imdb-votes', imdbVotes)
  push('metascore', metascore)
  push('runtime-minutes', runtime)
  push('movie-age', age)
  push('oscar-wins', awards.oscarWins)
  push('oscar-nominations', awards.oscarNominations)
  push('awards-won', awards.awardsWon)
  push('awards-nominations', awards.awardsNominations)
  push('genre-count', genreCount)

  if (boxOffice && runtime) push('box-office-per-minute', boxOffice / runtime)
  if (imdbVotes && age && age > 0) push('votes-per-year', imdbVotes / age)
}

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

const toTs = (value) => JSON.stringify(value, null, 2).replace(/"([^"]+)":/g, '$1:')

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
console.log(`Wrote ${outputMoviesPath}`)
console.log(`Wrote ${outputRankingsPath}`)
