import MunicipalityCard from '../components/MunicipalityCard'
import ScoreBadge from '../components/ScoreBadge'
import SloveniaCategoryButton from '../components/SloveniaCategoryButton'
import { formatSloveniaRoundResult } from '../game/formatResult'
import {
  getCurrentMunicipality,
  getSloveniaTotalScore,
} from '../game/sloveniaGameEngine'
import {
  GAME_ROUNDS,
  type SloveniaCategoryAssignment,
  type SloveniaGameState,
} from '../types/game'

type SloveniaGameScreenProps = {
  game: SloveniaGameState
  countdown: number
  onSelectCategory: (categoryId: string) => void
  onRestart: () => void
  onBack: () => void
}

function SloveniaGameScreen({
  game,
  countdown,
  onSelectCategory,
  onRestart,
  onBack,
}: SloveniaGameScreenProps) {
  const municipality = getCurrentMunicipality(game)
  const totalScore = getSloveniaTotalScore(game)
  const assignmentsByCategory = new Map<string, SloveniaCategoryAssignment>(
    game.assignments.map((assignment) => [assignment.categoryId, assignment]),
  )

  if (!municipality) {
    return null
  }

  return (
    <main className="screen game-screen slovenia-game-screen">
      <header className="game-header">
        <ScoreBadge
          label="Krog"
          value={`${Math.min(game.currentRoundIndex + 1, GAME_ROUNDS)} / ${GAME_ROUNDS}`}
        />
        <ScoreBadge label="Skupaj" value={totalScore} tone="accent" />
      </header>

      <MunicipalityCard municipality={municipality} />

      <div className="game-action-row">
        <button className="utility-button" type="button" onClick={onBack}>
          Nazaj
        </button>
        <button className="utility-button" type="button" onClick={onRestart}>
          Nova igra
        </button>
      </div>

      {game.lastResult ? (
        <section className="result-panel" aria-live="polite">
          <p>{formatSloveniaRoundResult(game.lastResult)}</p>
          <span>Naslednja občina čez {countdown} s ...</span>
        </section>
      ) : (
        <p className="choose-copy">Izberi kategorijo za to občino.</p>
      )}

      <section className="category-grid" aria-label="Kategorije">
        {game.categories.map((category) => (
          <SloveniaCategoryButton
            key={category.id}
            category={category}
            assignment={assignmentsByCategory.get(category.id)}
            disabled={game.isResolving}
            onSelect={onSelectCategory}
          />
        ))}
      </section>
    </main>
  )
}

export default SloveniaGameScreen
