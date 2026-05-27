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

export const movies: Movie[] = [
  {
    id: "the-shawshank-redemption-1994",
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    genres: [
      "drama film",
      "buddy film",
      "prison film",
      "crime film"
    ],
    runtimeMinutes: 142,
    shortBio: "1994 film directed by Frank Darabont"
  },
  {
    id: "the-godfather-1972",
    title: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    genres: [
      "epic film",
      "gangster film",
      "crime film",
      "drama film",
      "crime drama film",
      "historical film",
      "historical drama film",
      "suspense film",
      "crime thriller film",
      "police procedural film",
      "thriller film"
    ],
    runtimeMinutes: 175,
    shortBio: "1972 film directed by Francis Ford Coppola"
  },
  {
    id: "the-godfather-part-ii-1974",
    title: "The Godfather Part II",
    year: 1974,
    director: "Francis Ford Coppola",
    genres: [
      "drama film",
      "crime film",
      "flashback film",
      "epic film",
      "crime thriller film",
      "crime drama film",
      "gangster film",
      "historical film",
      "historical drama film",
      "thriller film",
      "suspense film",
      "mystery film",
      "police procedural film",
      "action film"
    ],
    runtimeMinutes: 202,
    shortBio: "1974 film by Francis Ford Coppola"
  },
  {
    id: "the-dark-knight-2008",
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    genres: [
      "action film",
      "neo-noir",
      "crime thriller film",
      "crime film",
      "superhero film",
      "drama film",
      "thriller film"
    ],
    runtimeMinutes: 153,
    shortBio: "2008 film directed by Christopher Nolan"
  },
  {
    id: "12-angry-men-1957",
    title: "12 Angry Men",
    year: 1957,
    director: "Sidney Lumet",
    genres: [
      "drama film",
      "trial film",
      "huis-clos film"
    ],
    runtimeMinutes: 95,
    shortBio: "1957 American film by Sidney Lumet"
  },
  {
    id: "schindler-s-list-1993",
    title: "Schindler's List",
    year: 1993,
    director: "Steven Spielberg",
    genres: [
      "anti-war film",
      "biographical film",
      "drama film",
      "historical film",
      "war drama",
      "historical drama film",
      "war film",
      "epic film",
      "psychological drama film"
    ],
    runtimeMinutes: 195,
    shortBio: "1993 film directed by Steven Spielberg"
  },
  {
    id: "the-lord-of-the-rings-the-return-of-the-king-2003",
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    director: "Peter Jackson",
    genres: [
      "fantasy film",
      "adventure film"
    ],
    runtimeMinutes: 200,
    shortBio: "2003 film by Peter Jackson"
  },
  {
    id: "pulp-fiction-1994",
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    genres: [
      "independent film",
      "crime film",
      "drama film",
      "crime drama film",
      "crime thriller film",
      "action film",
      "thriller film",
      "suspense film",
      "black comedy film",
      "neo-noir",
      "crime comedy film",
      "comedy drama",
      "gangster film",
      "action thriller",
      "comedy film"
    ],
    runtimeMinutes: 154,
    shortBio: "1994 film by Quentin Tarantino"
  },
  {
    id: "the-lord-of-the-rings-the-fellowship-of-the-ring-2001",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    director: "Peter Jackson",
    genres: [
      "fantasy film",
      "adventure film",
      "action film"
    ],
    runtimeMinutes: 178,
    shortBio: "2001 film by Peter Jackson"
  },
  {
    id: "the-lord-of-the-rings-the-two-towers-2002",
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
    director: "Peter Jackson",
    genres: [
      "fantasy film",
      "adventure film",
      "action film"
    ],
    runtimeMinutes: 179,
    shortBio: "2002 film by Peter Jackson"
  },
  {
    id: "the-good-the-bad-and-the-ugly-1966",
    title: "The Good, the Bad and the Ugly",
    year: 1966,
    director: "Sergio Leone",
    genres: [
      "Spaghetti Western",
      "treasure hunt film",
      "war film",
      "drama film",
      "Western film",
      "action film",
      "epic film"
    ],
    runtimeMinutes: 177,
    shortBio: "1966 film directed by Sergio Leone"
  },
  {
    id: "forrest-gump-1994",
    title: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    genres: [
      "coming-of-age film",
      "flashback film",
      "comedy film",
      "drama film",
      "historical drama",
      "romantic comedy film",
      "tragicomedy",
      "American football film"
    ],
    runtimeMinutes: 142,
    shortBio: "1994 film directed by Robert Zemeckis"
  },
  {
    id: "fight-club-1999",
    title: "Fight Club",
    year: 1999,
    director: "David Fincher",
    genres: [
      "flashback film",
      "drama film",
      "thriller film",
      "psychological thriller"
    ],
    runtimeMinutes: 139,
    shortBio: "1999 film directed by David Fincher"
  },
  {
    id: "inception-2010",
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genres: [
      "heist film",
      "science fiction film",
      "thriller film",
      "science fiction action film",
      "adventure film",
      "drama film",
      "mystery film",
      "action film"
    ],
    runtimeMinutes: 148,
    shortBio: "2010 film directed by Christopher Nolan"
  },
  {
    id: "the-matrix-1999",
    title: "The Matrix",
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    genres: [
      "thriller film",
      "dystopian film",
      "cyberpunk",
      "action thriller",
      "post-apocalyptic film",
      "science fiction film",
      "action film",
      "film noir",
      "superhero film"
    ],
    runtimeMinutes: 136,
    shortBio: "1999 American science fiction action thriller film"
  },
  {
    id: "goodfellas-1990",
    title: "Goodfellas",
    year: 1990,
    director: "Martin Scorsese",
    genres: [
      "biographical film",
      "gangster film",
      "crime thriller film",
      "crime film",
      "thriller film",
      "historical film",
      "historical drama film",
      "suspense film",
      "police procedural film",
      "crime drama film",
      "drama film",
      "period drama film"
    ],
    runtimeMinutes: 146,
    shortBio: "1990 film directed by Martin Scorsese"
  },
  {
    id: "star-wars-episode-v-the-empire-strikes-back-1980",
    title: "Star Wars: Episode V – The Empire Strikes Back",
    year: 1980,
    director: "Irvin Kershner",
    genres: [
      "science fiction film",
      "adventure film",
      "action film",
      "fantasy film",
      "epic film",
      "space opera"
    ],
    runtimeMinutes: 124,
    shortBio: "1980 American epic space opera film directed by Irvin Kershner"
  },
  {
    id: "one-flew-over-the-cuckoo-s-nest-1975",
    title: "One Flew Over the Cuckoo's Nest",
    year: 1975,
    director: "Miloš Forman",
    genres: [
      "comedy film",
      "medical drama",
      "prison film"
    ],
    runtimeMinutes: 133,
    shortBio: "1975 film directed by Miloš Forman"
  },
  {
    id: "interstellar-2014",
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    genres: [
      "science fiction film",
      "adventure film",
      "dystopian film",
      "drama film",
      "time-travel film",
      "thriller film",
      "hard science fiction"
    ],
    runtimeMinutes: 169,
    shortBio: "2014 film by Christopher Nolan"
  },
  {
    id: "parasite-2019",
    title: "Parasite",
    year: 2019,
    director: "Bong Joon-ho",
    genres: [
      "comedy drama",
      "black comedy",
      "thriller film"
    ],
    runtimeMinutes: 132,
    shortBio: "2019 film directed by Bong Joon-ho"
  },
  {
    id: "spirited-away-2001",
    title: "Spirited Away",
    year: 2001,
    director: "Hayao Miyazaki",
    genres: [
      "fantasy film",
      "fantasy anime and manga",
      "children's film",
      "coming-of-age film",
      "isekai",
      "drama film",
      "supernatural anime"
    ],
    runtimeMinutes: 125,
    shortBio: "2001 anime film directed by Hayao Miyazaki"
  },
  {
    id: "saving-private-ryan-1998",
    title: "Saving Private Ryan",
    year: 1998,
    director: "Steven Spielberg",
    genres: [
      "war film",
      "drama film",
      "action film"
    ],
    runtimeMinutes: 169,
    shortBio: "1998 film directed by Steven Spielberg"
  },
  {
    id: "the-green-mile-1999",
    title: "The Green Mile",
    year: 1999,
    director: "Frank Darabont",
    genres: [
      "drama film",
      "flashback film",
      "fantasy film",
      "prison film",
      "magic realist film"
    ],
    runtimeMinutes: 189,
    shortBio: "1999 film directed by Frank Darabont"
  },
  {
    id: "seven-1995",
    title: "Seven",
    year: 1995,
    director: "David Fincher",
    genres: [
      "crime film",
      "horror film",
      "buddy cop film",
      "mystery film",
      "drama film",
      "thriller film",
      "detective film",
      "suspense film",
      "psychological horror film",
      "crime drama film",
      "action film",
      "crime thriller film",
      "psychological thriller film",
      "adventure film",
      "psychological drama film",
      "independent film",
      "chase film",
      "police procedural film"
    ],
    runtimeMinutes: 127,
    shortBio: "1995 film by David Fincher"
  },
  {
    id: "the-silence-of-the-lambs-1991",
    title: "The Silence of the Lambs",
    year: 1991,
    director: "Jonathan Demme",
    genres: [
      "thriller film",
      "horror film",
      "psychological horror film",
      "psychological thriller film",
      "crime film",
      "drama film",
      "police procedural film",
      "crime thriller film",
      "crime drama film",
      "psychological drama film",
      "LGBTQ-related film"
    ],
    runtimeMinutes: 118,
    shortBio: "1991 film directed by Jonathan Demme"
  },
  {
    id: "city-of-god-2002",
    title: "City of God",
    year: 2002,
    director: "Fernando Meirelles, Kátia Lund",
    genres: [
      "drama film",
      "crime film",
      "coming-of-age film",
      "hood film"
    ],
    runtimeMinutes: 128,
    shortBio: "2002 film directed by Fernando Meirelles and Kátia Lund"
  },
  {
    id: "life-is-beautiful-1997",
    title: "Life is Beautiful",
    year: 1997,
    director: "Roberto Benigni",
    genres: [
      "comedy film",
      "drama film"
    ],
    runtimeMinutes: 116,
    shortBio: "1997 film by Roberto Benigni"
  },
  {
    id: "terminator-2-judgment-day-1991",
    title: "Terminator 2: Judgment Day",
    year: 1991,
    director: "James Cameron",
    genres: [
      "action film",
      "thriller film",
      "science fiction film",
      "post-apocalyptic film",
      "dystopian film",
      "drama film",
      "time-travel film",
      "science fiction action film",
      "black comedy film",
      "girls with guns",
      "chase film",
      "comedy film",
      "cyberpunk",
      "suspense film",
      "adventure film",
      "techno-thriller"
    ],
    runtimeMinutes: 137,
    shortBio: "1991 film directed by James Cameron"
  },
  {
    id: "back-to-the-future-1985",
    title: "Back to the Future",
    year: 1985,
    director: "Robert Zemeckis",
    genres: [
      "science fiction film",
      "adventure film",
      "comedy film",
      "teen film",
      "time-travel film"
    ],
    runtimeMinutes: 115,
    shortBio: "1985 film directed by Robert Zemeckis"
  },
  {
    id: "gladiator-2000",
    title: "Gladiator",
    year: 2000,
    director: "Ridley Scott",
    genres: [
      "sword-and-sandal film",
      "melodrama",
      "action film",
      "drama film",
      "adventure film",
      "epic film",
      "historical film",
      "historical drama film"
    ],
    runtimeMinutes: 155,
    shortBio: "2000 film by Ridley Scott"
  },
  {
    id: "the-departed-2006",
    title: "The Departed",
    year: 2006,
    director: "Martin Scorsese",
    genres: [
      "drama film",
      "crime thriller film",
      "crime film",
      "thriller film",
      "gangster film",
      "crime drama film",
      "mystery film",
      "suspense film",
      "neo-noir",
      "epic film"
    ],
    runtimeMinutes: 151,
    shortBio: "2006 film directed by Martin Scorsese"
  },
  {
    id: "whiplash-2014",
    title: "Whiplash",
    year: 2014,
    director: "Damien Chazelle",
    genres: [
      "musical film",
      "drama film"
    ],
    runtimeMinutes: 106,
    shortBio: "2014 film directed by Damien Chazelle"
  },
  {
    id: "the-prestige-2006",
    title: "The Prestige",
    year: 2006,
    director: "Christopher Nolan",
    genres: [
      "mystery film",
      "thriller film",
      "fantasy film",
      "drama film",
      "magic realist film"
    ],
    runtimeMinutes: 125,
    shortBio: "2006 film directed by Christopher Nolan"
  },
  {
    id: "the-lion-king-1994",
    title: "The Lion King",
    year: 1994,
    director: "Roger Allers, Rob Minkoff",
    genres: [
      "musical film",
      "drama film",
      "adventure film",
      "family film"
    ],
    runtimeMinutes: 88,
    shortBio: "1994 animated film directed by Roger Allers and Rob Minkoff"
  },
  {
    id: "alien-1979",
    title: "Alien",
    year: 1979,
    director: "Ridley Scott",
    genres: [
      "horror film",
      "science fiction film",
      "thriller film",
      "body horror film",
      "science fiction horror film",
      "adventure film",
      "fantasy film",
      "mystery film",
      "suspense film",
      "action film",
      "monster film",
      "girls with guns",
      "science fiction action film"
    ],
    runtimeMinutes: 117,
    shortBio: "1979 film by Ridley Scott"
  },
  {
    id: "apocalypse-now-1979",
    title: "Apocalypse Now",
    year: 1979,
    director: "Francis Ford Coppola",
    genres: [
      "war film",
      "action film",
      "drama film",
      "thriller film",
      "epic film",
      "war drama",
      "horror film",
      "psychological horror film",
      "psychological thriller film",
      "adventure film",
      "psychological drama film",
      "satirical film"
    ],
    runtimeMinutes: 153,
    shortBio: "1979 film directed by Francis Ford Coppola"
  },
  {
    id: "memento-2000",
    title: "Memento",
    year: 2000,
    director: "Christopher Nolan",
    genres: [
      "neo-noir",
      "mystery film",
      "flashback film",
      "crime film",
      "drama film",
      "thriller film",
      "horror film",
      "film noir"
    ],
    runtimeMinutes: 113,
    shortBio: "2000 film by Christopher Nolan"
  },
  {
    id: "raiders-of-the-lost-ark-1981",
    title: "Raiders of the Lost Ark",
    year: 1981,
    director: "Steven Spielberg",
    genres: [
      "action film",
      "treasure hunt film"
    ],
    runtimeMinutes: 115,
    shortBio: "1981 film directed by Steven Spielberg"
  },
  {
    id: "wall-e-2008",
    title: "WALL-E",
    year: 2008,
    director: "Andrew Stanton",
    genres: [
      "romantic comedy film",
      "post-apocalyptic film",
      "science fiction comedy",
      "adventure film",
      "flashback film",
      "children's film",
      "romance film",
      "dystopian film",
      "adventure science fiction",
      "science fiction film",
      "comedy film"
    ],
    runtimeMinutes: 98,
    shortBio: "2008 animated film directed by Andrew Stanton"
  },
  {
    id: "django-unchained-2012",
    title: "Django Unchained",
    year: 2012,
    director: "Quentin Tarantino",
    genres: [
      "revisionist Western",
      "Western film",
      "action film",
      "blaxploitation film",
      "historical drama film",
      "historical film",
      "comedy drama",
      "drama film"
    ],
    runtimeMinutes: 165,
    shortBio: "2012 film by Quentin Tarantino"
  },
  {
    id: "the-shining-1980",
    title: "The Shining",
    year: 1980,
    director: "Stanley Kubrick",
    genres: [
      "horror film",
      "psychological horror film",
      "drama film",
      "mystery film",
      "ghost film",
      "supernatural horror film",
      "thriller film",
      "psychological thriller film",
      "psychological drama film",
      "suspense film"
    ],
    runtimeMinutes: 144,
    shortBio: "1980 film directed by Stanley Kubrick"
  },
  {
    id: "avengers-endgame-2019",
    title: "Avengers: Endgame",
    year: 2019,
    director: "Anthony Russo, Joe Russo",
    genres: [
      "superhero film",
      "speculative fiction film",
      "action film",
      "adventure film"
    ],
    runtimeMinutes: 181,
    shortBio: "2019 film by Anthony and Joe Russo"
  },
  {
    id: "avatar-2009",
    title: "Avatar",
    year: 2009,
    director: "James Cameron",
    genres: [
      "science fiction film",
      "action film",
      "adventure film",
      "military science fiction",
      "live-action/animated film",
      "epic film",
      "white savior film"
    ],
    runtimeMinutes: 162,
    shortBio: "2009 film directed by James Cameron"
  },
  {
    id: "avatar-the-way-of-water-2022",
    title: "Avatar: The Way of Water",
    year: 2022,
    director: "James Cameron",
    genres: [
      "science fiction film",
      "action film",
      "adventure film",
      "speculative fiction film",
      "drama film",
      "epic film"
    ],
    runtimeMinutes: 192,
    shortBio: "2022 film by James Cameron"
  },
  {
    id: "titanic-1997",
    title: "Titanic",
    year: 1997,
    director: "James Cameron",
    genres: [
      "disaster film",
      "drama film",
      "romance film",
      "flashback film",
      "melodrama",
      "historical film",
      "epic film"
    ],
    runtimeMinutes: 195,
    shortBio: "1997 film by James Cameron"
  },
  {
    id: "jurassic-park-1993",
    title: "Jurassic Park",
    year: 1993,
    director: "Steven Spielberg",
    genres: [
      "science fiction film",
      "adventure film",
      "action film",
      "thriller film"
    ],
    runtimeMinutes: 123,
    shortBio: "1993 film by Steven Spielberg"
  },
  {
    id: "the-avengers-2012",
    title: "The Avengers",
    year: 2012,
    director: "Joss Whedon",
    genres: [
      "action film",
      "science fiction film",
      "crossover fiction",
      "superhero film",
      "speculative fiction film",
      "adventure film"
    ],
    runtimeMinutes: 142,
    shortBio: "2012 film directed by Joss Whedon"
  },
  {
    id: "avengers-infinity-war-2018",
    title: "Avengers: Infinity War",
    year: 2018,
    director: "Anthony Russo, Joe Russo",
    genres: [
      "superhero film",
      "science fiction film",
      "action film",
      "adventure film"
    ],
    runtimeMinutes: 149,
    shortBio: "2018 film by Anthony Russo and Joe Russo"
  },
  {
    id: "spider-man-no-way-home-2021",
    title: "Spider-Man: No Way Home",
    year: 2021,
    director: "Jon Watts",
    genres: [
      "superhero film",
      "action film",
      "adventure film",
      "science fiction film",
      "technofantasy"
    ],
    runtimeMinutes: 148,
    shortBio: "2021 film directed by Jon Watts"
  },
  {
    id: "top-gun-maverick-2022",
    title: "Top Gun: Maverick",
    year: 2022,
    director: "Joseph Kosinski",
    genres: [
      "action film",
      "drama film"
    ],
    runtimeMinutes: 130,
    shortBio: "2022 film directed by Joseph Kosinski"
  },
  {
    id: "black-panther-2018",
    title: "Black Panther",
    year: 2018,
    director: "Ryan Coogler",
    genres: [
      "superhero film",
      "action film",
      "adventure film",
      "science fiction film"
    ],
    runtimeMinutes: 134,
    shortBio: "2018 film directed by Ryan Coogler"
  },
  {
    id: "oppenheimer-2023",
    title: "Oppenheimer",
    year: 2023,
    director: "Christopher Nolan",
    genres: [
      "historical film",
      "biographical film",
      "thriller film",
      "epic film",
      "drama film"
    ],
    runtimeMinutes: 180,
    shortBio: "2023 film directed by Christopher Nolan"
  },
  {
    id: "barbie-2023",
    title: "Barbie",
    year: 2023,
    director: "Greta Gerwig",
    genres: [
      "romantic comedy film",
      "adventure film",
      "comedy film",
      "family film",
      "teen film",
      "fantasy film",
      "musical film",
      "romance film",
      "musical comedy",
      "fantasy comedy film",
      "chick flick",
      "satirical film"
    ],
    runtimeMinutes: 114,
    shortBio: "2023 film directed by Greta Gerwig"
  },
  {
    id: "the-super-mario-bros-movie-2023",
    title: "The Super Mario Bros. Movie",
    year: 2023,
    director: "Aaron Horvath, Michael Jelenic",
    genres: [
      "comedy film",
      "adventure film",
      "fantasy film",
      "isekai"
    ],
    runtimeMinutes: 92,
    shortBio: "2023 film directed by Aaron Horvath and Michael Jelenic"
  },
  {
    id: "inside-out-2-2024",
    title: "Inside Out 2",
    year: 2024,
    director: "Kelsey Mann",
    genres: [
      "coming-of-age film",
      "comedy drama"
    ],
    runtimeMinutes: 96,
    shortBio: "2024 animated film directed by Kelsey Mann"
  },
  {
    id: "frozen-2013",
    title: "Frozen",
    year: 2013,
    director: "Chris Buck, Jennifer Lee",
    genres: [
      "comedy drama",
      "musical film",
      "comedy film",
      "coming-of-age film",
      "fantasy film",
      "family film",
      "cinematic fairy tale"
    ],
    runtimeMinutes: 101,
    shortBio: "2013 animated film directed by Chris Buck and Jennifer Lee"
  },
  {
    id: "frozen-2-2019",
    title: "Frozen 2",
    year: 2019,
    director: "Jennifer Lee, Chris Buck",
    genres: [
      "family film",
      "fantasy film",
      "adventure film",
      "drama film",
      "musical film"
    ],
    runtimeMinutes: 103,
    shortBio: "2019 animated film directed by Chris Buck and Jennifer Lee"
  },
  {
    id: "toy-story-3-2010",
    title: "Toy Story 3",
    year: 2010,
    director: "Lee Unkrich",
    genres: [
      "buddy film",
      "comedy drama",
      "comedy film",
      "flashback film"
    ],
    runtimeMinutes: 103,
    shortBio: "2010 animated film directed by Lee Unkrich"
  },
  {
    id: "toy-story-4-2019",
    title: "Toy Story 4",
    year: 2019,
    director: "Josh Cooley, John Lasseter",
    genres: [
      "children's film",
      "comedy film",
      "adventure film",
      "fantasy film",
      "action film"
    ],
    runtimeMinutes: 100,
    shortBio: "2019 animated film directed by Josh Cooley"
  },
  {
    id: "finding-nemo-2003",
    title: "Finding Nemo",
    year: 2003,
    director: "Andrew Stanton, Lee Unkrich",
    genres: [
      "adventure film",
      "family film",
      "comedy film",
      "children's film"
    ],
    runtimeMinutes: 100,
    shortBio: "2003 animated film"
  },
  {
    id: "finding-dory-2016",
    title: "Finding Dory",
    year: 2016,
    director: "Andrew Stanton, Angus MacLane",
    genres: [
      "comedy film",
      "adventure film",
      "flashback film",
      "family film",
      "comedy drama"
    ],
    runtimeMinutes: 97,
    shortBio: "2016 animated film directed by Andrew Stanton"
  },
  {
    id: "the-incredibles-2004",
    title: "The Incredibles",
    year: 2004,
    director: "Brad Bird",
    genres: [
      "superhero film",
      "action film",
      "comedy film",
      "family film"
    ],
    runtimeMinutes: 111,
    shortBio: "2004 animated film directed by Brad Bird"
  },
  {
    id: "incredibles-2-2018",
    title: "Incredibles 2",
    year: 2018,
    director: "Brad Bird",
    genres: [
      "action film",
      "comedy film",
      "adventure film",
      "superhero film"
    ],
    runtimeMinutes: 118,
    shortBio: "2018 animated film directed by Brad Bird"
  },
  {
    id: "minions-2015",
    title: "Minions",
    year: 2015,
    director: "Pierre Coffin, Kyle Balda",
    genres: [
      "comedy film",
      "children's film",
      "heist film"
    ],
    runtimeMinutes: 91,
    shortBio: "2015 animated film by Pierre Coffin and Kyle Balda"
  },
  {
    id: "despicable-me-3-2017",
    title: "Despicable Me 3",
    year: 2017,
    director: "Pierre Coffin",
    genres: [
      "comedy film"
    ],
    runtimeMinutes: 90,
    shortBio: "2017 American 3D computer-animated comedy film directed by Pierre Coffin"
  },
  {
    id: "joker-2019",
    title: "Joker",
    year: 2019,
    director: "Todd Phillips",
    genres: [
      "crime film",
      "thriller film",
      "drama film",
      "psychological thriller film"
    ],
    runtimeMinutes: 122,
    shortBio: "2019 musical film directed by Todd Phillips"
  },
  {
    id: "the-dark-knight-rises-2012",
    title: "The Dark Knight Rises",
    year: 2012,
    director: "Christopher Nolan",
    genres: [
      "superhero film",
      "action film",
      "crime thriller film",
      "thriller film",
      "drama film"
    ],
    runtimeMinutes: 164,
    shortBio: "2012 superhero film by Christopher Nolan"
  },
  {
    id: "skyfall-2012",
    title: "Skyfall",
    year: 2012,
    director: "Sam Mendes",
    genres: [
      "action thriller",
      "spy film",
      "action film"
    ],
    runtimeMinutes: 143,
    shortBio: "2012 film by Sam Mendes"
  },
  {
    id: "no-time-to-die-2020",
    title: "No Time to Die",
    year: 2020,
    director: "Cary Joji Fukunaga, Danny Boyle, Sam Mendes",
    genres: [
      "action film",
      "thriller film",
      "spy film"
    ],
    runtimeMinutes: 163,
    shortBio: "2021 film directed by Cary Joji Fukunaga"
  },
  {
    id: "casino-royale-2006",
    title: "Casino Royale",
    year: 2006,
    director: "Martin Campbell",
    genres: [
      "spy film",
      "action film",
      "adventure film",
      "crime film",
      "thriller film"
    ],
    runtimeMinutes: 144,
    shortBio: "2006 film by Martin Campbell"
  },
  {
    id: "the-wolf-of-wall-street-2013",
    title: "The Wolf of Wall Street",
    year: 2013,
    director: "Martin Scorsese",
    genres: [
      "black comedy film",
      "biographical film",
      "crime film",
      "drama film",
      "crime drama film",
      "comedy film",
      "comedy drama",
      "epic film"
    ],
    runtimeMinutes: 180,
    shortBio: "2013 film by Martin Scorsese"
  },
  {
    id: "la-la-land-2016",
    title: "La La Land",
    year: 2016,
    director: "Dalibor Miljevic",
    genres: [
      "documentary film"
    ],
    shortBio: "2016 Bosnian documentary film directed by Dalibor Miljević"
  },
  {
    id: "the-social-network-2010",
    title: "The Social Network",
    year: 2010,
    director: "David Fincher",
    genres: [
      "biographical film",
      "trial film",
      "drama film"
    ],
    runtimeMinutes: 121,
    shortBio: "2010 film by David Fincher"
  },
  {
    id: "mad-max-fury-road-2015",
    title: "Mad Max: Fury Road",
    year: 2015,
    director: "George Miller",
    genres: [
      "action film",
      "adventure film",
      "science fiction film",
      "dystopian film",
      "post-apocalyptic film"
    ],
    runtimeMinutes: 120,
    shortBio: "2015 film directed by George Miller"
  },
  {
    id: "dune-2021",
    title: "Dune",
    year: 2021,
    director: "Denis Villeneuve",
    genres: [
      "science fiction film",
      "action film",
      "adventure film",
      "speculative fiction film"
    ],
    runtimeMinutes: 155,
    shortBio: "2021 film directed by Denis Villeneuve"
  },
  {
    id: "dune-part-two-2023",
    title: "Dune: Part Two",
    year: 2023,
    director: "Denis Villeneuve",
    genres: [
      "science fiction film",
      "action film",
      "adventure film",
      "speculative fiction film",
      "epic film"
    ],
    runtimeMinutes: 166,
    shortBio: "2024 film directed by Denis Villeneuve"
  },
  {
    id: "the-grand-budapest-hotel-2014",
    title: "The Grand Budapest Hotel",
    year: 2014,
    director: "Wes Anderson",
    genres: [
      "comedy film",
      "drama film",
      "adventure film",
      "romance film",
      "crime film",
      "tragicomedy"
    ],
    runtimeMinutes: 99,
    shortBio: "2014 film directed by Wes Anderson"
  },
  {
    id: "everything-everywhere-all-at-once-2022",
    title: "Everything Everywhere All at Once",
    year: 2022,
    director: "Dan Kwan, Daniel Scheinert",
    genres: [
      "science fiction film",
      "action film",
      "comedy drama",
      "absurdist fiction",
      "martial arts film",
      "psychedelic film"
    ],
    runtimeMinutes: 140,
    shortBio: "2022 film by Daniel Kwan and Daniel Scheinert"
  },
  {
    id: "get-out-2017",
    title: "Get Out",
    year: 2017,
    director: "Jordan Peele",
    genres: [
      "horror film",
      "mystery film",
      "comedy horror",
      "thriller film"
    ],
    runtimeMinutes: 104,
    shortBio: "2017 film directed by Jordan Peele"
  },
  {
    id: "a-quiet-place-2018",
    title: "A Quiet Place",
    year: 2018,
    director: "John Krasinski",
    genres: [
      "horror film",
      "thriller film",
      "science fiction film",
      "apocalyptic film",
      "post-apocalyptic film"
    ],
    runtimeMinutes: 90,
    shortBio: "2018 film directed by John Krasinski"
  },
  {
    id: "the-conjuring-2013",
    title: "The Conjuring",
    year: 2013,
    director: "James Wan",
    genres: [
      "horror film",
      "thriller film",
      "ghost film"
    ],
    runtimeMinutes: 112,
    shortBio: "2013 film directed by James Wan"
  },
  {
    id: "it-2017",
    title: "It",
    year: 2017,
    director: "Andy Muschietti",
    genres: [
      "supernatural horror film",
      "psychological thriller film",
      "horror film",
      "fantasy film",
      "coming-of-age film",
      "contemporary fantasy",
      "mystery film",
      "thriller film",
      "supernatural film"
    ],
    runtimeMinutes: 135,
    shortBio: "2017 film directed by Andy Muschietti"
  },
  {
    id: "the-exorcist-1973",
    title: "The Exorcist",
    year: 1973,
    director: "William Friedkin",
    genres: [
      "horror film",
      "satanic film",
      "mystery film",
      "drama film",
      "supernatural horror film",
      "thriller film"
    ],
    runtimeMinutes: 122,
    shortBio: "1973 film directed by William Friedkin"
  },
  {
    id: "halloween-1978",
    title: "Halloween",
    year: 1978,
    director: "John Carpenter",
    genres: [
      "horror film",
      "slasher film",
      "teen film",
      "drama film",
      "crime thriller film",
      "crime film",
      "crime drama film",
      "mystery film",
      "independent film",
      "thriller film",
      "teen horror film"
    ],
    runtimeMinutes: 92,
    shortBio: "1978 film directed by John Carpenter"
  },
  {
    id: "scream-1996",
    title: "Scream",
    year: 1996,
    director: "Wes Craven",
    genres: [
      "horror film",
      "slasher film",
      "teen film",
      "comedy film",
      "mystery film"
    ],
    runtimeMinutes: 111,
    shortBio: "1996 film directed by Wes Craven"
  },
  {
    id: "the-sixth-sense-1999",
    title: "The Sixth Sense",
    year: 1999,
    director: "M. Night Shyamalan",
    genres: [
      "horror film",
      "thriller film",
      "drama film",
      "ghost film",
      "psychological thriller film",
      "psychological horror film",
      "mystery film",
      "psychological drama film",
      "suspense film"
    ],
    runtimeMinutes: 107,
    shortBio: "1999 film directed by M. Night Shyamalan"
  },
  {
    id: "jaws-1975",
    title: "Jaws",
    year: 1975,
    director: "Steven Spielberg",
    genres: [
      "thriller film",
      "horror film",
      "adventure film",
      "suspense film",
      "science fiction horror film",
      "survival film",
      "natural horror film",
      "science fiction film"
    ],
    runtimeMinutes: 124,
    shortBio: "1975 film by Steven Spielberg"
  },
  {
    id: "e-t-the-extra-terrestrial-1982",
    title: "E.T. the Extra-Terrestrial",
    year: 1982,
    director: "Steven Spielberg",
    genres: [
      "science fiction film",
      "drama film",
      "children's film",
      "family film"
    ],
    runtimeMinutes: 115,
    shortBio: "1982 film directed by Steven Spielberg"
  },
  {
    id: "rocky-1976",
    title: "Rocky",
    year: 1976,
    director: "John G. Avildsen",
    genres: [
      "drama film",
      "action film",
      "boxing film"
    ],
    runtimeMinutes: 119,
    shortBio: "1976 film directed by John Avildsen"
  },
  {
    id: "creed-2015",
    title: "Creed",
    year: 2015,
    director: "Ryan Coogler",
    genres: [
      "drama film",
      "boxing film"
    ],
    runtimeMinutes: 133,
    shortBio: "2015 film directed by Ryan Coogler"
  },
  {
    id: "the-terminator-1984",
    title: "The Terminator",
    year: 1984,
    director: "James Cameron",
    genres: [
      "action film",
      "science fiction film",
      "cyberpunk",
      "dystopian film",
      "thriller film",
      "chase film",
      "time-travel film",
      "horror film",
      "fantasy film",
      "science fiction horror film",
      "post-apocalyptic film",
      "science fiction action film",
      "tech-noir film",
      "adventure film",
      "independent film",
      "drama film",
      "suspense film",
      "techno-thriller"
    ],
    runtimeMinutes: 108,
    shortBio: "1984 film by James Cameron"
  },
  {
    id: "die-hard-1988",
    title: "Die Hard",
    year: 1988,
    director: "John McTiernan",
    genres: [
      "action film",
      "action thriller",
      "Christmas film",
      "heist film"
    ],
    runtimeMinutes: 131,
    shortBio: "1988 film directed by John McTiernan"
  },
  {
    id: "heat-1995",
    title: "Heat",
    year: 1995,
    director: "Michael Mann",
    genres: [
      "epic film",
      "thriller film",
      "crime drama film",
      "action film",
      "crime thriller film",
      "crime film",
      "psychological thriller film",
      "neo-noir",
      "drama film",
      "suspense film",
      "adventure film",
      "heist film",
      "psychological drama film",
      "mystery film",
      "gangster film"
    ],
    runtimeMinutes: 171,
    shortBio: "1995 film directed by Michael Mann"
  },
  {
    id: "scarface-1983",
    title: "Scarface",
    year: 1983,
    director: "Brian De Palma",
    genres: [
      "gangster film",
      "drama film",
      "crime film",
      "thriller film",
      "crime thriller film",
      "crime drama film",
      "suspense film",
      "police procedural film",
      "action film",
      "neo-noir"
    ],
    runtimeMinutes: 170,
    shortBio: "1983 film directed by Brian De Palma"
  },
  {
    id: "the-truman-show-1998",
    title: "The Truman Show",
    year: 1998,
    director: "Peter Weir",
    genres: [
      "science fiction film",
      "comedy film",
      "drama film",
      "tragicomedy",
      "dystopian film",
      "dystopian fiction"
    ],
    runtimeMinutes: 99,
    shortBio: "1998 film directed by Peter Weir"
  },
  {
    id: "the-big-lebowski-1998",
    title: "The Big Lebowski",
    year: 1998,
    director: "Joel Coen, Ethan Coen",
    genres: [
      "comedy film",
      "crime film",
      "comedy of error",
      "film noir"
    ],
    runtimeMinutes: 117,
    shortBio: "1998 film by Joel Coen, Ethan Coen"
  },
  {
    id: "blade-runner-1982",
    title: "Blade Runner",
    year: 1982,
    director: "Ridley Scott",
    genres: [
      "tech noir",
      "cyberpunk",
      "thriller film",
      "neo-noir",
      "dystopian film",
      "film noir",
      "science fiction film",
      "drama film",
      "action film",
      "crime film",
      "crime drama film",
      "crime thriller film"
    ],
    runtimeMinutes: 112,
    shortBio: "1982 film by Ridley Scott"
  },
  {
    id: "blade-runner-2049-2017",
    title: "Blade Runner 2049",
    year: 2017,
    director: "Denis Villeneuve",
    genres: [
      "science fiction film",
      "mystery film",
      "cyberpunk",
      "dystopian film",
      "neo-noir",
      "thriller film",
      "drama film",
      "action film"
    ],
    runtimeMinutes: 164,
    shortBio: "2017 film directed by Denis Villeneuve"
  },
  {
    id: "the-notebook-2004",
    title: "The Notebook",
    year: 2004,
    director: "Nick Cassavetes",
    genres: [
      "romance film",
      "drama film",
      "coming-of-age film"
    ],
    runtimeMinutes: 123,
    shortBio: "2004 film directed by Nick Cassavetes"
  },
  {
    id: "pretty-woman-1990",
    title: "Pretty Woman",
    year: 1990,
    director: "Garry Marshall",
    genres: [
      "romantic comedy film",
      "romance film"
    ],
    runtimeMinutes: 119,
    shortBio: "1990 film directed by Garry Marshall"
  },
  {
    id: "the-devil-wears-prada-2006",
    title: "The Devil Wears Prada",
    year: 2006,
    director: "David Frankel",
    genres: [
      "comedy drama",
      "drama film"
    ],
    runtimeMinutes: 109,
    shortBio: "2006 film directed by David Frankel"
  },
  {
    id: "mean-girls-2004",
    title: "Mean Girls",
    year: 2004,
    director: "Mark Waters",
    genres: [
      "teen film",
      "romantic comedy film",
      "LGBTQ-related film",
      "comedy film"
    ],
    runtimeMinutes: 97,
    shortBio: "2004 film by Mark Waters"
  },
  {
    id: "home-alone-1990",
    title: "Home Alone",
    year: 1990,
    director: "Chris Columbus",
    genres: [
      "comedy film",
      "family film",
      "adventure film",
      "Christmas film"
    ],
    runtimeMinutes: 103,
    shortBio: "1990 film directed by Chris Columbus"
  },
  {
    id: "harry-potter-and-the-philosopher-s-stone-2001",
    title: "Harry Potter and the Philosopher's Stone",
    year: 2001,
    director: "Chris Columbus",
    genres: [
      "fantasy film",
      "adventure film",
      "speculative fiction film",
      "children's film"
    ],
    runtimeMinutes: 152,
    shortBio: "2001 film directed by Chris Columbus"
  },
  {
    id: "harry-potter-and-the-deathly-hallows-part-2-2011",
    title: "Harry Potter and the Deathly Hallows – Part 2",
    year: 2011,
    director: "David Yates",
    genres: [
      "fantasy film",
      "adventure film"
    ],
    runtimeMinutes: 130,
    shortBio: "2011 film directed by David Yates"
  },
  {
    id: "the-hobbit-an-unexpected-journey-2012",
    title: "The Hobbit: An Unexpected Journey",
    year: 2012,
    director: "Peter Jackson",
    genres: [
      "fantasy film",
      "adventure film",
      "action film"
    ],
    runtimeMinutes: 169,
    shortBio: "2012 film directed by Peter Jackson"
  }
]
