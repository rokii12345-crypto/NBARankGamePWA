import { nbaCategories } from '../data/nbaCategories'
import { nbaPlayers, type NBAPlayer } from '../data/nbaPlayers'
import { nbaRankings, type NBARanking } from '../data/nbaRankings'
import { formatStatValue } from './formatResult'
import {
  GAME_ROUNDS,
  type NBAGuessAnswer,
  type NBAGuessGameState,
  type NBAGuessHint,
  type NBAGuessQuestion,
} from '../types/game'

const ANSWER_COUNT = 4
const STAT_HINT_COUNT = 2

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
  nbaCategories.map((category) => [category.id, category]),
)

const rankingsByPlayer = nbaRankings.reduce(
  (playerMap, ranking) => {
    const rankings = playerMap.get(ranking.playerId) ?? []
    rankings.push(ranking)
    playerMap.set(ranking.playerId, rankings)

    return playerMap
  },
  new Map<string, NBARanking[]>(),
)

const getPlayerRankings = (playerId: string) =>
  rankingsByPlayer
    .get(playerId)
    ?.filter((ranking) => categoriesById.has(ranking.categoryId)) ?? []

const createRankingHint = (ranking: NBARanking): NBAGuessHint => {
  const category = categoriesById.get(ranking.categoryId)

  if (!category) {
    throw new Error(`Manjka NBA kategorija ${ranking.categoryId}.`)
  }

  return {
    icon: category.icon,
    label: category.title,
    value: formatStatValue(ranking.value, category.unit),
    badge: `#${ranking.rank}`,
  }
}

const createProfileHints = (player: NBAPlayer): NBAGuessHint[] => [
  {
    icon: player.flagEmoji,
    label: 'Država',
    value: player.country,
  },
  {
    icon: '🏟️',
    label: 'Glavna ekipa',
    value: player.primaryTeam,
  },
  {
    icon: '📍',
    label: 'Pozicija',
    value: player.position,
  },
]

const createHints = (player: NBAPlayer): NBAGuessHint[] => {
  const statHints = shuffle(getPlayerRankings(player.id))
    .slice(0, STAT_HINT_COUNT)
    .map(createRankingHint)

  return shuffle([...statHints, ...shuffle(createProfileHints(player))]).slice(
    0,
    3,
  )
}

const getPositionParts = (player: NBAPlayer) =>
  player.position.split('/').map((part) => part.trim())

const sharesPosition = (player: NBAPlayer, candidate: NBAPlayer) => {
  const playerPositions = new Set(getPositionParts(player))

  return getPositionParts(candidate).some((position) =>
    playerPositions.has(position),
  )
}

const getSimilarPlayers = (player: NBAPlayer) => {
  const otherPlayers = nbaPlayers.filter((candidate) => candidate.id !== player.id)
  const sameCountryAndPosition = otherPlayers.filter(
    (candidate) =>
      candidate.country === player.country && sharesPosition(player, candidate),
  )
  const samePosition = otherPlayers.filter((candidate) =>
    sharesPosition(player, candidate),
  )
  const sameCountry = otherPlayers.filter(
    (candidate) => candidate.country === player.country,
  )

  return [
    ...shuffle(sameCountryAndPosition),
    ...shuffle(samePosition),
    ...shuffle(sameCountry),
    ...shuffle(otherPlayers),
  ]
}

const createOptions = (player: NBAPlayer) => {
  const selectedPlayerIds = new Set([player.id])
  const distractors: NBAPlayer[] = []

  for (const candidate of getSimilarPlayers(player)) {
    if (distractors.length >= ANSWER_COUNT - 1) {
      break
    }

    if (!selectedPlayerIds.has(candidate.id)) {
      distractors.push(candidate)
      selectedPlayerIds.add(candidate.id)
    }
  }

  return shuffle([player, ...distractors]).slice(0, ANSWER_COUNT)
}

const getEligiblePlayers = () =>
  nbaPlayers.filter(
    (player) => getPlayerRankings(player.id).length >= STAT_HINT_COUNT,
  )

const createQuestion = (player: NBAPlayer): NBAGuessQuestion => ({
  player,
  hints: createHints(player),
  options: createOptions(player),
})

export const createNewNbaGuessGame = (): NBAGuessGameState => ({
  questions: shuffle(getEligiblePlayers()).slice(0, GAME_ROUNDS).map(createQuestion),
  currentQuestionIndex: 0,
  answers: [],
  lastAnswer: null,
  isResolving: false,
})

export const getCurrentNbaGuessQuestion = (game: NBAGuessGameState) =>
  game.questions[game.currentQuestionIndex] ?? null

export const getNbaGuessScore = (game: NBAGuessGameState) =>
  game.answers.filter((answer) => answer.isCorrect).length

export const selectNbaGuessAnswer = (
  game: NBAGuessGameState,
  selectedPlayerId: string,
): NBAGuessGameState => {
  const question = getCurrentNbaGuessQuestion(game)
  const selectedPlayer = question?.options.find(
    (option) => option.id === selectedPlayerId,
  )

  if (!question || !selectedPlayer || game.isResolving) {
    return game
  }

  const answer: NBAGuessAnswer = {
    questionIndex: game.currentQuestionIndex,
    selectedPlayerId: selectedPlayer.id,
    selectedPlayerName: selectedPlayer.name,
    correctPlayerId: question.player.id,
    correctPlayerName: question.player.name,
    isCorrect: selectedPlayer.id === question.player.id,
  }

  return {
    ...game,
    answers: [...game.answers, answer],
    lastAnswer: answer,
    isResolving: true,
  }
}

export const advanceAfterNbaGuessAnswer = (
  game: NBAGuessGameState,
): NBAGuessGameState => {
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

export const isNbaGuessGameComplete = (game: NBAGuessGameState) =>
  game.currentQuestionIndex >= GAME_ROUNDS ||
  game.answers.length >= GAME_ROUNDS
