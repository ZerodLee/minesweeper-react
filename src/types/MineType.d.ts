// 数字即周围的雷数
// null 空格，或雷
// undefined 未处理的格子
declare type BoardItemValue = number | null | undefined;

declare type Coordinate = [number, number];
declare interface BoardItem {
  isMine: boolean;               // 是否是雷
  isClicked: boolean;            // 是否已经点击
  isDiscovered: boolean;         // 是否已揭示
  // hasFlag:false;
  label: string;                 // 显示值
  value: BoardItemValue;         // 实际值
  rowNum: number;                // 行坐标
  colNum: number;                // 列坐标
}
declare interface changeBoardItem {
  isMine?: boolean;
  isClicked?: boolean;
  isDiscovered?: boolean;
  label?: string;
  value?: BoardItemValue;
}
declare type OnChangeBoardItem = (option: BoardItem) => void;
