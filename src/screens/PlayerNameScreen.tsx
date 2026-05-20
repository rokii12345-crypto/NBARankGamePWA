import type { NBAPlayer } from '../data/nbaPlayers'
import PlayerCard from '../components/PlayerCard'

type PlayerNameScreenProps = {
  player: NBAPlayer
  onContinue: () => void
}

function PlayerNameScreen({ player, onContinue }: PlayerNameScreenProps) {
  return (
    <main className="screen player-name-screen">
      <p className="eyebrow">Prvi igralec je pripravljen</p>
      <PlayerCard player={player} />
      <button className="primary-button" type="button" onClick={onContinue}>
        Izberi kategorijo
      </button>
    </main>
  )
}

export default PlayerNameScreen
