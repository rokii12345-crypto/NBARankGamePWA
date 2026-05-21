import { useEffect, useState } from 'react'
import './App.css'
import {
  advanceAfterResult as advanceAfterNbaResult,
  createNewGame as createNewNbaGame,
  getCurrentPlayer,
  isGameComplete as isNbaGameComplete,
  selectCategoryForCurrentPlayer,
} from './game/gameEngine'
import {
  advanceAfterGuessMunicipalityAnswer,
  createNewGuessMunicipalityGame,
  isGuessMunicipalityGameComplete,
  selectGuessMunicipalityAnswer,
} from './game/guessMunicipalityEngine'
import {
  advanceAfterHigherLowerAnswer,
  createNewHigherLowerGame,
  isHigherLowerGameComplete,
  selectHigherLowerAnswer,
} from './game/higherLowerEngine'
import {
  advanceAfterSloveniaResult,
  createNewSloveniaGame,
  isSloveniaGameComplete,
  selectCategoryForCurrentMunicipality,
} from './game/sloveniaGameEngine'
import type {
  AppScreen,
  GameMode,
  GameState,
  GuessMunicipalityGameState,
  HigherLowerChoice,
  HigherLowerGameState,
  SloveniaGameState,
} from './types/game'
import FinalResultScreen from './screens/FinalResultScreen'
import GameScreen from './screens/GameScreen'
import GuessMunicipalityScreen from './screens/GuessMunicipalityScreen'
import HigherLowerScreen from './screens/HigherLowerScreen'
import ModeSelectScreen from './screens/ModeSelectScreen'
import PlayerNameScreen from './screens/PlayerNameScreen'
import RulesScreen from './screens/RulesScreen'
import SloveniaFinalResultScreen from './screens/SloveniaFinalResultScreen'
import SloveniaGameScreen from './screens/SloveniaGameScreen'

function App() {
  const [screen, setScreen] = useState<AppScreen>('mode-select')
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [nbaGame, setNbaGame] = useState<GameState>(() => createNewNbaGame())
  const [sloveniaGame, setSloveniaGame] = useState<SloveniaGameState>(() =>
    createNewSloveniaGame(),
  )
  const [guessMunicipalityGame, setGuessMunicipalityGame] =
    useState<GuessMunicipalityGameState>(() =>
      createNewGuessMunicipalityGame(),
    )
  const [higherLowerGame, setHigherLowerGame] =
    useState<HigherLowerGameState>(() => createNewHigherLowerGame())
  const [resultCountdown, setResultCountdown] = useState(3)

  const startGame = (mode: GameMode) => {
    setGameMode(mode)
    setResultCountdown(
      mode === 'guess-municipality' || mode === 'higher-lower' ? 2 : 3,
    )

    if (mode === 'slovenia') {
      setSloveniaGame(createNewSloveniaGame())
      setScreen('game')
      return
    }

    if (mode === 'guess-municipality') {
      setGuessMunicipalityGame(createNewGuessMunicipalityGame())
      setScreen('game')
      return
    }

    if (mode === 'higher-lower') {
      setHigherLowerGame(createNewHigherLowerGame())
      setScreen('game')
      return
    }

    setNbaGame(createNewNbaGame())
    setScreen('player-name')
  }

  const restartGame = () => {
    if (gameMode) {
      startGame(gameMode)
    }
  }

  const goHome = () => {
    setGameMode(null)
    setResultCountdown(3)
    setScreen('mode-select')
  }

  const selectCategory = (categoryId: string) => {
    setResultCountdown(3)

    if (gameMode === 'slovenia') {
      setSloveniaGame((currentGame) =>
        selectCategoryForCurrentMunicipality(currentGame, categoryId),
      )
      return
    }

    setNbaGame((currentGame) =>
      selectCategoryForCurrentPlayer(currentGame, categoryId),
    )
  }

  const selectGuessAnswer = (municipalityId: string) => {
    setResultCountdown(2)
    setGuessMunicipalityGame((currentGame) =>
      selectGuessMunicipalityAnswer(currentGame, municipalityId),
    )
  }

  const selectHigherLowerChoice = (choice: HigherLowerChoice) => {
    setResultCountdown(2)
    setHigherLowerGame((currentGame) =>
      selectHigherLowerAnswer(currentGame, choice),
    )
  }

  const isResolving =
    gameMode === 'guess-municipality'
      ? guessMunicipalityGame.isResolving
      : gameMode === 'higher-lower'
        ? higherLowerGame.isResolving
      : gameMode === 'slovenia'
        ? sloveniaGame.isResolving
        : gameMode === 'nba'
        ? nbaGame.isResolving
        : false
  const resolveDelayMs =
    gameMode === 'guess-municipality' || gameMode === 'higher-lower'
      ? 2000
      : 3000

  useEffect(() => {
    if (!gameMode || !isResolving) {
      return
    }

    const countdownTimerId = window.setInterval(() => {
      setResultCountdown((currentCountdown) =>
        Math.max(1, currentCountdown - 1),
      )
    }, 1000)

    const advanceTimerId = window.setTimeout(() => {
      if (gameMode === 'guess-municipality') {
        setGuessMunicipalityGame((currentGame) => {
          const nextGame = advanceAfterGuessMunicipalityAnswer(currentGame)

          if (isGuessMunicipalityGameComplete(nextGame)) {
            window.setTimeout(() => setScreen('final'), 0)
          }

          return nextGame
        })
        return
      }

      if (gameMode === 'higher-lower') {
        setHigherLowerGame((currentGame) => {
          const nextGame = advanceAfterHigherLowerAnswer(currentGame)

          if (isHigherLowerGameComplete(nextGame)) {
            window.setTimeout(() => setScreen('final'), 0)
          }

          return nextGame
        })
        return
      }

      if (gameMode === 'slovenia') {
        setSloveniaGame((currentGame) => {
          const nextGame = advanceAfterSloveniaResult(currentGame)

          if (isSloveniaGameComplete(nextGame)) {
            window.setTimeout(() => setScreen('final'), 0)
          }

          return nextGame
        })
        return
      }

      setNbaGame((currentGame) => {
        const nextGame = advanceAfterNbaResult(currentGame)

        if (isNbaGameComplete(nextGame)) {
          window.setTimeout(() => setScreen('final'), 0)
        }

        return nextGame
      })
    }, resolveDelayMs)

    return () => {
      window.clearInterval(countdownTimerId)
      window.clearTimeout(advanceTimerId)
    }
  }, [gameMode, isResolving, resolveDelayMs])

  const currentPlayer = getCurrentPlayer(nbaGame)

  if (screen === 'rules') {
    return <RulesScreen onBack={() => setScreen('mode-select')} />
  }

  if (screen === 'player-name' && gameMode === 'nba' && currentPlayer) {
    return (
      <PlayerNameScreen
        player={currentPlayer}
        onContinue={() => setScreen('game')}
      />
    )
  }

  if (screen === 'game' && gameMode === 'slovenia') {
    return (
      <SloveniaGameScreen
        game={sloveniaGame}
        countdown={resultCountdown}
        onSelectCategory={selectCategory}
      />
    )
  }

  if (screen === 'game' && gameMode === 'guess-municipality') {
    return (
      <GuessMunicipalityScreen
        game={guessMunicipalityGame}
        countdown={resultCountdown}
        onSelectAnswer={selectGuessAnswer}
        onRestart={restartGame}
        onHome={goHome}
      />
    )
  }

  if (screen === 'game' && gameMode === 'higher-lower') {
    return (
      <HigherLowerScreen
        game={higherLowerGame}
        countdown={resultCountdown}
        onSelectAnswer={selectHigherLowerChoice}
        onRestart={restartGame}
        onHome={goHome}
      />
    )
  }

  if (screen === 'game' && gameMode === 'nba') {
    return (
      <GameScreen
        game={nbaGame}
        countdown={resultCountdown}
        onSelectCategory={selectCategory}
      />
    )
  }

  if (screen === 'final' && gameMode === 'slovenia') {
    return (
      <SloveniaFinalResultScreen
        game={sloveniaGame}
        onRestart={restartGame}
        onHome={goHome}
      />
    )
  }

  if (screen === 'final' && gameMode === 'guess-municipality') {
    return (
      <GuessMunicipalityScreen
        game={guessMunicipalityGame}
        countdown={resultCountdown}
        onSelectAnswer={selectGuessAnswer}
        onRestart={restartGame}
        onHome={goHome}
      />
    )
  }

  if (screen === 'final' && gameMode === 'higher-lower') {
    return (
      <HigherLowerScreen
        game={higherLowerGame}
        countdown={resultCountdown}
        onSelectAnswer={selectHigherLowerChoice}
        onRestart={restartGame}
        onHome={goHome}
      />
    )
  }

  if (screen === 'final' && gameMode === 'nba') {
    return (
      <FinalResultScreen
        game={nbaGame}
        onRestart={restartGame}
        onHome={goHome}
      />
    )
  }

  return (
    <ModeSelectScreen
      onStart={startGame}
      onRules={() => setScreen('rules')}
    />
  )
}

export default App
