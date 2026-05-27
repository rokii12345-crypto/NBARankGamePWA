export type MovieRanking = {
  categoryId: string
  movieId: string
  rank: number
  value: number
  year?: number
}

export const movieRankings: MovieRanking[] = []
