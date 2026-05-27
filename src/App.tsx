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
  advanceAfterNbaGuessAnswer,
  createNewNbaGuessGame,
  isNbaGuessGameComplete,
  selectNbaGuessAnswer,
} from './game/nbaGuessEngine'
import {
  advanceAfterMovieResult,
  createNewMovieGame,
  isMovieGameComplete,
  selectCategoryForCurrentMovie,
} from './game/movieGameEngine'
import {
  advanceAfterEuropeResult,
  createNewEuropeGame,
  isEuropeGameComplete,
  selectCategoryForCurrentEuropeCountry,
} from './game/europeGameEngine'
import {
  advanceAfterFootballGuessAnswer,
  createNewFootballGuessGame,
  isFootballGuessGameComplete,
  selectFootballGuessAnswer,
} from './game/footballGuessEngine'
import {
  advanceAfterFootballStadiumAnswer,
  createNewFootballStadiumGame,
  isFootballStadiumGameComplete,
  selectFootballStadiumAnswer,
} from './game/footballStadiumEngine'
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
  EuropeGameState,
  FootballGuessGameState,
  FootballStadiumGameState,
  GameMode,
  GameState,
  GuessMunicipalityGameState,
  HigherLowerChoice,
  HigherLowerGameState,
  MovieGameState,
  NBAGuessGameState,
  SloveniaGameState,
} from './types/game'
import EuropeFinalResultScreen from './screens/EuropeFinalResultScreen'
import EuropeGameScreen from './screens/EuropeGameScreen'
import FinalResultScreen from './screens/FinalResultScreen'
import FootballGuessScreen from './screens/FootballGuessScreen'
import FootballStadiumScreen from './screens/FootballStadiumScreen'
import GameScreen from './screens/GameScreen'
import GuessMunicipalityScreen from './screens/GuessMunicipalityScreen'
import HigherLowerScreen from './screens/HigherLowerScreen'
import ModeSelectScreen from './screens/ModeSelectScreen'
import MovieFinalResultScreen from './screens/MovieFinalResultScreen'
import MovieGameScreen from './screens/MovieGameScreen'
import NbaGuessScreen from './screens/NbaGuessScreen'
import PlayerNameScreen from './screens/PlayerNameScreen'
import RulesScreen from './screens/RulesScreen'
import SloveniaFinalResultScreen from './screens/SloveniaFinalResultScreen'
import SloveniaGameScreen from './screens/SloveniaGameScreen'

function App() {
  const [screen, setScreen] = useState<AppScreen>('mode-select')
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [nbaGame, setNbaGame] = useState<GameState>(() => createNewNbaGame())
  const [nbaGuessGame, setNbaGuessGame] =
    useState<NBAGuessGameState>(() => createNewNbaGuessGame())
  const [movieGame, setMovieGame] =
    useState<MovieGameState>(() => createNewMovieGame())
  const [europeGame, setEuropeGame] = useState<EuropeGameState>(() =>
    createNewEuropeGame(),
  )
  const [sloveniaGame, setSloveniaGame] = useState<SloveniaGameState>(() =>
    createNewSloveniaGame(),
  )
  const [guessMunicipalityGame, setGuessMunicipalityGame] =
    useState<GuessMunicipalityGameState>(() =>
      createNewGuessMunicipalityGame(),
    )
  const [higherLowerGame, setHigherLowerGame] =
    useState<HigherLowerGameState>(() => createNewHigherLowerGame())
  const [footballGuessGame, setFootballGuessGame] =
    useState<FootballGuessGameState>(() => createNewFootballGuessGame())
  const [footballStadiumGame, setFootballStadiumGame] =
    useState<FootballStadiumGameState>(() => createNewFootballStadiumGame())
  const [resultCountdown, setResultCountdown] = useState(3)

  const startGame = (mode: GameMode) => {
    setGameMode(mode)
    setResultCountdown(
      mode === 'guess-municipality' ||
        mode === 'higher-lower' ||
        mode === 'nba-guess' ||
        mode === 'football-guess' ||
        mode === 'football-stadium'
        ? 2
        : 3,
    )

    if (mode === 'slovenia') {
      setSloveniaGame(createNewSloveniaGame())
      setScreen('game')
      return
    }

    if (mode === 'europe') {
      setEuropeGame(createNewEuropeGame())
      setScreen('game')
      return
    }

    if (mode === 'movies') {
      setMovieGame(createNewMovieGame())
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

    if (mode === 'nba-guess') {
      setNbaGuessGame(createNewNbaGuessGame())
      setScreen('game')
      return
    }

    if (mode === 'football-guess') {
      setFootballGuessGame(createNewFootballGuessGame())
      setScreen('game')
      return
    }

    if (mode === 'football-stadium') {
      setFootballStadiumGame(createNewFootballStadiumGame())
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

    if (gameMode === 'europe') {
      setEuropeGame((currentGame) =>
        selectCategoryForCurrentEuropeCountry(currentGame, categoryId),
      )
      return
    }

    if (gameMode === 'movies') {
      setMovieGame((currentGame) =>
        selectCategoryForCurrentMovie(currentGame, categoryId),
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

  const selectNbaGuessPlayer = (playerId: string) => {
    setResultCountdown(2)
    setNbaGuessGame((currentGame) =>
      selectNbaGuessAnswer(currentGame, playerId),
    )
  }

  const selectFootballAnswer = (clubId: string) => {
    setResultCountdown(2)
    setFootballGuessGame((currentGame) =>
      selectFootballGuessAnswer(currentGame, clubId),
    )
  }

  const selectFootballStadium = (stadium: string) => {
    setResultCountdown(2)
    setFootballStadiumGame((currentGame) =>
      selectFootballStadiumAnswer(currentGame, stadium),
    )
  }

  const isResolving = (() => {
    switch (gameMode) {
      case 'guess-municipality':
        return guessMunicipalityGame.isResolving
      case 'higher-lower':
        return higherLowerGame.isResolving
      case 'nba-guess':
        return nbaGuessGame.isResolving
      case 'football-guess':
        return footballGuessGame.isResolving
      case 'football-stadium':
        return footballStadiumGame.isResolving
      case 'europe':
        return europeGame.isResolving
      case 'movies':
        return movieGame.isResolving
      case 'slovenia':
        return sloveniaGame.isResolving
      case 'nba':
        return nbaGame.isResolving
      default:
        return false
    }
  })()
  const resolveDelayMs =
    gameMode === 'guess-municipality' ||
    gameMode === 'higher-lower' ||
    gameMode === 'nba-guess' ||
    gameMode === 'football-guess' ||
    gameMode === 'football-stadium'
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

      if (gameMode === 'nba-guess') {
        setNbaGuessGame((currentGame) => {
          const nextGame = advanceAfterNbaGuessAnswer(currentGame)

          if (isNbaGuessGameComplete(nextGame)) {
            window.setTimeout(() => setScreen('final'), 0)
          }

          return nextGame
        })
        return
      }

      if (gameMode === 'football-guess') {
        setFootballGuessGame((currentGame) => {
          const nextGame = advanceAfterFootballGuessAnswer(currentGame)

          if (isFootballGuessGameComplete(nextGame)) {
            window.setTimeout(() => setScreen('final'), 0)
          }

          return nextGame
        })
        return
      }

      if (gameMode === 'football-stadium') {
        setFootballStadiumGame((currentGame) => {
          const nextGame = advanceAfterFootballStadiumAnswer(currentGame)

          if (isFootballStadiumGameComplete(nextGame)) {
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

      if (gameMode === 'europe') {
        setEuropeGame((currentGame) => {
          const nextGame = advanceAfterEuropeResult(currentGame)

          if (isEuropeGameComplete(nextGame)) {
            window.setTimeout(() => setScreen('final'), 0)
          }

          return nextGame
        })
        return
      }

      if (gameMode === 'movies') {
        setMovieGame((currentGame) => {
          const nextGame = advanceAfterMovieResult(currentGame)

          if (isMovieGameComplete(nextGame)) {
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
        onRestart={restartGame}
        onBack={goHome}
      />
    )
  }

  if (screen === 'game' && gameMode === 'slovenia') {
    return (
      <SloveniaGameScreen
        game={sloveniaGame}
        countdown={resultCountdown}
        onSelectCategory={selectCategory}
        onRestart={restartGame}
        onBack={goHome}
      />
    )
  }

  if (screen === 'game' && gameMode === 'europe') {
    return (
      <EuropeGameScreen
        game={europeGame}
        countdown={resultCountdown}
        onSelectCategory={selectCategory}
        onRestart={restartGame}
        onBack={goHome}
      />
    )
  }

  if (screen === 'game' && gameMode === 'movies') {
    return (
      <MovieGameScreen
        game={movieGame}
        countdown={resultCountdown}
        onSelectCategory={selectCategory}
        onRestart={restartGame}
        onBack={goHome}
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

  if (screen === 'game' && gameMode === 'nba-guess') {
    return (
      <NbaGuessScreen
        game={nbaGuessGame}
        countdown={resultCountdown}
        onSelectAnswer={selectNbaGuessPlayer}
        onRestart={restartGame}
        onHome={goHome}
      />
    )
  }

  if (screen === 'game' && gameMode === 'football-guess') {
    return (
      <FootballGuessScreen
        game={footballGuessGame}
        countdown={resultCountdown}
        onSelectAnswer={selectFootballAnswer}
        onRestart={restartGame}
        onHome={goHome}
      />
    )
  }

  if (screen === 'game' && gameMode === 'football-stadium') {
    return (
      <FootballStadiumScreen
        game={footballStadiumGame}
        countdown={resultCountdown}
        onSelectAnswer={selectFootballStadium}
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
        onRestart={restartGame}
        onBack={goHome}
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

  if (screen === 'final' && gameMode === 'europe') {
    return (
      <EuropeFinalResultScreen
        game={europeGame}
        onRestart={restartGame}
        onHome={goHome}
      />
    )
  }

  if (screen === 'final' && gameMode === 'movies') {
    return (
      <MovieFinalResultScreen
        game={movieGame}
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

  if (screen === 'final' && gameMode === 'nba-guess') {
    return (
      <NbaGuessScreen
        game={nbaGuessGame}
        countdown={resultCountdown}
        onSelectAnswer={selectNbaGuessPlayer}
        onRestart={restartGame}
        onHome={goHome}
      />
    )
  }

  if (screen === 'final' && gameMode === 'football-guess') {
    return (
      <FootballGuessScreen
        game={footballGuessGame}
        countdown={resultCountdown}
        onSelectAnswer={selectFootballAnswer}
        onRestart={restartGame}
        onHome={goHome}
      />
    )
  }

  if (screen === 'final' && gameMode === 'football-stadium') {
    return (
      <FootballStadiumScreen
        game={footballStadiumGame}
        countdown={resultCountdown}
        onSelectAnswer={selectFootballStadium}
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
