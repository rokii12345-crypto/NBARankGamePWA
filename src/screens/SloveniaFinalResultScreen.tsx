import ScoreBadge from '../components/ScoreBadge'
import { formatSloveniaAssignmentResult } from '../game/formatResult'
import { getSloveniaTotalScore } from '../game/sloveniaGameEngine'
import type { SloveniaGameState } from '../types/game'

type SloveniaFinalResultScreenProps = {
  game: SloveniaGameState
  onRestart: () => void
  onHome: () => void
}

const getResultText = (score: number) => {
  if (score <= 80) return 'Mojster občin'
  if (score <= 160) return 'Odličen poznavalec'
  if (score <= 250) return 'Dober rezultat'
  if (score <= 350) return 'Pogumna igra'
  return 'Prostor za boljši izbor'
}

function SloveniaFinalResultScreen({
  game,
  onRestart,
  onHome,
}: SloveniaFinalResultScreenProps) {
  const totalScore = getSloveniaTotalScore(game)

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
              <span>{assignment.municipalityName}</span>
              <strong>{category?.title ?? 'Kategorija'}</strong>
              <em>
                {formatSloveniaAssignmentResult(assignment, category, {
                  includeMunicipalityName: false,
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
          Izbira načina
        </button>
      </div>
    </main>
  )
}

export default SloveniaFinalResultScreen
