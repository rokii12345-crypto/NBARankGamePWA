export type Movie = {
  id: string
  title: string
  year: number
  director?: string
  genres: string[]
  runtimeMinutes?: number
  posterUrl?: string
  shortBio?: string
}

export const movies: Movie[] = []
