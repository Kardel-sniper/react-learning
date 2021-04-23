import React, {useState} from "react";
import {Board} from "./board";
import {GameUtil} from "./gameUtil";

export interface Player {
  readonly id: string;
  name: string;
}

export interface Value {
  readonly index: number;
  text?: string;
}

export interface Log {
  player: Player;
  cellIndex: number;
}

export type State = {
  values: Array<Value>;
  gameLog: Array<Log>;
  nextPlayer: Player;
  gameOver: string;
};

export const Game: React.FC<unknown> = () => {
  const [state, setState] = useState({
    values: Array<Value>(9)
      .fill({} as Value)
      .map((value, index) => ({index} as Value)),
    gameLog: [],
    nextPlayer: GameUtil.FIRST_PLAYER,
    gameOver: "",
  } as State);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          values={state.values}
          nextPlayerName={state.nextPlayer.name}
          handleClick={GameUtil.handleClick.bind(this, setState)}
        />
      </div>
      <div className="game-info">
        <button onClick={() => GameUtil.back(setState)}>BACK</button>
        {state.gameLog.map(log => GameUtil.printGameLog(log))}
        <div>
          <b>{state.gameOver}</b>
        </div>
      </div>
    </div>
  );
};
