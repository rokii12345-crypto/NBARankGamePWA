import { europeCategories } from '../data/europeCategories'
import type { EuropeCategory } from '../data/europeCategories'
import { europeCountries } from '../data/europeCountries'
import type { EuropeCountry } from '../data/europeCountries'
import { europeRankings, type EuropeRanking } from '../data/europeRankings'
import {
  GAME_ROUNDS,
  type EuropeCategoryAssignment,
  type EuropeGameState,
  type EuropeRoundResult,
} from '../types/game'

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

const rankingsByCategory = europeRankings.reduce(
  (categoryMap, ranking) => {
    const countryMap =
      categoryMap.get(ranking.categoryId) ?? new Map<string, EuropeRanking>()

    countryMap.set(ranking.countryId, ranking)
    categoryMap.set(ranking.categoryId, countryMap)

    return categoryMap
  },
  new Map<string, Map<string, EuropeRanking>>(),
)

const countryHasRanking = (countryId: string, categoryId: string) =>
  rankingsByCategory.get(categoryId)?.has(countryId) ?? false

const getEligibleCountries = (categories: EuropeCategory[]) =>
  europeCountries.filter((country) =>
    categories.every((category) => countryHasRanking(country.id, category.id)),
  )

const getPlayableCategorySet = () => {
  for (let attempt = 0; attempt < CATEGORY_SET_ATTEMPTS; attempt += 1) {
    const categories = shuffle(europeCategories).slice(0, GAME_ROUNDS)
    const eligibleCountries = getEligibleCountries(categories)

    if (eligibleCountries.length >= GAME_ROUNDS) {
      return { categories, eligibleCountries }
    }
  }

  const categories = shuffle(
    europeCategories.filter((category) => category.coverage === 'full'),
  ).slice(0, GAME_ROUNDS)

  return {
    categories,
    eligibleCountries: getEligibleCountries(categories),
  }
}

export const createNewEuropeGame = (): EuropeGameState => {
  const { categories, eligibleCountries } = getPlayableCategorySet()

  return {
    countries: shuffle(eligibleCountries).slice(0, GAME_ROUNDS),
    categories,
    currentRoundIndex: 0,
    assignments: [],
    lastResult: null,
    isResolving: false,
  }
}

export const getCurrentEuropeCountry = (game: EuropeGameState) =>
  game.countries[game.currentRoundIndex] ?? null

export const getEuropeTotalScore = (game: EuropeGameState) =>
  game.assignments.reduce((total, assignment) => total + assignment.points, 0)

export const getUsedEuropeCategoryIds = (game: EuropeGameState) =>
  new Set(game.assignments.map((assignment) => assignment.categoryId))

export const findEuropeRanking = (countryId: string, categoryId: string) =>
  rankingsByCategory.get(categoryId)?.get(countryId) ?? null

export const selectCategoryForCurrentEuropeCountry = (
  game: EuropeGameState,
  categoryId: string,
): EuropeGameState => {
  const country = getCurrentEuropeCountry(game)
  const category = game.categories.find((item) => item.id === categoryId)
  const categoryAlreadyUsed = game.assignments.some(
    (assignment) => assignment.categoryId === categoryId,
  )

  if (!country || !category || categoryAlreadyUsed || game.isResolving) {
    return game
  }

  const ranking = findEuropeRanking(country.id, category.id)

  if (!ranking) {
    return game
  }

  const assignment: EuropeCategoryAssignment = {
    categoryId: category.id,
    countryId: country.id,
    countryName: country.name,
    rank: ranking.rank,
    value: ranking.value,
    year: ranking.year,
    points: ranking.rank,
  }

  const lastResult: EuropeRoundResult = {
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

export const advanceAfterEuropeResult = (
  game: EuropeGameState,
): EuropeGameState => {
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

export const isEuropeGameComplete = (game: EuropeGameState) =>
  game.currentRoundIndex >= GAME_ROUNDS ||
  game.assignments.length >= GAME_ROUNDS

export const hasCompleteEuropeCoverage = (
  country: EuropeCountry,
  categories: EuropeCategory[],
) =>
  categories.every((category) => countryHasRanking(country.id, category.id))
