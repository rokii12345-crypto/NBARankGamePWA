import ScoreBadge from '../components/ScoreBadge'
import { formatMovieAssignmentResult } from '../game/formatResult'
import { getMovieTotalScore } from '../game/movieGameEngine'
import type { MovieGameState } from '../types/game'

type MovieFinalResultScreenProps = {
  game: MovieGameState
  onRestart: () => void
  onHome: () => void
}

const getResultText = (score: number) => {
  if (score <= 80) return 'Filmski mojster'
  if (score <= 160) return 'Odličen izbor'
  if (score <= 250) return 'Dober filmski rezultat'
  if (score <= 350) return 'Pogumna projekcija'
  return 'Preveč tveganih kategorij'
}

function MovieFinalResultScreen({
  game,
  onRestart,
  onHome,
}: MovieFinalResultScreenProps) {
  const totalScore = getMovieTotalScore(game)

  return (
    <main className="screen final-screen movie-final-screen">
      <section className="final-summary">
        <p className="eyebrow">Konec igre</p>
        <h1>{getResultText(totalScore)}</h1>
        <ScoreBadge label="Končni rezultat" value={totalScore} tone="success" />
      </section>

      <section className="final-list" aria-label="Rezultati po kategorijah">
        {game.assignments.map((assignment) => {
          const category = game.categories.find(
            (item) => item.id === assignment.categoryId,
          )

          return (
            <article className="final-row" key={assignment.categoryId}>
              <span>{assignment.movieTitle}</span>
              <strong>{category?.title ?? 'Kategorija'}</strong>
              <em>
                {formatMovieAssignmentResult(assignment, category, {
                  includeMovieTitle: false,
                })}
              </em>
            </article>
          )
        })}
      </section>

      <div className="action-row">
        <button className="primary-button" type="button" onClick={onRestart}>
          Nova igra
        </button>
        <button className="ghost-button" type="button" onClick={onHome}>
          Nazaj
        </button>
      </div>
    </main>
  )
}

export default MovieFinalResultScreen
