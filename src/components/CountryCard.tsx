import type { EuropeCountry } from '../data/europeCountries'

type CountryCardProps = {
  country: EuropeCountry
}

function CountryCard({ country }: CountryCardProps) {
  return (
    <article className="player-card country-card">
      <div className="player-card__flag" aria-hidden="true">
        {country.flagEmoji}
      </div>
      <div className="player-card__body">
        <p className="eyebrow">Trenutna država</p>
        <h2>{country.name}</h2>
        <dl className="player-card__facts country-card__facts">
          <div>
            <dt>Oznaka</dt>
            <dd>{country.code}</dd>
          </div>
          <div>
            <dt>Regija</dt>
            <dd>{country.region}</dd>
          </div>
          <div>
            <dt>Glavno mesto</dt>
            <dd>{country.capital}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

export default CountryCard
