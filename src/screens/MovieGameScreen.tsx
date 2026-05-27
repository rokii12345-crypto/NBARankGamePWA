import MovieCard from '../components/MovieCard'
import MovieCategoryButton from '../components/MovieCategoryButton'
import ScoreBadge from '../components/ScoreBadge'
import { formatMovieRoundResult } from '../game/formatResult'
import {
  getCurrentMovie,
  getMovieTotalScore,
} from '../game/movieGameEngine'
import {
  GAME_ROUNDS,
  type MovieCategoryAssignment,
  type MovieGameState,
} from '../types/game'

type MovieGameScreenProps = {
  game: MovieGameState
  countdown: number
  onSelectCategory: (categoryId: string) => void
  onRestart: () => void
  onBack: () => void
}

function MovieGameScreen({
  game,
  countdown,
  onSelectCategory,
  onRestart,
  onBack,
}: MovieGameScreenProps) {
  const movie = getCurrentMovie(game)
  const totalScore = getMovieTotalScore(game)
  const assignmentsByCategory = new Map<string, MovieCategoryAssignment>(
    game.assignments.map((assignment) => [assignment.categoryId, assignment]),
  )

  if (game.setupError || !movie) {
    return (
      <main className="screen final-screen movie-empty-screen">
        <section className="final-summary">
          <p className="eyebrow">Rank Filmi</p>
          <h1>Podatki še manjkajo</h1>
          <p className="movie-empty-copy">
            {game.setupError ??
              'Ni filma za prikaz. Preveri filmske podatkovne datoteke.'}
          </p>
        </section>

        <div className="action-row">
          <button className="primary-button" type="button" onClick={onRestart}>
            Poskusi znova
          </button>
          <button className="ghost-button" type="button" onClick={onBack}>
            Nazaj
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="screen game-screen movie-game-screen">
      <header className="game-header">
        <ScoreBadge
          label="Krog"
          value={`${Math.min(game.currentRoundIndex + 1, GAME_ROUNDS)} / ${GAME_ROUNDS}`}
        />
        <ScoreBadge label="Skupaj" value={totalScore} tone="accent" />
      </header>

      <MovieCard movie={movie} />

      {game.lastResult ? (
        <section className="result-panel movie-result-panel" aria-live="polite">
          <p>{formatMovieRoundResult(game.lastResult)}</p>
          <span>Naslednji film čez {countdown} s ...</span>
        </section>
      ) : (
        <p className="choose-copy">Izberi kategorijo za ta film.</p>
      )}

      <section className="category-grid" aria-label="Filmske kategorije">
        {game.categories.map((category) => (
          <MovieCategoryButton
            key={category.id}
            category={category}
            assignment={assignmentsByCategory.get(category.id)}
            disabled={game.isResolving}
            onSelect={onSelectCategory}
          />
        ))}
      </section>

      <div className="game-action-row">
        <button className="utility-button" type="button" onClick={onBack}>
          Nazaj
        </button>
        <button className="utility-button" type="button" onClick={onRestart}>
          Nova igra
        </button>
      </div>
    </main>
  )
}

export default MovieGameScreen
