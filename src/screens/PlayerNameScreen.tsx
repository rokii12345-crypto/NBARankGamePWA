import type { NBAPlayer } from '../data/nbaPlayers'
import PlayerCard from '../components/PlayerCard'

type PlayerNameScreenProps = {
  player: NBAPlayer
  onContinue: () => void
  onRestart: () => void
  onBack: () => void
}

function PlayerNameScreen({
  player,
  onContinue,
  onRestart,
  onBack,
}: PlayerNameScreenProps) {
  return (
    <main className="screen player-name-screen">
      <p className="eyebrow">Prvi igralec je pripravljen</p>
      <PlayerCard player={player} />
      <div className="game-action-row">
        <button className="utility-button" type="button" onClick={onBack}>
          Nazaj
        </button>
        <button className="utility-button" type="button" onClick={onRestart}>
          Nova igra
        </button>
      </div>
      <button className="primary-button" type="button" onClick={onContinue}>
        Izberi kategorijo
      </button>
    </main>
  )
}

export default PlayerNameScreen
