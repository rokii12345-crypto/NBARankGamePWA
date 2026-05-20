import CategoryButton from '../components/CategoryButton'
import PlayerCard from '../components/PlayerCard'
import ScoreBadge from '../components/ScoreBadge'
import {
  GAME_ROUNDS,
  type CategoryAssignment,
  type GameState,
} from '../types/game'
import { getCurrentPlayer, getTotalScore } from '../game/gameEngine'
import { formatPoints, formatStatValue } from '../game/formatResult'

type GameScreenProps = {
  game: GameState
  onSelectCategory: (categoryId: string) => void
}

function GameScreen({ game, onSelectCategory }: GameScreenProps) {
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
          {game.lastResult.missingData ? (
            <p>
              <strong>{game.lastResult.playerName}</strong> ni na lestvici za{' '}
              <strong>{game.lastResult.categoryTitle}</strong>. Kazen:{' '}
              <strong>{formatPoints(game.lastResult.points)}</strong>.
            </p>
          ) : (
            <p>
              <strong>{game.lastResult.playerName}</strong> —{' '}
              <strong>{game.lastResult.categoryTitle}</strong>:{' '}
              <strong>
                {formatStatValue(game.lastResult.value, game.lastResult.unit)}
              </strong>
              . Igralne točke:{' '}
              <strong>{formatPoints(game.lastResult.points)}</strong>.
            </p>
          )}
          <span>Naslednji igralec čez 3 sekunde ...</span>
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
    </main>
  )
}

export default GameScreen
