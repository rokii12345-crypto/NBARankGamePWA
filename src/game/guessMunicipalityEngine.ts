import { sloveniaCategories } from '../data/sloveniaCategories'
import { sloveniaMunicipalities } from '../data/sloveniaMunicipalities'
import { sloveniaRankings, type SloveniaRanking } from '../data/sloveniaRankings'
import {
  GAME_ROUNDS,
  type GuessMunicipalityAnswer,
  type GuessMunicipalityGameState,
  type GuessMunicipalityHint,
  type GuessMunicipalityQuestion,
} from '../types/game'
import type { SloveniaCategory } from '../data/sloveniaCategories'
import type { SloveniaMunicipality } from '../data/sloveniaMunicipalities'

const POPULATION_CATEGORY_ID = 'population'
const HINT_COUNT = 5
const ANSWER_COUNT = 4
const SIMILAR_SIZE_POOL = 28

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

const categoriesById = new Map(
  sloveniaCategories.map((category) => [category.id, category]),
)

const municipalitiesById = new Map(
  sloveniaMunicipalities.map((municipality) => [
    municipality.id,
    municipality,
  ]),
)

const rankingsByMunicipality = sloveniaRankings.reduce(
  (municipalityMap, ranking) => {
    const categoryMap =
      municipalityMap.get(ranking.municipalityId) ??
      new Map<string, SloveniaRanking>()

    categoryMap.set(ranking.categoryId, ranking)
    municipalityMap.set(ranking.municipalityId, categoryMap)

    return municipalityMap
  },
  new Map<string, Map<string, SloveniaRanking>>(),
)

const populationRankings = sloveniaRankings.filter(
  (ranking) => ranking.categoryId === POPULATION_CATEGORY_ID,
)

const getRanking = (municipalityId: string, categoryId: string) =>
  rankingsByMunicipality.get(municipalityId)?.get(categoryId) ?? null

const getPopulationRank = (municipalityId: string) =>
  getRanking(municipalityId, POPULATION_CATEGORY_ID)?.rank ??
  Number.MAX_SAFE_INTEGER

const getRequiredPopulationCategory = () => {
  const category = categoriesById.get(POPULATION_CATEGORY_ID)

  if (!category) {
    throw new Error('Manjka kategorija population.')
  }

  return category
}

const getRequiredPopulationRanking = (municipalityId: string) => {
  const ranking = getRanking(municipalityId, POPULATION_CATEGORY_ID)

  if (!ranking) {
    throw new Error(`Občina ${municipalityId} nima population rankinga.`)
  }

  return ranking
}

const getAvailableHintCategories = (municipalityId: string) =>
  sloveniaCategories.filter(
    (category) =>
      category.id !== POPULATION_CATEGORY_ID &&
      Boolean(getRanking(municipalityId, category.id)),
  )

const toHint = (
  municipality: SloveniaMunicipality,
  category: SloveniaCategory,
) => {
  const ranking = getRanking(municipality.id, category.id)

  if (!ranking) {
    return null
  }

  return { category, ranking }
}

const isHint = (
  hint: GuessMunicipalityHint | null,
): hint is GuessMunicipalityHint => Boolean(hint)

const createHints = (municipality: SloveniaMunicipality) => {
  const populationHint: GuessMunicipalityHint = {
    category: getRequiredPopulationCategory(),
    ranking: getRequiredPopulationRanking(municipality.id),
  }
  const otherHints = shuffle(getAvailableHintCategories(municipality.id))
    .slice(0, HINT_COUNT - 1)
    .map((category) => toHint(municipality, category))
    .filter(isHint)

  return [populationHint, ...otherHints]
}

const getSimilarSizedMunicipalities = (municipality: SloveniaMunicipality) => {
  const correctPopulationRank = getPopulationRank(municipality.id)

  return sloveniaMunicipalities
    .filter((candidate) => candidate.id !== municipality.id)
    .filter((candidate) => getRanking(candidate.id, POPULATION_CATEGORY_ID))
    .sort(
      (firstCandidate, secondCandidate) =>
        Math.abs(getPopulationRank(firstCandidate.id) - correctPopulationRank) -
        Math.abs(getPopulationRank(secondCandidate.id) - correctPopulationRank),
    )
}

const createAnswerOptions = (municipality: SloveniaMunicipality) => {
  const selectedIds = new Set([municipality.id])
  const distractors: SloveniaMunicipality[] = []
  const similarCandidates = shuffle(
    getSimilarSizedMunicipalities(municipality).slice(0, SIMILAR_SIZE_POOL),
  )
  const fallbackCandidates = shuffle(
    sloveniaMunicipalities.filter(
      (candidate) => candidate.id !== municipality.id,
    ),
  )

  for (const candidate of [...similarCandidates, ...fallbackCandidates]) {
    if (distractors.length >= ANSWER_COUNT - 1) {
      break
    }

    if (!selectedIds.has(candidate.id)) {
      distractors.push(candidate)
      selectedIds.add(candidate.id)
    }
  }

  return shuffle([municipality, ...distractors]).slice(0, ANSWER_COUNT)
}

const createQuestion = (
  municipality: SloveniaMunicipality,
): GuessMunicipalityQuestion => ({
  municipality,
  hints: createHints(municipality),
  options: createAnswerOptions(municipality),
})

const getEligibleMunicipalities = () =>
  populationRankings
    .map((ranking) => municipalitiesById.get(ranking.municipalityId))
    .filter((municipality): municipality is SloveniaMunicipality =>
      Boolean(municipality),
    )
    .filter(
      (municipality) =>
        getAvailableHintCategories(municipality.id).length >= HINT_COUNT - 1,
    )

export const createNewGuessMunicipalityGame =
  (): GuessMunicipalityGameState => ({
    questions: shuffle(getEligibleMunicipalities())
      .slice(0, GAME_ROUNDS)
      .map(createQuestion),
    currentQuestionIndex: 0,
    answers: [],
    lastAnswer: null,
    isResolving: false,
  })

export const getCurrentGuessMunicipalityQuestion = (
  game: GuessMunicipalityGameState,
) => game.questions[game.currentQuestionIndex] ?? null

export const getGuessMunicipalityScore = (
  game: GuessMunicipalityGameState,
) => game.answers.filter((answer) => answer.isCorrect).length

export const selectGuessMunicipalityAnswer = (
  game: GuessMunicipalityGameState,
  selectedMunicipalityId: string,
): GuessMunicipalityGameState => {
  const question = getCurrentGuessMunicipalityQuestion(game)
  const selectedMunicipality = question?.options.find(
    (option) => option.id === selectedMunicipalityId,
  )

  if (!question || !selectedMunicipality || game.isResolving) {
    return game
  }

  const answer: GuessMunicipalityAnswer = {
    questionIndex: game.currentQuestionIndex,
    selectedMunicipalityId: selectedMunicipality.id,
    selectedMunicipalityName: selectedMunicipality.name,
    correctMunicipalityId: question.municipality.id,
    correctMunicipalityName: question.municipality.name,
    isCorrect: selectedMunicipality.id === question.municipality.id,
  }

  return {
    ...game,
    answers: [...game.answers, answer],
    lastAnswer: answer,
    isResolving: true,
  }
}

export const advanceAfterGuessMunicipalityAnswer = (
  game: GuessMunicipalityGameState,
): GuessMunicipalityGameState => {
  if (!game.isResolving) {
    return game
  }

  return {
    ...game,
    currentQuestionIndex: game.currentQuestionIndex + 1,
    lastAnswer: null,
    isResolving: false,
  }
}

export const isGuessMunicipalityGameComplete = (
  game: GuessMunicipalityGameState,
) =>
  game.currentQuestionIndex >= GAME_ROUNDS ||
  game.answers.length >= GAME_ROUNDS
