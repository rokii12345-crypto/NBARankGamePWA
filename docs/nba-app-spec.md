# NBA Rank Game PWA - Specifikacija

## Jezik

Celoten uporabniški vmesnik mora biti v slovenščini.

## Platforma

React + TypeScript + Vite PWA spletna aplikacija.

Aplikacija mora delovati kot mobilna PWA, primerna za iPhone Safari in dodajanje na Home Screen.

## Koncept igre

Igralcu se prikaže en NBA igralec.

Igralec ima:
- ime
- državo
- emoji zastavo države
- glavno ekipo/franšizo
- pozicijo
- kratek opis

Uporabnik mora igralca dodeliti eni izmed 10 kategorij.

Ko uporabnik izbere kategorijo, aplikacija preveri, na katerem mestu je ta NBA igralec v izbrani kategoriji.

Rezultat kroga je enak uvrstitvi igralca v izbrani kategoriji.

Nižji skupni rezultat je boljši.

## Dolžina igre

Klasična igra:
- 10 naključnih NBA igralcev
- 10 kategorij
- 10 krogov
- vsak igralec se pojavi samo enkrat
- vsaka kategorija se lahko uporabi samo enkrat

## Pravilo za kategorije

Kategorije morajo ostati ves čas prikazane.

Ko je kategorija uporabljena:
- ostane vidna
- postane zaklenjena
- ni je več mogoče klikniti
- prikaže se, za katerega igralca je bila uporabljena
- prikaže se, koliko točk je uporabnik dobil

## Samodejni prehod

Ko uporabnik izbere kategorijo:
1. aplikacija pokaže rezultat
2. po 3 sekundah se samodejno prikaže naslednji igralec
3. ni gumba Naprej

## Podatki

Uporabi obstoječe datoteke:

- src/data/nbaPlayers.ts
- src/data/nbaCategories.ts
- src/data/nbaRankings.ts

Ne prepisuj podatkovnih datotek, razen če imajo TypeScript napako.

## Zasloni

1. HomeScreen
2. PlayerNameScreen
3. GameScreen
4. FinalResultScreen
5. RulesScreen

## GameScreen mora prikazati

- Krog X / 10
- skupni rezultat
- trenutnega NBA igralca
- emoji zastavo
- državo
- glavno ekipo/franšizo
- pozicijo
- vseh 10 kategorij
- uporabljene kategorije kot zaklenjene
- zadnji rezultat
- sporočilo: "Naslednji igralec čez 3 sekunde ..."

## Vizualni slog

Moderna košarkarska PWA aplikacija:
- temno ozadje
- oranžni poudarki
- velike kartice
- zaobljeni robovi
- mobilni layout
- primerna za iPhone zaslon
- brez prenatrpanosti
- slovenski teksti