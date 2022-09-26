import { useState, useContext, useEffect, Fragment } from "react";
import BoardItem from "./BoardItem";
import { GameGlobalContext, gameStatusMap } from "../global";
import { initMines, defaultBoradItemList, getRoundItemList, checkGameOver } from "./helper";

function Mines() {
  // 棋盘所有格子
  const [boradItemList, setBoradItemList] = useState(defaultBoradItemList(9, 6));
  // 游戏开始？
  const [isStart, onStart] = useState(false);
  const { gameGlobal, setGameGlobal } = useContext(GameGlobalContext);
  //   const boradItemListWidthMines = initMines(2, boradItemList, [0, 0]);
  //   console.log(boradItemListWidthMines);
  useEffect(() => {
    if (gameGlobal.status == gameStatusMap.unStart) {
      setBoradItemList(defaultBoradItemList(9, 6));
    }
    if (gameGlobal.status == gameStatusMap.unStart) {
      onStart(false);
    }
  }, [gameGlobal.status]);

  const handleChangeOption: OnChangeBoardItem = (_boradItem) => {
    let _boradItemList: BoardItem[][] = boradItemList;
    if (!isStart) {
      _boradItemList = initMines(6, boradItemList, [_boradItem.colNum, _boradItem.rowNum]);
      onStart(!isStart);
    }
    // 初始化后声明变量
    const { value, isMine, rowNum, colNum } = _boradItem;
    // const _boradItem = _boradItemList[_boradItem.rowNum][_boradItem.colNum];
    if (typeof value == "number") {
      _boradItem.label = String(value);

      if (checkGameOver(_boradItemList)) {
        gameOver(true);
      }
      // todo zha
    } else if (isMine) {
      _boradItem.label = "炸";
      const _flatboradItemList = _boradItemList.flat();
      _flatboradItemList
        .filter((_flatBoradItem) => _flatBoradItem.isMine)
        .forEach((_flatBoradItem) => {
          _flatBoradItem.isDiscovered = true;
        });
      gameOver(false);
    } else if (value === null) {
      // 关联展示
      function recursionDiscover(_colNum: number, _rowNum: number) {
        const roundItemList = getRoundItemList(_boradItemList, _colNum, _rowNum);
        // 空格周围循环揭示
        roundItemList.forEach((roundItem) => {
          if (!roundItem.isDiscovered) {
            roundItem.isDiscovered = true;
            // roundItem.label = roundItem.value === null ? "" : String(roundItem.value);
            if (roundItem.value === null) {
              roundItem.label = "";
              recursionDiscover(roundItem.colNum, roundItem.rowNum);
            } else {
              roundItem.label = String(roundItem.value);
            }
          }
        });
        // roundItemList.forEach((roundItem) => {
        //   if (roundItem.value === null && !roundItem.isDiscovered) {
        //     recursionDiscover(roundItem.colNum, roundItem.rowNum);
        //   }
        // });
        console.log("recursionDiscover");
      }
      recursionDiscover(colNum, rowNum);
      if (checkGameOver(_boradItemList)) {
        gameOver(true);
      }
    }
    // 更改点击后的状态
    _boradItemList[rowNum][colNum] = Object.assign(_boradItemList[rowNum][colNum], _boradItem);
    setBoradItemList(_boradItemList.slice());

    //
    setGameGlobal({ steps: gameGlobal.steps + 1 });

    function gameOver(isWin: boolean) {
      setTimeout(() => {
        setGameGlobal({
          status: gameStatusMap.gameOver,
          isWin,
        });
      }, 500);
    }
  };
  return (
    <Fragment>
      {/* <div>{gameGlobal.status == gameStatusMap.unStart ? "未开始" : "yi"}</div> */}
      <div className="mines border-2 border-blue-600">
        {boradItemList.map((rowItemlist, rowIndex) => {
          const rowMines = rowItemlist.map((boardItem, colIndex) => {
            return <BoardItem key={colIndex} option={boardItem} onChangeOption={handleChangeOption} />;
          });
          return (
            <div className="row-mines flex" key={rowIndex}>
              {rowMines}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
// 渲染出格子
// function BoradItems(_boradItemList: BoardItem[][]) {
//   return _boradItemList.map((rowItemlist, rowIndex) => {
//     const rowMines = rowItemlist.map((boardItem, colIndex) => {
//       return <BoardItem key={colIndex} option={boardItem} />;
//     });
//     return (
//       <div className="row-mines flex" key={rowIndex}>
//         {rowMines}
//       </div>
//     );
//   });
// }

export default Mines;
