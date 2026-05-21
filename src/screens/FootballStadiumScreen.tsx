import ScoreBadge from '../components/ScoreBadge'
import {
  getCurrentFootballStadiumQuestion,
  getFootballStadiumScore,
  isFootballStadiumGameComplete,
} from '../game/footballStadiumEngine'
import { GAME_ROUNDS, type FootballStadiumGameState } from '../types/game'

type FootballStadiumScreenProps = {
  game: FootballStadiumGameState
  countdown: number
  onSelectAnswer: (stadium: string) => void
  onRestart: () => void
  onHome: () => void
}

function FootballStadiumScreen({
  game,
  countdown,
  onSelectAnswer,
  onRestart,
  onHome,
}: FootballStadiumScreenProps) {
  const question = getCurrentFootballStadiumQuestion(game)
  const score = getFootballStadiumScore(game)
  const isComplete = isFootballStadiumGameComplete(game)
  const lastAnswer =
    game.lastAnswer?.questionIndex === game.currentQuestionIndex
      ? game.lastAnswer
      : null

  if (isComplete || !question) {
    return (
      <main className="screen final-screen football-final-screen">
        <section className="final-summary">
          <p className="eyebrow">Stadionski kviz</p>
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
              <strong>{answer.clubName}</strong>
              <em>
                {answer.correctStadium} · izbral si: {answer.selectedStadium}
              </em>
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
    <main className="screen game-screen stadium-game-screen">
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

      <section className="stadium-prompt-card" aria-label="Klub">
        <p className="eyebrow">Kje igra?</p>
        <h1>{question.club.name}</h1>
        <p>
          {question.club.countryFlag} {question.club.country} · {question.club.league}
        </p>
      </section>

      <section className="answer-grid" aria-label="Možni stadioni">
        {question.options.map((stadium) => {
          const answerClassNames = ['answer-button']

          if (lastAnswer && stadium === lastAnswer.correctStadium) {
            answerClassNames.push('answer-button--correct')
          } else if (lastAnswer && stadium === lastAnswer.selectedStadium) {
            answerClassNames.push('answer-button--wrong')
          }

          return (
            <button
              className={answerClassNames.join(' ')}
              type="button"
              key={stadium}
              disabled={game.isResolving || isAnswered}
              onClick={() => onSelectAnswer(stadium)}
            >
              {stadium}
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
            {lastAnswer.clubName} igra na stadionu {lastAnswer.correctStadium}.
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

export default FootballStadiumScreen
