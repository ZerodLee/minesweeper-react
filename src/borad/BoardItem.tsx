import React, { useState, useContext, useEffect } from "react";
import { GameGlobalContext, gameStatusMap } from "../global";
// 图标
import { FlagIcon } from "@heroicons/react/solid";
import { GlobeAltIcon } from "@heroicons/react/outline";

interface MineItemProp extends baseProps {
  option: BoardItem; // 数字
  onChangeOption: OnChangeBoardItem;
  //   obj: object;
}
const classMap: { [index: number]: string } = {
  1: "text-blue-600",
  2: "text-green-600",
  3: "text-red-600",
  4: "text-blue-300",
  5: "text-yellow-600",
  6: "text-pink-600",
  7: "text-purple-600",
  8: "text-red-900",
};
function MineItem({ option, onChangeOption }: MineItemProp, ctx: any) {
  // console.log("MineItem", option, ctx);
  const [flag, setFlag] = useState(false);
  const { gameGlobal, setGameGlobal } = useContext(GameGlobalContext);
  const primaryLevelClass = "w-12 h-12 text-lg ";
  const commonClass =
    primaryLevelClass + "mine-item text-2xl font-bold cursor-default relative flex justify-center items-center ";

  const coverCalss = " board-item-cover border-4 bg-gradient-to-br from-blue-100 to-blue-400";
  const disCoverCalss =
    "bg-gray-200 border border-blue-300" +
    getNumberClass(option.value) +
    (option.isMine && option.isClicked ? " bg-red-400" : "");

  //
  useEffect(() => {
    if (gameGlobal.status == gameStatusMap.unStart && flag) {
      setFlag(false);
    }
  }, [gameGlobal.status]);
  const handleClick = (e: any) => {
    // console.log(e,onChangeOption)
    // setCount(count+1)
    // return false;

    // setGameGlobal({ status: gameStatusMap.playing });

    if (option.isClicked) {
      return false;
    }
    const _option: changeBoardItem = {
      isClicked: true,
      isDiscovered: true,
    };
    // if (typeof option.value == "number") {
    //   _option.label = String(option.value);
    //   // todo zha
    // } else if (option.isMine) {
    //   _option.label = "炸";
    //   // todo zha
    // } else if (option.value === null) {
    //   // do 关联展示
    // }
    onChangeOption(Object.assign(option, _option));
  };
  const handleRightClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFlag(!flag);
  };
  const FlagItem = flag ? (
    <span className="item-flag w-8 h-8 absolute top-0 left-0 flex justify-center items-center">
      <FlagIcon className="w-4 h-4 text-red-500" />
    </span>
  ) : null;
  const BombItem = option.isMine ? <GlobeAltIcon className="w-5 h-5" /> : option.label;
  return (
    <React.Fragment>
      {option.isDiscovered ? (
        <span className={commonClass + disCoverCalss}>{BombItem}</span>
      ) : (
        <span className={commonClass + coverCalss} onClick={handleClick} onContextMenu={handleRightClick}>
          {FlagItem}
        </span>
      )}
    </React.Fragment>
  );
}

function getLabel(option: BoardItem) {
  if (option.isMine) {
    return option.value === undefined ? "" : "雷";
  } else {
    return String(option.value == undefined ? "" : option.value);
  }
}
function getNumberClass(value: BoardItemValue) {
  let retClass = " ";
  if (value !== null && value !== undefined) {
    retClass += classMap[value];
  }
  return retClass;
}
export default MineItem;
