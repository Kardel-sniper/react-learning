import React, {Component, ReactNode} from "react";
import {Value} from "./game";

type SquareProps = {
  readonly value: Value;

  handleClick(index: number): void;
};

export class Square extends Component<SquareProps> {
  public render(): ReactNode {
    return (
      <button
        className={this.props.value.text ? "square" : "square-empty"}
        onClick={() => this.props.handleClick(this.props.value.index)}
      >
        {this.props.value.text || this.props.value.index + 1}
      </button>
    );
  }
}
