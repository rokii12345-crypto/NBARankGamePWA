import { nbaCategories } from '../data/nbaCategories'
import { nbaPlayers, type NBAPlayer } from '../data/nbaPlayers'
import { nbaRankings } from '../data/nbaRankings'
import type { NBACategory } from '../data/nbaCategories'
import {
  GAME_ROUNDS,
  type CategoryAssignment,
  type GameState,
  type RoundResult,
} from '../types/game'

const MISSING_RANKING_PENALTY = 50

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

const getMatchingRankingCount = (
  playerId: string,
  selectedCategories: NBACategory[],
) => {
  const selectedCategoryIds = new Set(
    selectedCategories.map((category) => category.id),
  )

  return nbaRankings.filter(
    (ranking) =>
      ranking.playerId === playerId &&
      selectedCategoryIds.has(ranking.categoryId),
  ).length
}

const appendUniquePlayers = (
  selectedPlayers: NBAPlayer[],
  candidatePlayers: NBAPlayer[],
) => {
  const selectedPlayerIds = new Set(
    selectedPlayers.map((player) => player.id),
  )

  for (const player of candidatePlayers) {
    if (selectedPlayers.length >= GAME_ROUNDS) {
      break
    }

    if (!selectedPlayerIds.has(player.id)) {
      selectedPlayers.push(player)
      selectedPlayerIds.add(player.id)
    }
  }
}

const selectPlayablePlayers = (selectedCategories: NBACategory[]) => {
  const playersWithMatchCounts = nbaPlayers.map((player) => ({
    player,
    matchingRankingCount: getMatchingRankingCount(
      player.id,
      selectedCategories,
    ),
  }))

  const strongMatches = shuffle(
    playersWithMatchCounts
      .filter(({ matchingRankingCount }) => matchingRankingCount >= 2)
      .map(({ player }) => player),
  )
  const playableMatches = shuffle(
    playersWithMatchCounts
      .filter(({ matchingRankingCount }) => matchingRankingCount === 1)
      .map(({ player }) => player),
  )
  const fallbackPlayers = shuffle(nbaPlayers)
  const selectedPlayers: NBAPlayer[] = []

  appendUniquePlayers(selectedPlayers, strongMatches)
  appendUniquePlayers(selectedPlayers, playableMatches)
  appendUniquePlayers(selectedPlayers, fallbackPlayers)

  return selectedPlayers.slice(0, GAME_ROUNDS)
}

export const createNewGame = (): GameState => {
  const categories = shuffle(nbaCategories).slice(0, GAME_ROUNDS)

  return {
    players: selectPlayablePlayers(categories),
    categories,
    currentRoundIndex: 0,
    assignments: [],
    lastResult: null,
    isResolving: false,
  }
}

export const getCurrentPlayer = (game: GameState) =>
  game.players[game.currentRoundIndex] ?? null

export const getTotalScore = (game: GameState) =>
  game.assignments.reduce((total, assignment) => total + assignment.points, 0)

export const getUsedCategoryIds = (game: GameState) =>
  new Set(game.assignments.map((assignment) => assignment.categoryId))

export const findRanking = (playerId: string, categoryId: string) =>
  nbaRankings.find(
    (ranking) =>
      ranking.playerId === playerId && ranking.categoryId === categoryId,
  )

export const selectCategoryForCurrentPlayer = (
  game: GameState,
  categoryId: string,
): GameState => {
  const player = getCurrentPlayer(game)
  const category = game.categories.find((item) => item.id === categoryId)
  const categoryAlreadyUsed = game.assignments.some(
    (assignment) => assignment.categoryId === categoryId,
  )

  if (!player || !category || categoryAlreadyUsed || game.isResolving) {
    return game
  }

  const ranking = findRanking(player.id, category.id)
  const assignment: CategoryAssignment = ranking
    ? {
        categoryId: category.id,
        playerId: player.id,
        playerName: player.name,
        rank: ranking.rank,
        value: ranking.value,
        points: ranking.rank,
        missingData: false,
      }
    : {
        categoryId: category.id,
        playerId: player.id,
        playerName: player.name,
        rank: null,
        value: null,
        points: MISSING_RANKING_PENALTY,
        missingData: true,
      }

  const lastResult: RoundResult = {
    ...assignment,
    categoryTitle: category.title,
    unit: category.unit,
  }

  return {
    ...game,
    assignments: [...game.assignments, assignment],
    lastResult,
    isResolving: true,
  }
}

export const advanceAfterResult = (game: GameState): GameState => {
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

export const isGameComplete = (game: GameState) =>
  game.currentRoundIndex >= GAME_ROUNDS ||
  game.assignments.length >= GAME_ROUNDS
