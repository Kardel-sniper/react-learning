import React from "react";
import {Value} from "./game";
import {BoardUtil} from "./boardUtil";

type BoardProps = {
  values: Array<Value>;
  nextPlayerName: string;
  handleClick(index: number): void;
};

export const Board: React.FC<BoardProps> = (props: BoardProps) => (
  <div>
    <div className="status">{`Next player: ${props.nextPlayerName}`}</div>
    {BoardUtil.renderBoardRow(props.values.slice(0, 3), props.handleClick)}
    {BoardUtil.renderBoardRow(props.values.slice(3, 6), props.handleClick)}
    {BoardUtil.renderBoardRow(props.values.slice(6, 9), props.handleClick)}
  </div>
);
