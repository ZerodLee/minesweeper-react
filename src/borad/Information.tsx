import { useState, useEffect, useContext, useReducer } from "react";
import { GameGlobalContext, gameStatusMap } from "../global";
import Btn from "../components/Btn";

function Information() {
  const { gameGlobal, setGameGlobal } = useContext(GameGlobalContext);
  const [seconds, setSeconds] = useState(0);
  const handleRestart = () => {
    console.log("handleRestart");
  };
  function TimerReducer(num: number, change: { add: number; isReset?: boolean }) {
    if (change.isReset) {
      return 0;
    }
    return num + change.add;
  }
  const [_seconds, addSeconds] = useReducer(TimerReducer, 0);
  let gameTimer: number;
  useEffect(() => {
    console.log("Information useEffect");
    if (gameGlobal.status == gameStatusMap.playing) {
      gameTimer = setInterval(() => {
        console.log("Information seconds", _seconds, gameTimer);
        addSeconds({ add: 1 });
        // setSeconds((_seconds) => _seconds + 1);
        // setGameGlobal({ seconds: gameGlobal.seconds + 1 });
      }, 1000);
    } else if (gameGlobal.status == gameStatusMap.gameOver) {
      clearInterval(gameTimer);
      //   addSeconds(1);
      //   setGameGlobal({ seconds: seconds });
    } else if (gameGlobal.status == gameStatusMap.unStart) {
      addSeconds({ add: 0, isReset: true });
      setGameGlobal({
        steps: 0,
        seconds: 0,
      });
      //   setSeconds((_seconds) => 0);
      //   setGameGlobal({ seconds: 0 });
    }
    return () => clearInterval(gameTimer);
  }, [gameGlobal.status]);
  return (
    <div className="information-board p-3 bg-white flex justify-center">
      <TimerBoard title="steps">{gameGlobal.steps}</TimerBoard>
      <div className="control-btns flex flex-col justify-around mx-2">
        <Btn small color="red" click={handleRestart}>
          重新开始
        </Btn>
        <Btn small disabled={gameGlobal.status == gameStatusMap.playing} click={handleRestart}>
          设置难度
        </Btn>
      </div>
      <TimerBoard title="seconds">{_seconds}</TimerBoard>
    </div>
  );
}

interface TimerBoardProps extends baseProps {
  title: string;
}
function TimerBoard(props: TimerBoardProps) {
  return (
    <div className="">
      <h5 className="text-center">{props.title}</h5>
      <div className="w-20 h-9 text-2xl text-center leading-9 tracking-wide bg-gray-900 text-red-700">
        {props.children}
      </div>
    </div>
  );
}
export default Information;
