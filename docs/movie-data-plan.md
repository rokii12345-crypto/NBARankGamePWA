# Rank Filmi — podatkovni načrt

## Prva verzija

Cilj: pripraviti filmski podatkovni paket za obstoječo PWA aplikacijo.

Datoteke:
- `src/data/movieSeeds.ts` — začetni seznam filmov
- `src/data/movieCategories.ts` — kategorije igre
- `src/data/movies.ts` — filmi po pridobitvi podatkov
- `src/data/movieRankings.ts` — ranking zapisi po kategorijah
- `src/game/validateMovieData.ts` — validacija

## Predlagan vir za začetek

Za prvo verzijo je najbolj praktičen OMDb API, ker za en film vrne več uporabnih polj:
- IMDb rating
- IMDb votes
- Metascore
- Runtime
- BoxOffice
- Awards
- Genre
- Plot
- Poster

Za uporabo potrebuješ OMDb API ključ.

## Kako uporabiti skripte

V korenu projekta:

```cmd
set OMDB_API_KEY=tvoj_kljuc
node tools/fetchOmdbMovies.mjs
node tools/buildMovieDataFromOmdb.mjs
npm run build
```

Skripta prebere `docs/movie_titles.csv`, prenese OMDb podatke v `docs/omdb_raw.json`, nato izdela:
- `src/data/movies.ts`
- `src/data/movieRankings.ts`

## Pomembno

OMDb `BoxOffice` običajno ni svetovni zaslužek, ampak domestic box office. Za svetovni zaslužek, proračun, dobiček in razmerje zaslužek/proračun bomo kasneje uporabili The Numbers ali ročno pripravljen CSV.

## Pravilo igre

Če je kategorija delna, game engine izbere samo filme, ki imajo podatek za vseh 10 izbranih kategorij.
