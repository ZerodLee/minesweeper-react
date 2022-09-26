import React, { useContext } from "react";

interface GameGlobal {
  status: symbol;
  isWin: boolean;
  steps: number;
  seconds: number;
}
interface GameGlobalChanged {
  status?: symbol;
  isWin?: boolean;
  steps?: number;
  seconds?: number;
}
interface ReducerGameGlobal {
  gameGlobal: GameGlobal;
  setGameGlobal: React.Dispatch<GameGlobalChanged>;
}
const gameStatusMap = {
  unStart: Symbol("unStart"),
  playing: Symbol("playing"),
  gameOver: Symbol("gameOver"),
};

const gameGlobal: GameGlobal = {
  status: gameStatusMap.unStart,
  isWin: false,
  steps: 0,
  seconds: 0,
};

const reducerGameGlobal: ReducerGameGlobal = {
  gameGlobal,
  setGameGlobal: function () {
    console.error("11111111");
  },
};

function gameGlobalReducer(state: GameGlobal, action: GameGlobalChanged): GameGlobal {
  return Object.assign({}, state, action);
}

const GameGlobalContext = React.createContext(reducerGameGlobal);

export { GameGlobalContext, gameGlobalReducer, gameStatusMap, gameGlobal };
