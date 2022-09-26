import { useState, useContext } from "react";
import { transition_bg_color_class } from "../util";
// import { baseProps } from "../types/props";
const colorMap = {
  yellow: " bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700",
  red: " bg-red-500 hover:bg-red-600 active:bg-red-700 text-white",
};
interface BtnProps extends baseProps {
  color?: "yellow" | "red";
  small?: undefined | boolean | string;
  click: Function;
  disabled?: undefined | boolean;
}

function Btn(props: BtnProps) {
  //   const bgColor = "yellow";
  //   // const bgColor = ` bg-${props.color || "yellow"}-500`;
  //   const BtnClass = "game-btn py-1.5 px-5 text-base" + transition_bg_color_class(bgColor, 500);
  const handleClick = () => {
    props.click();
  };
  // console.log("btn props", props);
  let sizeClass = " py-1.5 px-5 text-base";
  if (props.small !== undefined) {
    sizeClass = " py-1 px-3 text-xs";
  }
  let colorCalss = colorMap.yellow;
  if (props.color == "red") {
    colorCalss = colorMap.red;
  }
  const BtnClass = "game-btn disabled:opacity-50" + colorCalss + sizeClass;
  return (
    <button onClick={handleClick} disabled={props.disabled} className={BtnClass}>
      {props.children}
    </button>
  );
}

export default Btn;
