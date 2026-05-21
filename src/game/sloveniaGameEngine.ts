import { sloveniaCategories } from '../data/sloveniaCategories'
import { sloveniaMunicipalities } from '../data/sloveniaMunicipalities'
import { sloveniaRankings, type SloveniaRanking } from '../data/sloveniaRankings'
import {
  GAME_ROUNDS,
  type SloveniaCategoryAssignment,
  type SloveniaGameState,
  type SloveniaRoundResult,
} from '../types/game'
import type { SloveniaCategory } from '../data/sloveniaCategories'
import type { SloveniaMunicipality } from '../data/sloveniaMunicipalities'

const CATEGORY_SET_ATTEMPTS = 500

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items]

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const current = copy[index]
    copy[index] = copy[randomIndex]
    copy[randomIndex] = current
  }

  return copy
}

const rankingsByCategory = sloveniaRankings.reduce(
  (categoryMap, ranking) => {
    const municipalityMap =
      categoryMap.get(ranking.categoryId) ??
      new Map<string, SloveniaRanking>()

    municipalityMap.set(ranking.municipalityId, ranking)
    categoryMap.set(ranking.categoryId, municipalityMap)

    return categoryMap
  },
  new Map<string, Map<string, SloveniaRanking>>(),
)

const municipalityHasRanking = (
  municipalityId: string,
  categoryId: string,
) => rankingsByCategory.get(categoryId)?.has(municipalityId) ?? false

const getEligibleMunicipalities = (categories: SloveniaCategory[]) =>
  sloveniaMunicipalities.filter((municipality) =>
    categories.every((category) =>
      municipalityHasRanking(municipality.id, category.id),
    ),
  )

const getPlayableCategorySet = () => {
  for (let attempt = 0; attempt < CATEGORY_SET_ATTEMPTS; attempt += 1) {
    const categories = shuffle(sloveniaCategories).slice(0, GAME_ROUNDS)
    const eligibleMunicipalities = getEligibleMunicipalities(categories)

    if (eligibleMunicipalities.length >= GAME_ROUNDS) {
      return { categories, eligibleMunicipalities }
    }
  }

  const categories = shuffle(
    sloveniaCategories.filter((category) => category.coverage === 'all-212'),
  ).slice(0, GAME_ROUNDS)

  return {
    categories,
    eligibleMunicipalities: getEligibleMunicipalities(categories),
  }
}

export const createNewSloveniaGame = (): SloveniaGameState => {
  const { categories, eligibleMunicipalities } = getPlayableCategorySet()

  return {
    municipalities: shuffle(eligibleMunicipalities).slice(0, GAME_ROUNDS),
    categories,
    currentRoundIndex: 0,
    assignments: [],
    lastResult: null,
    isResolving: false,
  }
}

export const getCurrentMunicipality = (game: SloveniaGameState) =>
  game.municipalities[game.currentRoundIndex] ?? null

export const getSloveniaTotalScore = (game: SloveniaGameState) =>
  game.assignments.reduce((total, assignment) => total + assignment.points, 0)

export const getUsedSloveniaCategoryIds = (game: SloveniaGameState) =>
  new Set(game.assignments.map((assignment) => assignment.categoryId))

export const findSloveniaRanking = (
  municipalityId: string,
  categoryId: string,
) => rankingsByCategory.get(categoryId)?.get(municipalityId) ?? null

export const selectCategoryForCurrentMunicipality = (
  game: SloveniaGameState,
  categoryId: string,
): SloveniaGameState => {
  const municipality = getCurrentMunicipality(game)
  const category = game.categories.find((item) => item.id === categoryId)
  const categoryAlreadyUsed = game.assignments.some(
    (assignment) => assignment.categoryId === categoryId,
  )

  if (!municipality || !category || categoryAlreadyUsed || game.isResolving) {
    return game
  }

  const ranking = findSloveniaRanking(municipality.id, category.id)

  if (!ranking) {
    return game
  }

  const assignment: SloveniaCategoryAssignment = {
    categoryId: category.id,
    municipalityId: municipality.id,
    municipalityName: municipality.name,
    rank: ranking.rank,
    value: ranking.value,
    points: ranking.rank,
  }

  const lastResult: SloveniaRoundResult = {
    ...assignment,
    categoryTitle: category.title,
    unit: category.unit,
    decimals: category.decimals,
  }

  return {
    ...game,
    assignments: [...game.assignments, assignment],
    lastResult,
    isResolving: true,
  }
}

export const advanceAfterSloveniaResult = (
  game: SloveniaGameState,
): SloveniaGameState => {
  if (!game.isResolving) {
    return game
  }

  return {
    ...game,
    currentRoundIndex: game.currentRoundIndex + 1,
    lastResult: null,
    isResolving: false,
  }
}

export const isSloveniaGameComplete = (game: SloveniaGameState) =>
  game.currentRoundIndex >= GAME_ROUNDS ||
  game.assignments.length >= GAME_ROUNDS

export const hasCompleteSloveniaCoverage = (
  municipality: SloveniaMunicipality,
  categories: SloveniaCategory[],
) =>
  categories.every((category) =>
    municipalityHasRanking(municipality.id, category.id),
  )
