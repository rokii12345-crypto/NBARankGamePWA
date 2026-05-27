import type { NBACategory } from '../data/nbaCategories'
import type { NBAPlayer } from '../data/nbaPlayers'
import type { NBARanking } from '../data/nbaRankings'
import type { EuropeCategory } from '../data/europeCategories'
import type { EuropeCountry } from '../data/europeCountries'
import type { EuropeRanking } from '../data/europeRankings'
import type { FootballClub } from '../data/footballClubs'
import type { MovieCategory } from '../data/movieCategories'
import type { MovieRanking } from '../data/movieRankings'
import type { Movie } from '../data/movies'
import type { SloveniaCategory } from '../data/sloveniaCategories'
import type { SloveniaMunicipality } from '../data/sloveniaMunicipalities'
import type { SloveniaRanking } from '../data/sloveniaRankings'

export const GAME_ROUNDS = 10

export type GameMode =
  | 'nba'
  | 'nba-guess'
  | 'movies'
  | 'europe'
  | 'slovenia'
  | 'guess-municipality'
  | 'higher-lower'
  | 'football-guess'
  | 'football-stadium'

export type AppScreen =
  | 'mode-select'
  | 'player-name'
  | 'game'
  | 'rules'
  | 'final'

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

export type NBAGuessHint = {
  label: string
  value: string
  icon: string
  badge?: string
}

export type NBAGuessQuestion = {
  player: NBAPlayer
  hints: NBAGuessHint[]
  options: NBAPlayer[]
}

export type NBAGuessAnswer = {
  questionIndex: number
  selectedPlayerId: string
  selectedPlayerName: string
  correctPlayerId: string
  correctPlayerName: string
  isCorrect: boolean
}

export type NBAGuessGameState = {
  questions: NBAGuessQuestion[]
  currentQuestionIndex: number
  answers: NBAGuessAnswer[]
  lastAnswer: NBAGuessAnswer | null
  isResolving: boolean
}

export type SloveniaCategoryAssignment = {
  categoryId: string
  municipalityId: string
  municipalityName: string
  rank: number
  value: number
  points: number
}

export type SloveniaRoundResult = SloveniaCategoryAssignment & {
  categoryTitle: string
  unit: string
  decimals: number
}

export type SloveniaGameState = {
  municipalities: SloveniaMunicipality[]
  categories: SloveniaCategory[]
  currentRoundIndex: number
  assignments: SloveniaCategoryAssignment[]
  lastResult: SloveniaRoundResult | null
  isResolving: boolean
}

export type SloveniaCategoryChoice = {
  category: SloveniaCategory
  assignment?: SloveniaCategoryAssignment
  ranking?: SloveniaRanking
}

export type EuropeCategoryAssignment = {
  categoryId: string
  countryId: string
  countryName: string
  rank: number
  value: number
  year: number
  points: number
}

export type EuropeRoundResult = EuropeCategoryAssignment & {
  categoryTitle: string
  unit: string
  decimals: number
}

export type EuropeGameState = {
  countries: EuropeCountry[]
  categories: EuropeCategory[]
  currentRoundIndex: number
  assignments: EuropeCategoryAssignment[]
  lastResult: EuropeRoundResult | null
  isResolving: boolean
}

export type EuropeCategoryChoice = {
  category: EuropeCategory
  assignment?: EuropeCategoryAssignment
  ranking?: EuropeRanking
}

export type MovieCategoryAssignment = {
  categoryId: string
  movieId: string
  movieTitle: string
  rank: number
  value: number
  points: number
  year?: number
}

export type MovieRoundResult = MovieCategoryAssignment & {
  categoryTitle: string
  unit: string
  decimals: number
  valueType: MovieCategory['valueType']
}

export type MovieGameState = {
  movies: Movie[]
  categories: MovieCategory[]
  currentRoundIndex: number
  assignments: MovieCategoryAssignment[]
  lastResult: MovieRoundResult | null
  isResolving: boolean
  setupError: string | null
}

export type MovieCategoryChoice = {
  category: MovieCategory
  assignment?: MovieCategoryAssignment
  ranking?: MovieRanking
}

export type GuessMunicipalityHint = {
  category: SloveniaCategory
  ranking: SloveniaRanking
}

export type GuessMunicipalityQuestion = {
  municipality: SloveniaMunicipality
  hints: GuessMunicipalityHint[]
  options: SloveniaMunicipality[]
}

export type GuessMunicipalityAnswer = {
  questionIndex: number
  selectedMunicipalityId: string
  selectedMunicipalityName: string
  correctMunicipalityId: string
  correctMunicipalityName: string
  isCorrect: boolean
}

export type GuessMunicipalityGameState = {
  questions: GuessMunicipalityQuestion[]
  currentQuestionIndex: number
  answers: GuessMunicipalityAnswer[]
  lastAnswer: GuessMunicipalityAnswer | null
  isResolving: boolean
}

export type HigherLowerChoice = 'higher' | 'lower'

export type HigherLowerQuestion = {
  previousMunicipality: SloveniaMunicipality
  previousRanking: SloveniaRanking
  nextMunicipality: SloveniaMunicipality
  nextRanking: SloveniaRanking
}

export type HigherLowerAnswer = {
  questionIndex: number
  choice: HigherLowerChoice
  correctChoice: HigherLowerChoice
  isCorrect: boolean
  previousMunicipalityName: string
  nextMunicipalityName: string
  previousValue: number
  nextValue: number
}

export type HigherLowerGameState = {
  category: SloveniaCategory
  questions: HigherLowerQuestion[]
  currentQuestionIndex: number
  answers: HigherLowerAnswer[]
  lastAnswer: HigherLowerAnswer | null
  isResolving: boolean
}

export type FootballGuessHint = {
  label: string
  value: string
  icon: string
}

export type FootballGuessQuestion = {
  club: FootballClub
  hints: FootballGuessHint[]
  options: FootballClub[]
}

export type FootballGuessAnswer = {
  questionIndex: number
  selectedClubId: string
  selectedClubName: string
  correctClubId: string
  correctClubName: string
  isCorrect: boolean
}

export type FootballGuessGameState = {
  questions: FootballGuessQuestion[]
  currentQuestionIndex: number
  answers: FootballGuessAnswer[]
  lastAnswer: FootballGuessAnswer | null
  isResolving: boolean
}

export type FootballStadiumQuestion = {
  club: FootballClub
  options: string[]
}

export type FootballStadiumAnswer = {
  questionIndex: number
  clubName: string
  selectedStadium: string
  correctStadium: string
  isCorrect: boolean
}

export type FootballStadiumGameState = {
  questions: FootballStadiumQuestion[]
  currentQuestionIndex: number
  answers: FootballStadiumAnswer[]
  lastAnswer: FootballStadiumAnswer | null
  isResolving: boolean
}
