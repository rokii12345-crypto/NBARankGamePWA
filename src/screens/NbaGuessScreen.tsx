import ScoreBadge from '../components/ScoreBadge'
import {
  getCurrentNbaGuessQuestion,
  getNbaGuessScore,
  isNbaGuessGameComplete,
} from '../game/nbaGuessEngine'
import { GAME_ROUNDS, type NBAGuessGameState } from '../types/game'

type NbaGuessScreenProps = {
  game: NBAGuessGameState
  countdown: number
  onSelectAnswer: (playerId: string) => void
  onRestart: () => void
  onHome: () => void
}

function NbaGuessScreen({
  game,
  countdown,
  onSelectAnswer,
  onRestart,
  onHome,
}: NbaGuessScreenProps) {
  const question = getCurrentNbaGuessQuestion(game)
  const score = getNbaGuessScore(game)
  const isComplete = isNbaGuessGameComplete(game)
  const lastAnswer =
    game.lastAnswer?.questionIndex === game.currentQuestionIndex
      ? game.lastAnswer
      : null

  if (isComplete || !question) {
    return (
      <main className="screen final-screen nba-guess-final-screen">
        <section className="final-summary">
          <p className="eyebrow">Ugani NBA igralca</p>
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
              <strong>{answer.correctPlayerName}</strong>
              <em>Izbral si: {answer.selectedPlayerName}</em>
            </article>
          ))}
        </section>

        <div className="action-row">
          <button className="primary-button" type="button" onClick={onRestart}>
            Nova igra
          </button>
          <button className="ghost-button" type="button" onClick={onHome}>
            Nazaj
          </button>
        </div>
      </main>
    )
  }

  const isAnswered = Boolean(lastAnswer)

  return (
    <main className="screen game-screen nba-guess-game-screen">
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

      <section className="guess-prompt-card nba-guess-prompt-card" aria-label="Skriti NBA igralec">
        <p className="eyebrow">Skriti igralec</p>
        <h1>Kateri NBA igralec je to?</h1>
        <p className="nba-guess-copy">Dva statistična namiga in en profilni namig.</p>
      </section>

      <section className="hint-grid" aria-label="NBA namigi">
        {question.hints.map((hint) => (
          <article className="hint-card nba-guess-hint-card" key={`${hint.label}-${hint.value}`}>
            <span className="hint-card__icon" aria-hidden="true">
              {hint.icon}
            </span>
            <div className="hint-card__body">
              <strong>{hint.label}</strong>
              <span>{hint.value}</span>
            </div>
            {hint.badge ? <em>{hint.badge}</em> : null}
          </article>
        ))}
      </section>

      <section className="answer-grid" aria-label="Možni odgovori">
        {question.options.map((option) => {
          const answerClassNames = ['answer-button']

          if (lastAnswer && option.id === lastAnswer.correctPlayerId) {
            answerClassNames.push('answer-button--correct')
          } else if (lastAnswer && option.id === lastAnswer.selectedPlayerId) {
            answerClassNames.push('answer-button--wrong')
          }

          return (
            <button
              className={answerClassNames.join(' ')}
              type="button"
              key={option.id}
              disabled={game.isResolving || isAnswered}
              onClick={() => onSelectAnswer(option.id)}
            >
              {option.name}
            </button>
          )
        })}
      </section>

      {lastAnswer ? (
        <section
          className={`result-panel guess-result-panel${
            lastAnswer.isCorrect ? ' guess-result-panel--correct' : ''
          }`}
          aria-live="polite"
        >
          <p>
            <strong>{lastAnswer.isCorrect ? 'Pravilno.' : 'Ni pravilno.'}</strong>{' '}
            Pravilni igralec je {lastAnswer.correctPlayerName}.
          </p>
          <span>Naslednje vprašanje čez {countdown} s ...</span>
        </section>
      ) : null}

      <div className="game-action-row">
        <button className="utility-button" type="button" onClick={onHome}>
          Nazaj
        </button>
        <button className="utility-button" type="button" onClick={onRestart}>
          Nova igra
        </button>
      </div>
    </main>
  )
}

export default NbaGuessScreen
