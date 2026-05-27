import fs from 'node:fs/promises'
import path from 'node:path'

const apiKey = process.env.OMDB_API_KEY
if (!apiKey) {
  console.error('Missing OMDB_API_KEY environment variable.')
  console.error('Example: set OMDB_API_KEY=your_key && node tools/fetchOmdbMovies.mjs')
  process.exit(1)
}

const csvPath = path.resolve('docs/movie_titles.csv')
const outputPath = path.resolve('docs/omdb_raw.json')
const text = await fs.readFile(csvPath, 'utf8')
const rows = text.trim().split(/\r?\n/).slice(1).map((line) => {
  const firstComma = line.lastIndexOf(',')
  const title = line.slice(0, firstComma).replace(/^"|"$/g, '').replace(/""/g, '"')
  const year = line.slice(firstComma + 1).trim()
  return { title, year }
})

const results = []
const failedRows = []

for (const [index, row] of rows.entries()) {
  const url = new URL('https://www.omdbapi.com/')
  url.searchParams.set('apikey', apiKey)
  url.searchParams.set('t', row.title)
  url.searchParams.set('y', row.year)
  url.searchParams.set('type', 'movie')
  url.searchParams.set('plot', 'short')
  url.searchParams.set('r', 'json')

  const response = await fetch(url)
  const data = await response.json()

  if (data.Response !== 'True' && data.Error === 'Invalid API key!') {
    console.error('OMDb rejected the API key: Invalid API key.')
    console.error('No raw data was written. Set a real OMDB_API_KEY and rerun.')
    process.exit(1)
  }

  results.push({ input: row, omdb: data })

  const status = data.Response === 'True' ? 'OK' : `ERROR: ${data.Error}`
  console.log(`${index + 1}/${rows.length} ${row.title} (${row.year}) - ${status}`)

  if (data.Response !== 'True') {
    failedRows.push({ ...row, error: data.Error ?? 'Unknown error' })
  }

  // Gentle pacing.
  await new Promise((resolve) => setTimeout(resolve, 120))
}

await fs.writeFile(outputPath, JSON.stringify(results, null, 2), 'utf8')
console.log(`Saved ${outputPath}`)

if (failedRows.length > 0) {
  console.warn('OMDb failed for these titles:')
  for (const row of failedRows) {
    console.warn(`- ${row.title} (${row.year}): ${row.error}`)
  }
  console.warn('Fix title/year values in docs/movie_titles.csv where needed.')
}
