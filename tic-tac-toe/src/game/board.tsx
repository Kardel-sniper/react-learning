import React, {Component, ReactNode} from "react";
import {Square} from "./square";
import {Value} from "./game";

type BoardProps = {
  values: Array<Value>;
  nextPlayerName: string;
  handleClick(index: number): void;
};

export class Board extends Component<BoardProps> {
  public render(): ReactNode {
    return (
      <div>
        <div className="status">{`Next player: ${this.props.nextPlayerName}`}</div>
        {Board.renderBoardRow(this.props.values.slice(0, 3), this.props.handleClick)}
        {Board.renderBoardRow(this.props.values.slice(3, 6), this.props.handleClick)}
        {Board.renderBoardRow(this.props.values.slice(6, 9), this.props.handleClick)}
      </div>
    );
  }

  private static renderSquare(value: Value, handleClick: (index: number) => void): ReactNode {
    return <Square key={value.index} value={value} handleClick={handleClick} />;
  }

  private static renderBoardRow(values: Array<Value>, handleClick: (index: number) => void): ReactNode {
    return <div className="board-row">{values.map(value => Board.renderSquare(value, handleClick))}</div>;
  }
}
