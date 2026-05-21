import { europeCountries } from '../data/europeCountries'
import { europeCategories } from '../data/europeCategories'
import { europeRankings } from '../data/europeRankings'

export function validateEuropeData() {
  const errors: string[] = []
  const countryIds = new Set(europeCountries.map((c) => c.id))
  const categoryIds = new Set(europeCategories.map((c) => c.id))
  const seen = new Set<string>()

  for (const ranking of europeRankings) {
    if (!countryIds.has(ranking.countryId)) errors.push(`Unknown countryId: ${ranking.countryId}`)
    if (!categoryIds.has(ranking.categoryId)) errors.push(`Unknown categoryId: ${ranking.categoryId}`)
    const key = `${ranking.categoryId}::${ranking.countryId}`
    if (seen.has(key)) errors.push(`Duplicate ranking: ${key}`)
    seen.add(key)
  }

  for (const category of europeCategories) {
    const rows = europeRankings.filter((r) => r.categoryId === category.id)
    const ranks = rows.map((r) => r.rank).sort((a, b) => a - b)
    for (let i = 0; i < ranks.length; i += 1) {
      if (ranks[i] !== i + 1) errors.push(`Non-consecutive ranks in ${category.id}: expected ${i + 1}, got ${ranks[i]}`)
    }
    if (category.coverage === 'full' && rows.length !== europeCountries.length) {
      errors.push(`Full coverage category ${category.id} has ${rows.length} rankings, expected ${europeCountries.length}`)
    }
    if (rows.length !== category.availableCountries) {
      errors.push(`Category ${category.id} availableCountries mismatch: ${category.availableCountries} vs ${rows.length}`)
    }
  }

  return {
    countries: europeCountries.length,
    categories: europeCategories.length,
    rankings: europeRankings.length,
    errors,
  }
}
