import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { TIME_LIMIT } from '../utils/consts';

const decreaseTimeticks = async (set, get) => {
  const {
    timeTicks1,
    timeTicks2,
    isPlaying,
    currentPlayer
  } = get();

  if (isPlaying === false)
    return;
  
  // when the current players time is up, then end the game
  if ((currentPlayer === 0 && timeTicks1 === 0) ||
    (currentPlayer === 1 && timeTicks2 === 0)) {
    set({
      winner: 1 - currentPlayer, // opponent player is winner
      isPlaying: false // stop the game
    });
  }

  set({
    timeTicks1: currentPlayer === 0 ? timeTicks1 - 1 : timeTicks1,
    timeTicks2: currentPlayer === 1 ? timeTicks2 - 1 : timeTicks2
  });
}

const nextTurn = async (set, get, newBoard) => {
  const {
    currentPlayer,
    timeTicks1,
    timeTicks2,
    boardState,
    stepBackHistory,
  } = get();
  
  set({
    stepBackHistory: [...stepBackHistory, {
      board: boardState,
      ticks1: timeTicks1,    
      ticks2: timeTicks2
    }],
    stepAfterHistory: [],
    boardState: newBoard,
    currentPlayer: 1 - currentPlayer
  });
}

const moveBackward = async (set, get) => {
  const {
    currentPlayer,
    timeTicks1,
    timeTicks2,
    boardState,
    stepAfterHistory,    
    stepBackHistory
  } = get();
  
  if (stepBackHistory.length <= 0)
    return;
  stepAfterHistory.push({
    board: boardState,
    ticks1: timeTicks1,    
    ticks2: timeTicks2    
  })
  const prevState = stepBackHistory.pop();
  set({
    stepBackHistory: [...stepBackHistory],
    stepAfterHistory: [...stepAfterHistory],
    boardState: prevState.board,
    timeTicks1: prevState.ticks1,
    timeTicks2: prevState.ticks2,
    currentPlayer: 1 - currentPlayer
  });
}

const moveForward = async (set, get) => {
  const {
    timeTicks1,
    timeTicks2,
    boardState,
    currentPlayer,
    stepAfterHistory,    
    stepBackHistory
  } = get();
  
  if (stepAfterHistory.length <= 0)
    return;
  stepBackHistory.push({
    board: boardState,
    ticks1: timeTicks1,    
    ticks2: timeTicks2
  })
  const nextState = stepAfterHistory.pop();
  set({
    stepBackHistory: [...stepBackHistory],
    stepAfterHistory: [...stepAfterHistory],
    boardState: nextState.board,
    timeTicks1: nextState.ticks1,
    timeTicks2: nextState.ticks2,
    currentPlayer: 1 - currentPlayer
  });
}

const startGame = async (set, get, newBoard) => {  
  set({
    timeTicks1: TIME_LIMIT,
    timeTicks2: TIME_LIMIT,
    currentPlayer: 0,
    isPlaying: true,
    winner: -1, 
    boardState: "",
    stepBackHistory: [],
    stepAfterHistory: [],
  });
}

const endGame = async (set, get, winner) => {
  set({
    isPlaying: false,
  });
}
  
const playerStore = (set,get) => ({
    timeTicks1: TIME_LIMIT,
    timeTicks2: TIME_LIMIT,
    currentPlayer: 0,
    isPlaying: false,
    winner: -1, 
    boardState: "",
    stepBackHistory: [],
    stepAfterHistory: [],
    decreaseTimeticks: () => decreaseTimeticks(set, get),
    nextTurn: (newState) => nextTurn(set, get, newState),
    moveForward: () => moveForward(set, get),
    moveBackward: () => moveBackward(set, get),
    startGame: () => startGame(set, get),
    endGame: (winner) => endGame(set, get, winner),
    isUndoable: () => get().stepBackHistory.length > 0,
    isRedoable: () => get().stepAfterHistory.length > 0
  })
  
const usePlayerStore = create(devtools(persist(
  playerStore, {
    name: "player-storage",
  })))

export default usePlayerStore
  