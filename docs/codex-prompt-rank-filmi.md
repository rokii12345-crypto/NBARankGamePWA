Dodaj nov način igre "Rank Filmi" v obstoječ React + TypeScript + Vite PWA projekt.

Uporabi pripravljene podatke:
- src/data/movies.ts
- src/data/movieCategories.ts
- src/data/movieRankings.ts

Ne izmišljaj filmskih podatkov.

Pravila:
- igra izbere 10 kategorij
- nato izbere 10 filmov, ki imajo podatke za vseh 10 izbranih kategorij
- uporabnik vidi en film naenkrat
- film dodeli eni kategoriji
- točke = rank filma v kategoriji
- po izboru prikaži dejanski podatek in igralne točke
- kategorija se zaklene
- po 3 sekundah gre na naslednji film
- ni gumba Naprej
- na koncu prikaži rezultat in vseh 10 odločitev

Primer:
Titanic — Zaslužek v ZDA/Kanadi: 674.292.608 USD. Igralne točke: +3.

Če za izbran film/kategorijo podatek manjka, se to ne sme zgoditi, ker mora engine filme izbrati samo iz množice s popolnimi podatki za izbrane kategorije.

Dodaj:
- movie game mode na začetni zaslon
- po potrebi movieGameEngine.ts
- po potrebi MovieCard.tsx
- posodobi tipe
- posodobi formatResult za movie valueType/unit
- posodobi CSS za filmski izgled

UI:
- slovenski teksti
- temen premium dizajn
- filmski poudarki
- kartica filma z naslovom, letom, režiserjem, žanri
- če posterUrl obstaja, ga lahko prikažeš
- brez horizontalnega scrollanja
- iPhone friendly

Zaženi npm run build in popravi TypeScript napake.
