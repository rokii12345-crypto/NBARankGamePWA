import ScoreBadge from '../components/ScoreBadge'
import { formatStatValue } from '../game/formatResult'
import {
  getCurrentHigherLowerQuestion,
  getHigherLowerScore,
  isHigherLowerGameComplete,
} from '../game/higherLowerEngine'
import {
  GAME_ROUNDS,
  type HigherLowerChoice,
  type HigherLowerGameState,
} from '../types/game'

type HigherLowerScreenProps = {
  game: HigherLowerGameState
  countdown: number
  onSelectAnswer: (choice: HigherLowerChoice) => void
  onRestart: () => void
  onHome: () => void
}

function HigherLowerScreen({
  game,
  countdown,
  onSelectAnswer,
  onRestart,
  onHome,
}: HigherLowerScreenProps) {
  const question = getCurrentHigherLowerQuestion(game)
  const score = getHigherLowerScore(game)
  const isComplete = isHigherLowerGameComplete(game)
  const lastAnswer =
    game.lastAnswer?.questionIndex === game.currentQuestionIndex
      ? game.lastAnswer
      : null

  if (isComplete || !question) {
    return (
      <main className="screen final-screen higher-lower-final-screen">
        <section className="final-summary">
          <p className="eyebrow">Višje ali nižje</p>
          <h1>{score} / 10</h1>
          <ScoreBadge
            label="Pravilni odgovori"
            value={`${score} / ${GAME_ROUNDS}`}
            tone="success"
          />
        </section>

        <section className="final-list" aria-label="Odgovori">
          {game.answers.map((answer) => (
            <article className="final-row" key={answer.questionIndex}>
              <span>{answer.isCorrect ? 'Pravilno' : 'Napačno'}</span>
              <strong>{answer.nextMunicipalityName}</strong>
              <em>
                {formatStatValue(answer.nextValue, game.category.unit, game.category.decimals)}
              </em>
            </article>
          ))}
        </section>

        <div className="action-row">
          <button className="primary-button" type="button" onClick={onRestart}>
            Nova igra
          </button>
          <button className="ghost-button" type="button" onClick={onHome}>
            Izbira načina
          </button>
        </div>
      </main>
    )
  }

  const nextValue = formatStatValue(
    question.nextRanking.value,
    game.category.unit,
    game.category.decimals,
  )
  const previousValue = formatStatValue(
    question.previousRanking.value,
    game.category.unit,
    game.category.decimals,
  )
  const isAnswered = Boolean(lastAnswer)

  return (
    <main className="screen game-screen higher-lower-game-screen">
      <header className="game-header">
        <ScoreBadge
          label="Vprašanje"
          value={`${Math.min(game.currentQuestionIndex + 1, GAME_ROUNDS)} / ${GAME_ROUNDS}`}
        />
        <ScoreBadge
          label="Pravilno"
          value={`${score} / ${GAME_ROUNDS}`}
          tone="accent"
        />
      </header>

      <section className="higher-lower-category-card">
        <p className="eyebrow">Kategorija</p>
        <h1>
          <span aria-hidden="true">{game.category.icon}</span>
          {game.category.title}
        </h1>
      </section>

      <section className="comparison-stack" aria-label="Primerjava občin">
        <article className="comparison-card">
          <p className="eyebrow">Prejšnja občina</p>
          <h2>{question.previousMunicipality.name}</h2>
          <strong>{previousValue}</strong>
        </article>

        <article className="comparison-card comparison-card--next">
          <p className="eyebrow">Nova občina</p>
          <h2>{question.nextMunicipality.name}</h2>
          <strong>{isAnswered ? nextValue : 'Vrednost je skrita'}</strong>
        </article>
      </section>

      <p className="higher-lower-question">
        Ali ima {question.nextMunicipality.name} višjo ali nižjo vrednost kot{' '}
        {question.previousMunicipality.name}?
      </p>

      <section className="higher-lower-actions" aria-label="Odgovori">
        <button
          className={`higher-lower-button higher-lower-button--up${
            lastAnswer?.choice === 'higher' ? ' higher-lower-button--selected' : ''
          }`}
          type="button"
          disabled={game.isResolving || isAnswered}
          onClick={() => onSelectAnswer('higher')}
        >
          <span aria-hidden="true">⬆️</span>
          Višje
        </button>
        <button
          className={`higher-lower-button higher-lower-button--down${
            lastAnswer?.choice === 'lower' ? ' higher-lower-button--selected' : ''
          }`}
          type="button"
          disabled={game.isResolving || isAnswered}
          onClick={() => onSelectAnswer('lower')}
        >
          <span aria-hidden="true">⬇️</span>
          Nižje
        </button>
      </section>

      {lastAnswer ? (
        <section
          className={`result-panel higher-lower-result-panel${
            lastAnswer.isCorrect ? ' higher-lower-result-panel--correct' : ''
          }`}
          aria-live="polite"
        >
          <p>
            <strong>{lastAnswer.isCorrect ? 'Pravilno.' : 'Napačno.'}</strong>{' '}
            {question.nextMunicipality.name} — {nextValue}.
          </p>
          <span>Naslednje vprašanje čez {countdown} s ...</span>
        </section>
      ) : null}
    </main>
  )
}

export default HigherLowerScreen
