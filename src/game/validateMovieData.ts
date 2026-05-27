import { movieCategories } from '../data/movieCategories.ts'
import { movies } from '../data/movies.ts'
import { movieRankings } from '../data/movieRankings.ts'

export function validateMovieData() {
  const errors: string[] = []
  const categoryIds = new Set(movieCategories.map((category) => category.id))
  const movieIds = new Set(movies.map((movie) => movie.id))

  const duplicateKeys = new Set<string>()
  const seenKeys = new Set<string>()

  for (const ranking of movieRankings) {
    if (!categoryIds.has(ranking.categoryId)) {
      errors.push(`Unknown categoryId: ${ranking.categoryId}`)
    }

    if (!movieIds.has(ranking.movieId)) {
      errors.push(`Unknown movieId: ${ranking.movieId}`)
    }

    const key = `${ranking.categoryId}::${ranking.movieId}`
    if (seenKeys.has(key)) {
      duplicateKeys.add(key)
    }
    seenKeys.add(key)
  }

  for (const key of duplicateKeys) {
    errors.push(`Duplicate ranking: ${key}`)
  }

  for (const category of movieCategories) {
    const categoryRankings = movieRankings
      .filter((ranking) => ranking.categoryId === category.id)
      .sort((a, b) => a.rank - b.rank)

    const rankSet = new Set(categoryRankings.map((ranking) => ranking.rank))
    if (rankSet.size !== categoryRankings.length) {
      errors.push(`Duplicate ranks in category: ${category.id}`)
    }
  }

  return {
    ok: errors.length === 0,
    counts: {
      movies: movies.length,
      categories: movieCategories.length,
      rankings: movieRankings.length,
    },
    errors,
  }
}
