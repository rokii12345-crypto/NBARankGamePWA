import ScoreBadge from '../components/ScoreBadge'
import { getTotalScore } from '../game/gameEngine'
import type { GameState } from '../types/game'

type FinalResultScreenProps = {
  game: GameState
  onRestart: () => void
  onHome: () => void
}

const getResultText = (score: number) => {
  if (score <= 80) return 'NBA genij'
  if (score <= 160) return 'Odličen strateg'
  if (score <= 250) return 'Dober rezultat'
  if (score <= 350) return 'Tvegana igra'
  return 'Preveč zgrešenih kategorij'
}

function FinalResultScreen({ game, onRestart, onHome }: FinalResultScreenProps) {
  const totalScore = getTotalScore(game)

  return (
    <main className="screen final-screen">
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
              <span>{assignment.playerName}</span>
              <strong>{category?.title ?? 'Kategorija'}</strong>
              <em>
                {assignment.missingData
                  ? `ni na lestvici · ${assignment.points} točk`
                  : `#${assignment.rank} · ${assignment.points} točk`}
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
          Domov
        </button>
      </div>
    </main>
  )
}

export default FinalResultScreen
