# Rank Filmi starter paket

To je starter paket za nov način igre **Rank Filmi**.

## Kaj je pripravljeno

- 105 začetnih filmov v `docs/movie_titles.csv`
- 18 kategorij v `src/data/movieCategories.ts`
- starter `movieSeeds.ts`
- prazna `movies.ts` in `movieRankings.ts`
- skripti za OMDb:
  - `tools/fetchOmdbMovies.mjs`
  - `tools/buildMovieDataFromOmdb.mjs`
- validacija:
  - `src/game/validateMovieData.ts`
- Codex prompt:
  - `docs/codex-prompt-rank-filmi.md`

## Naslednji koraki

1. Pridobi OMDb API ključ.
2. Skopiraj ta paket v projekt.
3. Zaženi:
   ```cmd
   set OMDB_API_KEY=tvoj_kljuc
   node tools/fetchOmdbMovies.mjs
   node tools/buildMovieDataFromOmdb.mjs
   npm run build
   ```
4. Ko imaš `movies.ts` in `movieRankings.ts`, daj Codexu prompt iz `docs/codex-prompt-rank-filmi.md`.

## Opomba

Svetovni zaslužek, proračun in dobiček niso vključeni v OMDb avtomatski del. Te kategorije bomo dodali kasneje iz The Numbers/Box Office Mojo ali ročnega CSV.
