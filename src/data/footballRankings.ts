export type FootballRanking = {
  categoryId: string
  clubId: string
  rank: number
  value: number
}

// Podatke bova napolnila po kategorijah.
// Pravilo:
// - value = dejanski podatek
// - rank = mesto kluba v kategoriji
// - points = rank
// - če je kategorija partial, mora game engine izbrati samo klube, ki imajo podatke za vse izbrane kategorije.

export const footballRankings: FootballRanking[] = []
