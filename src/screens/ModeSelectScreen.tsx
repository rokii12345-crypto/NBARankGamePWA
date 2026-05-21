import type { GameMode } from '../types/game'

type ModeSelectScreenProps = {
  onStart: (mode: GameMode) => void
  onRules: () => void
}

function ModeSelectScreen({ onStart, onRules }: ModeSelectScreenProps) {
  return (
    <main className="screen mode-select-screen">
      <section className="mode-select-hero">
        <p className="eyebrow">Rank igre</p>
        <h1>Izberi način igre</h1>

        <div className="mode-card-grid" aria-label="Načini igre">
          <button
            className="mode-card"
            type="button"
            onClick={() => onStart('nba')}
          >
            <span className="mode-card__icon" aria-hidden="true">
              🏀
            </span>
            <span className="mode-card__body">
              <strong>NBA Rank Game</strong>
              <small>Igralci, NBA kategorije in čim nižji rezultat.</small>
            </span>
          </button>

          <button
            className="mode-card mode-card--slovenia"
            type="button"
            onClick={() => onStart('slovenia')}
          >
            <span className="mode-card__icon" aria-hidden="true">
              🇸🇮
            </span>
            <span className="mode-card__body">
              <strong>Rank Slovenija</strong>
              <small>Občine, statistične kategorije in popolni podatki.</small>
            </span>
          </button>

          <button
            className="mode-card mode-card--guess"
            type="button"
            onClick={() => onStart('guess-municipality')}
          >
            <span className="mode-card__icon" aria-hidden="true">
              🧭
            </span>
            <span className="mode-card__body">
              <strong>Ugani občino</strong>
              <small>Pet statističnih namigov in štirje možni odgovori.</small>
            </span>
          </button>

          <button
            className="mode-card mode-card--higher-lower"
            type="button"
            onClick={() => onStart('higher-lower')}
          >
            <span className="mode-card__icon" aria-hidden="true">
              ↕️
            </span>
            <span className="mode-card__body">
              <strong>Višje ali nižje</strong>
              <small>Primerjaj občine v eni slovenski kategoriji.</small>
            </span>
          </button>
        </div>

        <button className="ghost-button" type="button" onClick={onRules}>
          Pravila
        </button>
      </section>
    </main>
  )
}

export default ModeSelectScreen
