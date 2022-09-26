import { useState, useContext } from "react";
import { GameGlobalContext, gameStatusMap } from "../global";

import Btn from "../components/Btn";
import { XIcon } from "@heroicons/react/outline";

function GameOverDialog() {
  // const [isShow, setShow] = useState(true);
  const { gameGlobal, setGameGlobal } = useContext(GameGlobalContext);
  const handleClose = () => {
    setGameGlobal({
      status: gameStatusMap.playing,
    });
  };
  const handleRestart = () => {
    setGameGlobal({
      status: gameStatusMap.unStart,
    });
  };
  return gameGlobal.status == gameStatusMap.gameOver ? (
    <div className="game-dialog p-3 absolute top-0 left-0 w-full h-full z-50 bg-white">
      <div className="mt-3 mx-auto text-3">游戏结束，你{gameGlobal.isWin ? "赢" : "输"}了</div>
      <XIcon
        className="w-8 h-8 absolute top-2 right-2 cursor-pointer hover:text-red-500  transition-colors duration-200"
        onClick={handleClose}
      />
      <Btn click={handleRestart}>再来一局</Btn>
    </div>
  ) : null;
}

export default GameOverDialog;
