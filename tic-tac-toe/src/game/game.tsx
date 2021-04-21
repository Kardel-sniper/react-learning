import React, {Component, ReactNode} from "react";
import {Board} from "./board";

interface Player {
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

type State = {
  values: Array<Value>;
  gameLog: Array<Log>;
  nextPlayer: Player;
  gameOver?: string;
};

export class Game extends Component<unknown, State> {
  private static readonly FIRST_PLAYER: Player = {id: "X", name: "Роман"} as Player;
  private static readonly SECOND_PLAYER: Player = {id: "O", name: "Марія"} as Player;
  private readonly history: Array<Array<Value>> = [];

  public readonly state: State = {
    values: Array<Value>(9)
      .fill({} as Value)
      .map((value, index) => ({index} as Value)),
    gameLog: [],
    nextPlayer: Game.FIRST_PLAYER,
  };

  public render(): ReactNode {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            values={this.state.values}
            nextPlayerName={this.state.nextPlayer.name}
            handleClick={this.handleClick.bind(this)}
          />
        </div>
        <div className="game-info">
          <button onClick={() => this.back()}>BACK</button>
          {this.state.gameLog.map(log => Game.printGameLog(log))}
          <div>
            <b>{this.state.gameOver}</b>
          </div>
        </div>
      </div>
    );
  }

  private back(): void {
    if (this.history.length > 0) {
      this.setState(state => {
        return {
          values: this.history.pop(),
          gameLog: state.gameLog.slice(0, state.gameLog.length - 1),
          nextPlayer: Game.getNextPlayer(state),
          gameOver: "",
        } as State;
      });
    }
  }

  private handleClick(index: number): void {
    this.setState(state => {
      if (!this.state.gameOver && this.isNotOccupied(index)) {
        this.history.push(state.values);
        const values = state.values.slice();
        values[index] = {index, text: state.nextPlayer.id};
        return {
          values,
          gameLog: state.gameLog.concat({
            player: state.nextPlayer,
            cellIndex: index,
          }),
          nextPlayer: Game.getNextPlayer(state),
          gameOver: Game.checkGameOver(state, values),
        } as State;
      }
      return {} as State;
    });
  }

  private static getNextPlayer(state: State): Player {
    return state.nextPlayer === Game.FIRST_PLAYER ? Game.SECOND_PLAYER : Game.FIRST_PLAYER;
  }

  private static checkGameOver(state: State, values: Array<Value>): string {
    if (Game.checkWinner(state.nextPlayer.id, values)) {
      return `Вітаємо, ${state.nextPlayer.name} переможець!!!`;
    } else if (Game.isAllOccupied(values)) {
      return "Нічия, переможця не має";
    }
    return "";
  }

  private isNotOccupied(index: number): boolean {
    return !this.state.values[index].text;
  }

  private static isAllOccupied(values: Array<Value>): boolean {
    return values.every(value => !!value.text);
  }

  private static checkWinner(playerId: string, values: Array<Value>): boolean {
    return (
      Game.isAnyHorizontalWinner(playerId, values) ||
      Game.isAnyVerticalWinner(playerId, values) ||
      Game.isAnyDiagonalWinner(playerId, values)
    );
  }

  private static isAnyHorizontalWinner(playerId: string, values: Array<Value>): boolean {
    const firstLine = values.slice(0, 3);
    const secondLine = values.slice(3, 6);
    const thirdLine = values.slice(6, 9);

    return Game.anyLineMatches(playerId, firstLine, secondLine, thirdLine);
  }

  private static isAnyVerticalWinner(playerId: string, values: Array<Value>): boolean {
    const firstLine = [values[0], values[4], values[8]];
    const secondLine = [values[2], values[4], values[6]];

    return Game.anyLineMatches(playerId, firstLine, secondLine);
  }

  private static isAnyDiagonalWinner(playerId: string, values: Array<Value>): boolean {
    const firstLine = [values[0], values[3], values[6]];
    const secondLine = [values[1], values[4], values[7]];
    const thirdLine = [values[2], values[5], values[8]];

    return Game.anyLineMatches(playerId, firstLine, secondLine, thirdLine);
  }

  private static anyLineMatches(playerId: string, ...lines: Array<Array<Value>>): boolean {
    return lines.some(line => line.every(value => value.text === playerId));
  }

  private static printGameLog(log: Log): ReactNode {
    return (
      <div key={log.cellIndex}>
        {log.player.name} set {log.player.id} to cell {log.cellIndex + 1}
      </div>
    );
  }
}
