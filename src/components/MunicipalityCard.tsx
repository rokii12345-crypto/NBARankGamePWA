import type { SloveniaMunicipality } from '../data/sloveniaMunicipalities'

type MunicipalityCardProps = {
  municipality: SloveniaMunicipality
}

function MunicipalityCard({ municipality }: MunicipalityCardProps) {
  return (
    <article className="player-card municipality-card">
      <div className="player-card__flag" aria-hidden="true">
        {municipality.emoji}
      </div>
      <div className="player-card__body">
        <p className="eyebrow">Trenutna občina</p>
        <h2>{municipality.name}</h2>
        <dl className="player-card__facts municipality-card__facts">
          <div>
            <dt>Šifra</dt>
            <dd>{municipality.code}</dd>
          </div>
          <div>
            <dt>Igra</dt>
            <dd>Rank Slovenija</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

export default MunicipalityCard
