import CategoryButton from '../components/CategoryButton'
import PlayerCard from '../components/PlayerCard'
import ScoreBadge from '../components/ScoreBadge'
import {
  GAME_ROUNDS,
  type CategoryAssignment,
  type GameState,
} from '../types/game'
import { formatRoundResult } from '../game/formatResult'
import { getCurrentPlayer, getTotalScore } from '../game/gameEngine'

type GameScreenProps = {
  game: GameState
  countdown: number
  onSelectCategory: (categoryId: string) => void
  onRestart: () => void
  onBack: () => void
}

function GameScreen({
  game,
  countdown,
  onSelectCategory,
  onRestart,
  onBack,
}: GameScreenProps) {
  const player = getCurrentPlayer(game)
  const totalScore = getTotalScore(game)
  const assignmentsByCategory = new Map<string, CategoryAssignment>(
    game.assignments.map((assignment) => [assignment.categoryId, assignment]),
  )

  if (!player) {
    return null
  }

  return (
    <main className="screen game-screen">
      <header className="game-header">
        <ScoreBadge
          label="Krog"
          value={`${Math.min(game.currentRoundIndex + 1, GAME_ROUNDS)} / ${GAME_ROUNDS}`}
        />
        <ScoreBadge label="Skupaj" value={totalScore} tone="accent" />
      </header>

      <PlayerCard player={player} />

      {game.lastResult ? (
        <section className="result-panel" aria-live="polite">
          <p>{formatRoundResult(game.lastResult)}</p>
          <span>Naslednji igralec čez {countdown} s ...</span>
        </section>
      ) : (
        <p className="choose-copy">Izberi kategorijo za tega igralca.</p>
      )}

      <section className="category-grid" aria-label="Kategorije">
        {game.categories.map((category) => (
          <CategoryButton
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

export default GameScreen
