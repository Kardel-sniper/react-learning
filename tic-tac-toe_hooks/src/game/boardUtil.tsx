import React, {ReactNode} from "react";
import {Square} from "./square";
import {Value} from "./game";

export class BoardUtil {
  public static renderBoardRow(values: Array<Value>, handleClick: (index: number) => void): ReactNode {
    return <div className="board-row">{values.map(value => BoardUtil.renderSquare(value, handleClick))}</div>;
  }
  private static renderSquare(value: Value, handleClick: (index: number) => void): ReactNode {
    return <Square key={value.index} value={value} handleClick={handleClick} />;
  }
}
