import { footballClubs } from '../data/footballClubs'
import {
  GAME_ROUNDS,
  type FootballGuessAnswer,
  type FootballGuessGameState,
  type FootballGuessHint,
  type FootballGuessQuestion,
} from '../types/game'
import type { FootballClub } from '../data/footballClubs'

const ANSWER_COUNT = 4

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

const createHints = (club: FootballClub): FootballGuessHint[] => [
  {
    icon: club.countryFlag,
    label: 'Država',
    value: club.country,
  },
  {
    icon: '🏆',
    label: 'Liga',
    value: club.league,
  },
  {
    icon: '📍',
    label: 'Mesto',
    value: club.city,
  },
  {
    icon: '🏟️',
    label: 'Stadion',
    value: club.stadium,
  },
  {
    icon: '📜',
    label: 'Ustanovljen',
    value: String(club.founded),
  },
]

const createHarderHints = (club: FootballClub) =>
  shuffle(createHints(club)).slice(0, 3)

const getSimilarClubs = (club: FootballClub) => {
  const sameLeague = footballClubs.filter(
    (candidate) => candidate.id !== club.id && candidate.league === club.league,
  )
  const sameCountry = footballClubs.filter(
    (candidate) =>
      candidate.id !== club.id &&
      candidate.country === club.country &&
      candidate.league !== club.league,
  )
  const fallback = footballClubs.filter((candidate) => candidate.id !== club.id)

  return [...shuffle(sameLeague), ...shuffle(sameCountry), ...shuffle(fallback)]
}

const createOptions = (club: FootballClub) => {
  const selectedClubIds = new Set([club.id])
  const distractors: FootballClub[] = []

  for (const candidate of getSimilarClubs(club)) {
    if (distractors.length >= ANSWER_COUNT - 1) {
      break
    }

    if (!selectedClubIds.has(candidate.id)) {
      distractors.push(candidate)
      selectedClubIds.add(candidate.id)
    }
  }

  return shuffle([club, ...distractors]).slice(0, ANSWER_COUNT)
}

const createQuestion = (club: FootballClub): FootballGuessQuestion => ({
  club,
  hints: createHarderHints(club),
  options: createOptions(club),
})

export const createNewFootballGuessGame = (): FootballGuessGameState => ({
  questions: shuffle(footballClubs).slice(0, GAME_ROUNDS).map(createQuestion),
  currentQuestionIndex: 0,
  answers: [],
  lastAnswer: null,
  isResolving: false,
})

export const getCurrentFootballGuessQuestion = (
  game: FootballGuessGameState,
) => game.questions[game.currentQuestionIndex] ?? null

export const getFootballGuessScore = (game: FootballGuessGameState) =>
  game.answers.filter((answer) => answer.isCorrect).length

export const selectFootballGuessAnswer = (
  game: FootballGuessGameState,
  selectedClubId: string,
): FootballGuessGameState => {
  const question = getCurrentFootballGuessQuestion(game)
  const selectedClub = question?.options.find(
    (option) => option.id === selectedClubId,
  )

  if (!question || !selectedClub || game.isResolving) {
    return game
  }

  const answer: FootballGuessAnswer = {
    questionIndex: game.currentQuestionIndex,
    selectedClubId: selectedClub.id,
    selectedClubName: selectedClub.name,
    correctClubId: question.club.id,
    correctClubName: question.club.name,
    isCorrect: selectedClub.id === question.club.id,
  }

  return {
    ...game,
    answers: [...game.answers, answer],
    lastAnswer: answer,
    isResolving: true,
  }
}

export const advanceAfterFootballGuessAnswer = (
  game: FootballGuessGameState,
): FootballGuessGameState => {
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

export const isFootballGuessGameComplete = (game: FootballGuessGameState) =>
  game.currentQuestionIndex >= GAME_ROUNDS ||
  game.answers.length >= GAME_ROUNDS
