import { useEffect, useState } from 'react'
import './App.css'
import {
  advanceAfterResult,
  createNewGame,
  getCurrentPlayer,
  isGameComplete,
  selectCategoryForCurrentPlayer,
} from './game/gameEngine'
import type { AppScreen, GameState } from './types/game'
import FinalResultScreen from './screens/FinalResultScreen'
import GameScreen from './screens/GameScreen'
import HomeScreen from './screens/HomeScreen'
import PlayerNameScreen from './screens/PlayerNameScreen'
import RulesScreen from './screens/RulesScreen'

function App() {
  const [screen, setScreen] = useState<AppScreen>('home')
  const [game, setGame] = useState<GameState>(() => createNewGame())

  const startGame = () => {
    setGame(createNewGame())
    setScreen('player-name')
  }

  const goHome = () => {
    setGame(createNewGame())
    setScreen('home')
  }

  const selectCategory = (categoryId: string) => {
    setGame((currentGame) =>
      selectCategoryForCurrentPlayer(currentGame, categoryId),
    )
  }

  useEffect(() => {
    if (!game.isResolving) {
      return
    }

    const timerId = window.setTimeout(() => {
      setGame((currentGame) => {
        const nextGame = advanceAfterResult(currentGame)

        if (isGameComplete(nextGame)) {
          window.setTimeout(() => setScreen('final'), 0)
        }

        return nextGame
      })
    }, 3000)

    return () => window.clearTimeout(timerId)
  }, [game.isResolving])

  const currentPlayer = getCurrentPlayer(game)

  if (screen === 'rules') {
    return <RulesScreen onBack={() => setScreen('home')} />
  }

  if (screen === 'player-name' && currentPlayer) {
    return (
      <PlayerNameScreen
        player={currentPlayer}
        onContinue={() => setScreen('game')}
      />
    )
  }

  if (screen === 'game') {
    return <GameScreen game={game} onSelectCategory={selectCategory} />
  }

  if (screen === 'final') {
    return (
      <FinalResultScreen
        game={game}
        onRestart={startGame}
        onHome={goHome}
      />
    )
  }

  return <HomeScreen onStart={startGame} onRules={() => setScreen('rules')} />
}

export default App
