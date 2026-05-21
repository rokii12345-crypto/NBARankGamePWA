import { footballClubs } from '../data/footballClubs'
import {
  GAME_ROUNDS,
  type FootballStadiumAnswer,
  type FootballStadiumGameState,
  type FootballStadiumQuestion,
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

const getStadiumDistractors = (club: FootballClub) => {
  const sameLeague = footballClubs.filter(
    (candidate) =>
      candidate.id !== club.id &&
      candidate.league === club.league &&
      candidate.stadium !== club.stadium,
  )
  const sameCountry = footballClubs.filter(
    (candidate) =>
      candidate.id !== club.id &&
      candidate.country === club.country &&
      candidate.league !== club.league &&
      candidate.stadium !== club.stadium,
  )
  const fallback = footballClubs.filter(
    (candidate) => candidate.id !== club.id && candidate.stadium !== club.stadium,
  )

  return [...shuffle(sameLeague), ...shuffle(sameCountry), ...shuffle(fallback)]
}

const createOptions = (club: FootballClub) => {
  const selectedStadiums = new Set([club.stadium])
  const distractors: string[] = []

  for (const candidate of getStadiumDistractors(club)) {
    if (distractors.length >= ANSWER_COUNT - 1) {
      break
    }

    if (!selectedStadiums.has(candidate.stadium)) {
      distractors.push(candidate.stadium)
      selectedStadiums.add(candidate.stadium)
    }
  }

  return shuffle([club.stadium, ...distractors]).slice(0, ANSWER_COUNT)
}

const createQuestion = (club: FootballClub): FootballStadiumQuestion => ({
  club,
  options: createOptions(club),
})

export const createNewFootballStadiumGame = (): FootballStadiumGameState => ({
  questions: shuffle(footballClubs)
    .filter((club) => club.stadium)
    .slice(0, GAME_ROUNDS)
    .map(createQuestion),
  currentQuestionIndex: 0,
  answers: [],
  lastAnswer: null,
  isResolving: false,
})

export const getCurrentFootballStadiumQuestion = (
  game: FootballStadiumGameState,
) => game.questions[game.currentQuestionIndex] ?? null

export const getFootballStadiumScore = (game: FootballStadiumGameState) =>
  game.answers.filter((answer) => answer.isCorrect).length

export const selectFootballStadiumAnswer = (
  game: FootballStadiumGameState,
  selectedStadium: string,
): FootballStadiumGameState => {
  const question = getCurrentFootballStadiumQuestion(game)

  if (
    !question ||
    !question.options.includes(selectedStadium) ||
    game.isResolving
  ) {
    return game
  }

  const answer: FootballStadiumAnswer = {
    questionIndex: game.currentQuestionIndex,
    clubName: question.club.name,
    selectedStadium,
    correctStadium: question.club.stadium,
    isCorrect: selectedStadium === question.club.stadium,
  }

  return {
    ...game,
    answers: [...game.answers, answer],
    lastAnswer: answer,
    isResolving: true,
  }
}

export const advanceAfterFootballStadiumAnswer = (
  game: FootballStadiumGameState,
): FootballStadiumGameState => {
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

export const isFootballStadiumGameComplete = (
  game: FootballStadiumGameState,
) =>
  game.currentQuestionIndex >= GAME_ROUNDS ||
  game.answers.length >= GAME_ROUNDS
