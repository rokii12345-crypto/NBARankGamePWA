import type { NBAPlayer } from '../data/nbaPlayers'

type PlayerCardProps = {
  player: NBAPlayer
}

function PlayerCard({ player }: PlayerCardProps) {
  return (
    <article className="player-card">
      <div className="player-card__flag" aria-hidden="true">
        {player.flagEmoji}
      </div>
      <div className="player-card__body">
        <p className="eyebrow">Trenutni igralec</p>
        <h2>{player.name}</h2>
        <p className="player-card__bio">{player.shortBio}</p>
        <dl className="player-card__facts">
          <div>
            <dt>Država</dt>
            <dd>{player.country}</dd>
          </div>
          <div>
            <dt>Ekipa</dt>
            <dd>{player.primaryTeam}</dd>
          </div>
          <div>
            <dt>Pozicija</dt>
            <dd>{player.position}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

export default PlayerCard
