function getSplit(str: string, deli: string = ",") {
  return str.split(deli);
}
function transition_bg_color_class(color: string, num: number) {
  const baseBg = function (moreStep: number = 0) {
    return `bg-${color}-${num + moreStep}`;
  };
  return ` ${baseBg()} hover:${baseBg(100)} active:${baseBg(200)}`;
}
export { getSplit, transition_bg_color_class };
