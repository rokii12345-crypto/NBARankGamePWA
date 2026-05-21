import { sloveniaCategories } from '../data/sloveniaCategories'
import { sloveniaMunicipalities } from '../data/sloveniaMunicipalities'
import { sloveniaRankings, type SloveniaRanking } from '../data/sloveniaRankings'
import {
  GAME_ROUNDS,
  type HigherLowerChoice,
  type HigherLowerGameState,
  type HigherLowerQuestion,
} from '../types/game'

const REQUIRED_MUNICIPALITIES = GAME_ROUNDS + 1
const MIN_CATEGORY_COVERAGE = 20

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

const municipalitiesById = new Map(
  sloveniaMunicipalities.map((municipality) => [
    municipality.id,
    municipality,
  ]),
)

const rankingsByCategory = sloveniaRankings.reduce(
  (categoryMap, ranking) => {
    const rankings = categoryMap.get(ranking.categoryId) ?? []
    rankings.push(ranking)
    categoryMap.set(ranking.categoryId, rankings)

    return categoryMap
  },
  new Map<string, SloveniaRanking[]>(),
)

const getCategoryRankings = (categoryId: string) =>
  rankingsByCategory
    .get(categoryId)
    ?.filter((ranking) => municipalitiesById.has(ranking.municipalityId)) ?? []

const getUniqueValueRankings = (rankings: SloveniaRanking[]) => {
  const usedValues = new Set<number>()
  const uniqueRankings: SloveniaRanking[] = []

  for (const ranking of shuffle(rankings)) {
    if (!usedValues.has(ranking.value)) {
      uniqueRankings.push(ranking)
      usedValues.add(ranking.value)
    }
  }

  return uniqueRankings
}

const getEligibleCategories = () =>
  sloveniaCategories.filter((category) => {
    const rankings = getCategoryRankings(category.id)
    const uniqueValueCount = new Set(
      rankings.map((ranking) => ranking.value),
    ).size

    return (
      rankings.length >= MIN_CATEGORY_COVERAGE &&
      uniqueValueCount >= REQUIRED_MUNICIPALITIES
    )
  })

const getRequiredMunicipality = (municipalityId: string) => {
  const municipality = municipalitiesById.get(municipalityId)

  if (!municipality) {
    throw new Error(`Manjka občina ${municipalityId}.`)
  }

  return municipality
}

const createQuestions = (
  selectedRankings: SloveniaRanking[],
): HigherLowerQuestion[] =>
  selectedRankings.slice(0, GAME_ROUNDS).map((previousRanking, index) => {
    const nextRanking = selectedRankings[index + 1]

    return {
      previousRanking,
      previousMunicipality: getRequiredMunicipality(
        previousRanking.municipalityId,
      ),
      nextRanking,
      nextMunicipality: getRequiredMunicipality(nextRanking.municipalityId),
    }
  })

const createPlayableRound = () => {
  const category = shuffle(getEligibleCategories())[0]

  if (!category) {
    throw new Error('Ni kategorije za igro Višje ali nižje.')
  }

  const selectedRankings = getUniqueValueRankings(
    getCategoryRankings(category.id),
  ).slice(0, REQUIRED_MUNICIPALITIES)

  return {
    category,
    questions: createQuestions(selectedRankings),
  }
}

export const createNewHigherLowerGame = (): HigherLowerGameState => {
  const { category, questions } = createPlayableRound()

  return {
    category,
    questions,
    currentQuestionIndex: 0,
    answers: [],
    lastAnswer: null,
    isResolving: false,
  }
}

export const getCurrentHigherLowerQuestion = (
  game: HigherLowerGameState,
) => game.questions[game.currentQuestionIndex] ?? null

export const getHigherLowerScore = (game: HigherLowerGameState) =>
  game.answers.filter((answer) => answer.isCorrect).length

export const getCorrectHigherLowerChoice = (
  question: HigherLowerQuestion,
): HigherLowerChoice =>
  question.nextRanking.value > question.previousRanking.value
    ? 'higher'
    : 'lower'

export const selectHigherLowerAnswer = (
  game: HigherLowerGameState,
  choice: HigherLowerChoice,
): HigherLowerGameState => {
  const question = getCurrentHigherLowerQuestion(game)

  if (!question || game.isResolving) {
    return game
  }

  const correctChoice = getCorrectHigherLowerChoice(question)
  const isTie = question.nextRanking.value === question.previousRanking.value
  const answer = {
    questionIndex: game.currentQuestionIndex,
    choice,
    correctChoice,
    isCorrect: isTie || choice === correctChoice,
    previousMunicipalityName: question.previousMunicipality.name,
    nextMunicipalityName: question.nextMunicipality.name,
    previousValue: question.previousRanking.value,
    nextValue: question.nextRanking.value,
  }

  return {
    ...game,
    answers: [...game.answers, answer],
    lastAnswer: answer,
    isResolving: true,
  }
}

export const advanceAfterHigherLowerAnswer = (
  game: HigherLowerGameState,
): HigherLowerGameState => {
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

export const isHigherLowerGameComplete = (game: HigherLowerGameState) =>
  game.currentQuestionIndex >= GAME_ROUNDS ||
  game.answers.length >= GAME_ROUNDS
