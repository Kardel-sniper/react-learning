import React from "react";
import {Value} from "./game";

type SquareProps = {
  readonly value: Value;

  handleClick(index: number): void;
};

export const Square: React.FC<SquareProps> = (props: SquareProps) => (
  <button className={props.value.text ? "square" : "square-empty"} onClick={() => props.handleClick(props.value.index)}>
    {props.value.text || props.value.index + 1}
  </button>
);
