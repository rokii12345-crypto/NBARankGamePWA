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
  const correctDirectionText =
    lastAnswer?.correctChoice === 'higher' ? 'višjo' : 'nižjo'
  const getAnswerButtonClassName = (choice: HigherLowerChoice) => {
    const classNames = [
      'higher-lower-button',
      choice === 'higher'
        ? 'higher-lower-button--up'
        : 'higher-lower-button--down',
    ]

    if (lastAnswer && choice === lastAnswer.correctChoice) {
      classNames.push('higher-lower-button--correct')
    }

    if (
      lastAnswer &&
      choice === lastAnswer.choice &&
      !lastAnswer.isCorrect
    ) {
      classNames.push('higher-lower-button--wrong')
    }

    return classNames.join(' ')
  }

  return (
    <main className="screen game-screen higher-lower-game-screen">
      <header className="higher-lower-topbar">
        <div className="higher-lower-stat-card">
          <span>Vprašanje</span>
          <strong>
            {Math.min(game.currentQuestionIndex + 1, GAME_ROUNDS)} /{' '}
            {GAME_ROUNDS}
          </strong>
        </div>
        <div className="higher-lower-stat-card higher-lower-stat-card--score">
          <span>Pravilno</span>
          <strong>
            {score} / {GAME_ROUNDS}
          </strong>
        </div>
      </header>

      <section className="higher-lower-category-card">
        <p className="eyebrow">Kategorija</p>
        <div className="higher-lower-category-main">
          <span aria-hidden="true">{game.category.icon}</span>
          <div>
            <h1>{game.category.title}</h1>
            <p>{game.category.subtitle}</p>
          </div>
        </div>
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
          <strong>{isAnswered ? nextValue : 'Podatek je skrit'}</strong>
        </article>
      </section>

      <p className="higher-lower-question">
        Ali ima <strong>{question.nextMunicipality.name}</strong> višjo ali
        nižjo vrednost kot{' '}
        <strong>{question.previousMunicipality.name}</strong>?
      </p>

      <section className="higher-lower-actions" aria-label="Odgovori">
        <button
          className={getAnswerButtonClassName('higher')}
          type="button"
          disabled={game.isResolving || isAnswered}
          onClick={() => onSelectAnswer('higher')}
        >
          <span aria-hidden="true">⬆️</span>
          <strong>Višje</strong>
          <small>večja vrednost</small>
        </button>
        <button
          className={getAnswerButtonClassName('lower')}
          type="button"
          disabled={game.isResolving || isAnswered}
          onClick={() => onSelectAnswer('lower')}
        >
          <span aria-hidden="true">⬇️</span>
          <strong>Nižje</strong>
          <small>manjša vrednost</small>
        </button>
      </section>

      {lastAnswer ? (
        <section
          className={`result-panel higher-lower-result-panel${
            lastAnswer.isCorrect ? ' higher-lower-result-panel--correct' : ''
          }`}
          aria-live="polite"
        >
          <strong className="higher-lower-result-value">
            {question.nextMunicipality.name} — {nextValue}
          </strong>
          <p>
            {lastAnswer.isCorrect ? 'Pravilno!' : 'Napačno.'}{' '}
            {question.nextMunicipality.name} ima {correctDirectionText}{' '}
            vrednost.
          </p>
          <span>Naslednje vprašanje čez {countdown} s ...</span>
        </section>
      ) : null}
    </main>
  )
}

export default HigherLowerScreen
