import ScoreBadge from '../components/ScoreBadge'
import { formatEuropeAssignmentResult } from '../game/formatResult'
import { getEuropeTotalScore } from '../game/europeGameEngine'
import type { EuropeGameState } from '../types/game'

type EuropeFinalResultScreenProps = {
  game: EuropeGameState
  onRestart: () => void
  onHome: () => void
}

const getResultText = (score: number) => {
  if (score <= 80) return 'Evropski mojster'
  if (score <= 160) return 'Odličen poznavalec Evrope'
  if (score <= 250) return 'Dober evropski rezultat'
  if (score <= 350) return 'Pogumna igra'
  return 'Prostor za boljši izbor'
}

function EuropeFinalResultScreen({
  game,
  onRestart,
  onHome,
}: EuropeFinalResultScreenProps) {
  const totalScore = getEuropeTotalScore(game)

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
              <span>{assignment.countryName}</span>
              <strong>{category?.title ?? 'Kategorija'}</strong>
              <em>
                {formatEuropeAssignmentResult(assignment, category, {
                  includeCountryName: false,
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

export default EuropeFinalResultScreen
