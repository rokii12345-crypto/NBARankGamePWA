import { movieCategories, type MovieCategory } from '../data/movieCategories'
import { movieRankings, type MovieRanking } from '../data/movieRankings'
import { movies } from '../data/movies'
import {
  GAME_ROUNDS,
  type MovieCategoryAssignment,
  type MovieGameState,
  type MovieRoundResult,
} from '../types/game'

const EMPTY_DATA_MESSAGE =
  'Filmski podatki še niso pripravljeni. Napolni src/data/movies.ts in src/data/movieRankings.ts, nato bo Rank Filmi igralen.'

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

const moviesById = new Map(movies.map((movie) => [movie.id, movie]))

const rankingsByCategory = movieRankings.reduce(
  (categoryMap, ranking) => {
    const rankings = categoryMap.get(ranking.categoryId) ?? []
    rankings.push(ranking)
    categoryMap.set(ranking.categoryId, rankings)

    return categoryMap
  },
  new Map<string, MovieRanking[]>(),
)

const rankingByCategoryAndMovie = new Map(
  movieRankings.map((ranking) => [
    `${ranking.categoryId}::${ranking.movieId}`,
    ranking,
  ]),
)

const getRanking = (movieId: string, categoryId: string) =>
  rankingByCategoryAndMovie.get(`${categoryId}::${movieId}`) ?? null

const getCategoryMovieIds = (categoryId: string) =>
  new Set(
    (rankingsByCategory.get(categoryId) ?? [])
      .filter((ranking) => moviesById.has(ranking.movieId))
      .map((ranking) => ranking.movieId),
  )

const intersectSets = (left: Set<string>, right: Set<string>) => {
  const intersection = new Set<string>()

  for (const item of left) {
    if (right.has(item)) {
      intersection.add(item)
    }
  }

  return intersection
}

const getPlayableCategories = () =>
  movieCategories.filter(
    (category) => getCategoryMovieIds(category.id).size >= GAME_ROUNDS,
  )

const getRequiredMovie = (movieId: string) => {
  const movie = moviesById.get(movieId)

  if (!movie) {
    throw new Error(`Manjka film ${movieId}.`)
  }

  return movie
}

const createEmptyGame = (setupError: string): MovieGameState => ({
  movies: [],
  categories: [],
  currentRoundIndex: 0,
  assignments: [],
  lastResult: null,
  isResolving: false,
  setupError,
})

const selectPlayableRound = () => {
  const playableCategories = shuffle(getPlayableCategories())
  let selectedMovieIds: Set<string> | null = null
  const selectedCategories: MovieCategory[] = []

  for (const category of playableCategories) {
    const categoryMovieIds = getCategoryMovieIds(category.id)
    const nextMovieIds: Set<string> = selectedMovieIds
      ? intersectSets(selectedMovieIds, categoryMovieIds)
      : categoryMovieIds

    if (nextMovieIds.size < GAME_ROUNDS) {
      continue
    }

    selectedCategories.push(category)
    selectedMovieIds = nextMovieIds

    if (selectedCategories.length >= GAME_ROUNDS) {
      break
    }
  }

  if (selectedCategories.length < GAME_ROUNDS || !selectedMovieIds) {
    return null
  }

  return {
    categories: selectedCategories,
    movies: shuffle([...selectedMovieIds].map(getRequiredMovie)).slice(
      0,
      GAME_ROUNDS,
    ),
  }
}

export const createNewMovieGame = (): MovieGameState => {
  if (movies.length < GAME_ROUNDS || movieRankings.length === 0) {
    return createEmptyGame(EMPTY_DATA_MESSAGE)
  }

  const playableRound = selectPlayableRound()

  if (!playableRound) {
    return createEmptyGame(
      'Ni dovolj filmskih podatkov za 10 kategorij in 10 filmov s popolno pokritostjo.',
    )
  }

  return {
    ...playableRound,
    currentRoundIndex: 0,
    assignments: [],
    lastResult: null,
    isResolving: false,
    setupError: null,
  }
}

export const getCurrentMovie = (game: MovieGameState) =>
  game.movies[game.currentRoundIndex] ?? null

export const getMovieTotalScore = (game: MovieGameState) =>
  game.assignments.reduce((total, assignment) => total + assignment.points, 0)

export const selectCategoryForCurrentMovie = (
  game: MovieGameState,
  categoryId: string,
): MovieGameState => {
  const movie = getCurrentMovie(game)
  const category = game.categories.find((item) => item.id === categoryId)
  const categoryAlreadyUsed = game.assignments.some(
    (assignment) => assignment.categoryId === categoryId,
  )

  if (
    !movie ||
    !category ||
    categoryAlreadyUsed ||
    game.isResolving ||
    game.setupError
  ) {
    return game
  }

  const ranking = getRanking(movie.id, category.id)

  if (!ranking) {
    return {
      ...game,
      setupError:
        'Manjka ranking za izbrani film in kategorijo. Preveri movieRankings.ts.',
    }
  }

  const assignment: MovieCategoryAssignment = {
    categoryId: category.id,
    movieId: movie.id,
    movieTitle: movie.title,
    rank: ranking.rank,
    value: ranking.value,
    points: ranking.rank,
    year: ranking.year,
  }
  const lastResult: MovieRoundResult = {
    ...assignment,
    categoryTitle: category.title,
    unit: category.unit,
    decimals: category.decimals,
    valueType: category.valueType,
  }

  return {
    ...game,
    assignments: [...game.assignments, assignment],
    lastResult,
    isResolving: true,
  }
}

export const advanceAfterMovieResult = (
  game: MovieGameState,
): MovieGameState => {
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

export const isMovieGameComplete = (game: MovieGameState) =>
  game.currentRoundIndex >= GAME_ROUNDS ||
  game.assignments.length >= GAME_ROUNDS
