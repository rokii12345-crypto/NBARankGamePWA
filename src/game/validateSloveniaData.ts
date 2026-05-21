import { sloveniaCategories } from '../data/sloveniaCategories'
import { sloveniaMunicipalities } from '../data/sloveniaMunicipalities'
import { sloveniaRankings } from '../data/sloveniaRankings'

type CategoryValidationSummary = {
  categoryId: string
  coverage: string
  rankingCount: number
}

export type SloveniaDataValidationResult = {
  ok: boolean
  errors: string[]
  municipalityCount: number
  categoryCount: number
  rankingCount: number
  categories: CategoryValidationSummary[]
}

export function validateSloveniaData(): SloveniaDataValidationResult {
  const errors: string[] = []
  const municipalityIds = new Set(
    sloveniaMunicipalities.map((municipality) => municipality.id),
  )
  const categoryIds = new Set(
    sloveniaCategories.map((category) => category.id),
  )
  const rankingPairs = new Set<string>()
  const rankingsByCategory = new Map<
    string,
    typeof sloveniaRankings
  >()

  for (const ranking of sloveniaRankings) {
    if (!municipalityIds.has(ranking.municipalityId)) {
      errors.push(`Neznan municipalityId: ${ranking.municipalityId}`)
    }

    if (!categoryIds.has(ranking.categoryId)) {
      errors.push(`Neznan categoryId: ${ranking.categoryId}`)
    }

    const pairKey = `${ranking.categoryId}::${ranking.municipalityId}`

    if (rankingPairs.has(pairKey)) {
      errors.push(`Podvojen categoryId + municipalityId par: ${pairKey}`)
    }

    rankingPairs.add(pairKey)

    const categoryRankings = rankingsByCategory.get(ranking.categoryId) ?? []
    categoryRankings.push(ranking)
    rankingsByCategory.set(ranking.categoryId, categoryRankings)
  }

  const categories = sloveniaCategories.map((category) => {
    const categoryRankings = rankingsByCategory.get(category.id) ?? []
    const sortedRanks = categoryRankings
      .map((ranking) => ranking.rank)
      .sort((firstRank, secondRank) => firstRank - secondRank)
    const uniqueRanks = new Set(sortedRanks)

    if (uniqueRanks.size !== sortedRanks.length) {
      errors.push(`Kategorija ${category.id} ima podvojene ranke`)
    }

    for (let index = 0; index < sortedRanks.length; index += 1) {
      if (sortedRanks[index] !== index + 1) {
        errors.push(
          `Kategorija ${category.id} nima zaporednih rankov od 1 do ${sortedRanks.length}`,
        )
        break
      }
    }

    if (category.coverage === 'all-212' && categoryRankings.length !== 212) {
      errors.push(
        `Kategorija ${category.id} je označena kot all-212, ima pa ${categoryRankings.length} zapisov`,
      )
    }

    return {
      categoryId: category.id,
      coverage: category.coverage,
      rankingCount: categoryRankings.length,
    }
  })

  return {
    ok: errors.length === 0,
    errors,
    municipalityCount: sloveniaMunicipalities.length,
    categoryCount: sloveniaCategories.length,
    rankingCount: sloveniaRankings.length,
    categories,
  }
}
