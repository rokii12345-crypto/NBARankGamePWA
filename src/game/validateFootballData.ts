import { footballClubs } from '../data/footballClubs'
import { footballCategories } from '../data/footballCategories'
import { footballRankings } from '../data/footballRankings'

export function validateFootballData() {
  const errors: string[] = []
  const clubIds = new Set(footballClubs.map((club) => club.id))
  const categoryIds = new Set(footballCategories.map((category) => category.id))
  const seenPairs = new Set<string>()

  for (const ranking of footballRankings) {
    if (!clubIds.has(ranking.clubId)) {
      errors.push(`Unknown clubId: ${ranking.clubId}`)
    }

    if (!categoryIds.has(ranking.categoryId)) {
      errors.push(`Unknown categoryId: ${ranking.categoryId}`)
    }

    const pairKey = `${ranking.categoryId}:${ranking.clubId}`
    if (seenPairs.has(pairKey)) {
      errors.push(`Duplicate ranking pair: ${pairKey}`)
    }
    seenPairs.add(pairKey)
  }

  for (const category of footballCategories) {
    const categoryRankings = footballRankings.filter((ranking) => ranking.categoryId === category.id)
    const ranks = categoryRankings.map((ranking) => ranking.rank)
    const uniqueRanks = new Set(ranks)

    if (uniqueRanks.size !== ranks.length) {
      errors.push(`Duplicate ranks in category: ${category.id}`)
    }

    const sortedRanks = [...uniqueRanks].sort((a, b) => a - b)
    for (let index = 0; index < sortedRanks.length; index += 1) {
      const expectedRank = index + 1
      if (sortedRanks[index] !== expectedRank) {
        errors.push(
          `Ranks are not consecutive in category ${category.id}: expected ${expectedRank}, got ${sortedRanks[index]}`,
        )
        break
      }
    }

    if (category.coverage === 'full' && categoryRankings.length > 0) {
      if (categoryRankings.length !== footballClubs.length) {
        errors.push(
          `Full coverage category ${category.id} has ${categoryRankings.length} rankings, expected ${footballClubs.length}`,
        )
      }
    }
  }

  return {
    clubCount: footballClubs.length,
    categoryCount: footballCategories.length,
    rankingCount: footballRankings.length,
    errors,
  }
}
