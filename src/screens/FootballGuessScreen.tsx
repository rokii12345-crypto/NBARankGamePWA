import ScoreBadge from '../components/ScoreBadge'
import {
  getCurrentFootballGuessQuestion,
  getFootballGuessScore,
  isFootballGuessGameComplete,
} from '../game/footballGuessEngine'
import { GAME_ROUNDS, type FootballGuessGameState } from '../types/game'

type FootballGuessScreenProps = {
  game: FootballGuessGameState
  countdown: number
  onSelectAnswer: (clubId: string) => void
  onRestart: () => void
  onHome: () => void
}

function FootballGuessScreen({
  game,
  countdown,
  onSelectAnswer,
  onRestart,
  onHome,
}: FootballGuessScreenProps) {
  const question = getCurrentFootballGuessQuestion(game)
  const score = getFootballGuessScore(game)
  const isComplete = isFootballGuessGameComplete(game)
  const lastAnswer =
    game.lastAnswer?.questionIndex === game.currentQuestionIndex
      ? game.lastAnswer
      : null

  if (isComplete || !question) {
    return (
      <main className="screen final-screen football-final-screen">
        <section className="final-summary">
          <p className="eyebrow">Ugani klub</p>
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
              <strong>{answer.correctClubName}</strong>
              <em>Izbral si: {answer.selectedClubName}</em>
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
    <main className="screen game-screen football-game-screen">
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

      <section className="guess-prompt-card football-prompt-card" aria-label="Skriti klub">
        <p className="eyebrow">Skriti klub</p>
        <h1>Kateri klub je to?</h1>
        <p className="football-difficulty-copy">Samo trije namigi.</p>
      </section>

      <section className="hint-grid" aria-label="Nogometni namigi">
        {question.hints.map((hint) => (
          <article className="hint-card football-hint-card" key={hint.label}>
            <span className="hint-card__icon" aria-hidden="true">
              {hint.icon}
            </span>
            <div className="hint-card__body">
              <strong>{hint.label}</strong>
              <span>{hint.value}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="answer-grid" aria-label="Možni odgovori">
        {question.options.map((option) => {
          const answerClassNames = ['answer-button']

          if (lastAnswer && option.id === lastAnswer.correctClubId) {
            answerClassNames.push('answer-button--correct')
          } else if (lastAnswer && option.id === lastAnswer.selectedClubId) {
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
            Pravilni klub je {lastAnswer.correctClubName}.
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

export default FootballGuessScreen
