import { useState } from 'react'
import type { GameMode } from '../types/game'

type ModeGroup = 'root' | 'slovenia' | 'sport'

type ModeSelectScreenProps = {
  onStart: (mode: GameMode) => void
  onRules: () => void
}

function ModeSelectScreen({ onStart, onRules }: ModeSelectScreenProps) {
  const [group, setGroup] = useState<ModeGroup>('root')

  const renderRoot = () => (
    <>
      <p className="eyebrow">Rank igre</p>
      <h1>Izberi skupino</h1>

      <div className="mode-card-grid" aria-label="Skupine iger">
        <button
          className="mode-card mode-card--slovenia"
          type="button"
          onClick={() => setGroup('slovenia')}
        >
          <span className="mode-card__icon" aria-hidden="true">
            🇸🇮
          </span>
          <span className="mode-card__body">
            <strong>Slovenija</strong>
            <small>Občine, statistike in slovenski podatkovni izzivi.</small>
          </span>
        </button>

        <button
          className="mode-card mode-card--sport"
          type="button"
          onClick={() => setGroup('sport')}
        >
          <span className="mode-card__icon" aria-hidden="true">
            🏟️
          </span>
          <span className="mode-card__body">
            <strong>Šport</strong>
            <small>Športne rank igre in primerjave.</small>
          </span>
        </button>
      </div>

      <button className="ghost-button" type="button" onClick={onRules}>
        Pravila
      </button>
    </>
  )

  const renderSlovenia = () => (
    <>
      <p className="eyebrow">Slovenija</p>
      <h1>Občinske igre</h1>

      <div className="mode-card-grid" aria-label="Slovenske igre">
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

      <div className="menu-action-row">
        <button className="ghost-button" type="button" onClick={() => setGroup('root')}>
          Nazaj
        </button>
        <button className="ghost-button" type="button" onClick={onRules}>
          Pravila
        </button>
      </div>
    </>
  )

  const renderSport = () => (
    <>
      <p className="eyebrow">Šport</p>
      <h1>Športne igre</h1>

      <div className="mode-card-grid" aria-label="Športne igre">
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
      </div>

      <div className="menu-action-row">
        <button className="ghost-button" type="button" onClick={() => setGroup('root')}>
          Nazaj
        </button>
        <button className="ghost-button" type="button" onClick={onRules}>
          Pravila
        </button>
      </div>
    </>
  )

  return (
    <main className="screen mode-select-screen">
      <section className="mode-select-hero">
        {group === 'slovenia'
          ? renderSlovenia()
          : group === 'sport'
            ? renderSport()
            : renderRoot()}
      </section>
    </main>
  )
}

export default ModeSelectScreen
