import type { NBACategory } from '../data/nbaCategories'
import type { NBAPlayer } from '../data/nbaPlayers'
import type { NBARanking } from '../data/nbaRankings'

export const GAME_ROUNDS = 10

export type AppScreen = 'home' | 'player-name' | 'game' | 'rules' | 'final'

export type CategoryAssignment = {
  categoryId: string
  playerId: string
  playerName: string
  rank: number | null
  value: number | null
  points: number
  missingData: boolean
}

export type RoundResult = CategoryAssignment & {
  categoryTitle: string
  unit: string
}

export type GameState = {
  players: NBAPlayer[]
  categories: NBACategory[]
  currentRoundIndex: number
  assignments: CategoryAssignment[]
  lastResult: RoundResult | null
  isResolving: boolean
}

export type CategoryChoice = {
  category: NBACategory
  assignment?: CategoryAssignment
  ranking?: NBARanking
}
