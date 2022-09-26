import { useState, useReducer } from "react";
import BoardBox from "./borad/BoardBox";
import Information from "./borad/Information";
import GameOverDialog from "./dialog/GameOverDialog";
import StartUpDialog from "./dialog/StartUpDialog";
import { GameGlobalContext, gameGlobal as _gameGlobal, gameGlobalReducer } from "./global";
import "./App.css";

function App() {
  const [gameGlobal, setGameGlobal] = useReducer(gameGlobalReducer, _gameGlobal);

  return (
    <GameGlobalContext.Provider value={{ gameGlobal, setGameGlobal }}>
      <div className="flex justify-center container mx-auto">
        <div className="mine-sweeper relative border-4 border-blue-400">
          <Information />
          <BoardBox />
          <GameOverDialog />
          <StartUpDialog />
        </div>
      </div>
    </GameGlobalContext.Provider>
  );
}

export default App;
