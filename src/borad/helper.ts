// 获取随机的雷index
function getMineRandomIndex(lenNum: number) {
  const minNum = 0;
  return Math.floor(Math.random() * (lenNum - minNum + 1) + minNum);
}
// 获取四周的格子item
function getRoundItemList(_boradItemList: BoardItem[][], colPoint: number, rowPoint: number) {
  let roundItemList = [
    // 第一行
    [colPoint - 1, rowPoint - 1],
    [colPoint, rowPoint - 1],
    [colPoint + 1, rowPoint - 1],
    // 第二行
    [colPoint - 1, rowPoint],
    //   [colPoint, rowPoint],
    [colPoint + 1, rowPoint],
    // 第三行
    [colPoint - 1, rowPoint + 1],
    [colPoint, rowPoint + 1],
    [colPoint + 1, rowPoint + 1],
  ];
  // 过滤存在的点
  return roundItemList
    .filter(([_colPoint, _rowPoint]) => _boradItemList[_rowPoint] && _boradItemList[_rowPoint][_colPoint])
    .map(([_colPoint, _rowPoint]) => _boradItemList[_rowPoint][_colPoint]);
}
// 设置雷的四周提示数字
function setMineRoundNumber(_boradItemList: BoardItem[][], colPoint: number, rowPoint: number) {
  let roundItemList = getRoundItemList(_boradItemList, colPoint, rowPoint);

  roundItemList.forEach((boardItem) => {
    if (!boardItem.isMine) {
      boardItem.value = Number(boardItem.value || 0) + 1;
    }
  });
  //
  // const boardItem = boradItemList[rowPoint][colPoint];
  // boardItem.value = Number(boardItem.value || 0) + 1;
}
// 初始化棋盘上的所有格子，返回list
function defaultBoradItemList(rowNum: number = 9, colNum: number = 6): BoardItem[][] {
  return new Array(rowNum).fill("").map((row, rowIndex) => {
    return new Array(colNum).fill(rowIndex).map((_rowIndex, colIndex) => {
      return {
        isMine: false,
        isClicked: false,
        isDiscovered: false,
        label: "",
        value: undefined,
        rowNum: _rowIndex,
        colNum: colIndex,
      };
    });
  });
}
// 埋雷
function initMines(minesNum: number = 6, boradItemList: BoardItem[][], defaultPoint: Coordinate): BoardItem[][] {
  const [defaultColPoint, defaultRowPoint] = defaultPoint;
  //   const defaultIndex = flatBoradItemList.findIndex(
  //     (item) => item.rowNum == defaultRowPoint && item.colNum == defaultColPoint
  //   );
  //   const [defaultItem] = flatBoradItemList.splice(defaultIndex, 1);
  const defaultItemList = getRoundItemList(boradItemList, defaultColPoint, defaultRowPoint);
  defaultItemList.push(boradItemList[defaultRowPoint][defaultColPoint]);
  defaultItemList.forEach((defaultItem) => {
    defaultItem.value = null;
  });
  let flatBoradItemList = boradItemList.flat();
  flatBoradItemList = flatBoradItemList.filter((item) => item.value === undefined);

  flatBoradItemList.forEach((defaultItem) => {
    defaultItem.value = null;
  });

  let setMineNum = 0;
  while (setMineNum < minesNum && flatBoradItemList.length > 0) {
    const index = getMineRandomIndex(flatBoradItemList.length - 1);
    const [boardItem] = flatBoradItemList.splice(index, 1);
    boardItem.isMine = true;
    boardItem.value = null;
    setMineRoundNumber(boradItemList, boardItem.colNum, boardItem.rowNum);
    setMineNum++;
  }
  return boradItemList;
  //   const defaultItem = flatBoradItemList.find(item => item.rowNum == defaultRowPoint && item.colNum == defaultColPoint)
}

function checkGameOver(_boradItemList: BoardItem[][]) {
  const _flatboradItemList = _boradItemList.flat();
  const lastItemList = _flatboradItemList.filter((_flatBoradItem) => !_flatBoradItem.isDiscovered);
  const minesItemList = _flatboradItemList.filter((_flatBoradItem) => _flatBoradItem.isMine);
  console.log(lastItemList.length, minesItemList.length);
  return lastItemList.length == minesItemList.length;
}
export { getMineRandomIndex, getRoundItemList, setMineRoundNumber, checkGameOver, defaultBoradItemList, initMines };
