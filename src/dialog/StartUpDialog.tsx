import { useState, useContext } from "react";
import { GameGlobalContext, gameStatusMap } from "../global";

import Btn from "../components/Btn";

function StartUpDialog() {
  const [isShow, setShow] = useState(true);
  const { gameGlobal, setGameGlobal } = useContext(GameGlobalContext);
  const handleClose = () => {
    setGameGlobal({
      status: gameStatusMap.playing,
    });
  };
  return gameGlobal.status == gameStatusMap.unStart ? (
    <div className="game-dialog p-3 absolute top-0 left-0 w-full h-full z-50 bg-white">
      <Btn click={handleClose}>开始游戏</Btn>
    </div>
  ) : null;
}

export default StartUpDialog;
