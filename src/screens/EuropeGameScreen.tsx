import CountryCard from '../components/CountryCard'
import EuropeCategoryButton from '../components/EuropeCategoryButton'
import ScoreBadge from '../components/ScoreBadge'
import { formatEuropeRoundResult } from '../game/formatResult'
import {
  getCurrentEuropeCountry,
  getEuropeTotalScore,
} from '../game/europeGameEngine'
import {
  GAME_ROUNDS,
  type EuropeCategoryAssignment,
  type EuropeGameState,
} from '../types/game'

type EuropeGameScreenProps = {
  game: EuropeGameState
  countdown: number
  onSelectCategory: (categoryId: string) => void
  onRestart: () => void
  onBack: () => void
}

function EuropeGameScreen({
  game,
  countdown,
  onSelectCategory,
  onRestart,
  onBack,
}: EuropeGameScreenProps) {
  const country = getCurrentEuropeCountry(game)
  const totalScore = getEuropeTotalScore(game)
  const assignmentsByCategory = new Map<string, EuropeCategoryAssignment>(
    game.assignments.map((assignment) => [assignment.categoryId, assignment]),
  )

  if (!country) {
    return null
  }

  return (
    <main className="screen game-screen europe-game-screen">
      <header className="game-header">
        <ScoreBadge
          label="Krog"
          value={`${Math.min(game.currentRoundIndex + 1, GAME_ROUNDS)} / ${GAME_ROUNDS}`}
        />
        <ScoreBadge label="Skupaj" value={totalScore} tone="accent" />
      </header>

      <CountryCard country={country} />

      {game.lastResult ? (
        <section className="result-panel" aria-live="polite">
          <p>{formatEuropeRoundResult(game.lastResult)}</p>
          <span>Naslednja država čez {countdown} s ...</span>
        </section>
      ) : (
        <p className="choose-copy">Izberi kategorijo za to državo.</p>
      )}

      <section className="category-grid" aria-label="Kategorije">
        {game.categories.map((category) => (
          <EuropeCategoryButton
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

export default EuropeGameScreen
