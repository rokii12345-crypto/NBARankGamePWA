import ScoreBadge from '../components/ScoreBadge'
import { formatStatValue } from '../game/formatResult'
import {
  getCurrentGuessMunicipalityQuestion,
  getGuessMunicipalityScore,
  isGuessMunicipalityGameComplete,
} from '../game/guessMunicipalityEngine'
import { GAME_ROUNDS, type GuessMunicipalityGameState } from '../types/game'

type GuessMunicipalityScreenProps = {
  game: GuessMunicipalityGameState
  countdown: number
  onSelectAnswer: (municipalityId: string) => void
  onRestart: () => void
  onHome: () => void
}

function GuessMunicipalityScreen({
  game,
  countdown,
  onSelectAnswer,
  onRestart,
  onHome,
}: GuessMunicipalityScreenProps) {
  const question = getCurrentGuessMunicipalityQuestion(game)
  const score = getGuessMunicipalityScore(game)
  const isComplete = isGuessMunicipalityGameComplete(game)
  const lastAnswer =
    game.lastAnswer?.questionIndex === game.currentQuestionIndex
      ? game.lastAnswer
      : null

  if (isComplete || !question) {
    return (
      <main className="screen final-screen guess-final-screen">
        <section className="final-summary">
          <p className="eyebrow">Ugani občino</p>
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
              <strong>{answer.correctMunicipalityName}</strong>
              <em>Izbral si: {answer.selectedMunicipalityName}</em>
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
    <main className="screen game-screen guess-game-screen">
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

      <div className="game-action-row">
        <button className="utility-button" type="button" onClick={onHome}>
          Nazaj
        </button>
        <button className="utility-button" type="button" onClick={onRestart}>
          Nova igra
        </button>
      </div>

      <section className="guess-prompt-card" aria-label="Skrita občina">
        <p className="eyebrow">Skrita občina</p>
        <h1>Katera občina je to?</h1>
      </section>

      <section className="hint-grid" aria-label="Statistični namigi">
        {question.hints.map(({ category, ranking }) => (
          <article className="hint-card" key={category.id}>
            <span className="hint-card__icon" aria-hidden="true">
              {category.icon}
            </span>
            <div className="hint-card__body">
              <strong>{category.title}</strong>
              <span>
                {formatStatValue(ranking.value, category.unit, category.decimals)}
              </span>
            </div>
            <em>{ranking.rank}. mesto</em>
          </article>
        ))}
      </section>

      <section className="answer-grid" aria-label="Možni odgovori">
        {question.options.map((option) => {
          const answerClassNames = ['answer-button']

          if (lastAnswer && option.id === lastAnswer.correctMunicipalityId) {
            answerClassNames.push('answer-button--correct')
          } else if (
            lastAnswer &&
            option.id === lastAnswer.selectedMunicipalityId
          ) {
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
            Pravilna občina je {lastAnswer.correctMunicipalityName}.
          </p>
          <span>Naslednje vprašanje čez {countdown} s ...</span>
        </section>
      ) : null}
    </main>
  )
}

export default GuessMunicipalityScreen
