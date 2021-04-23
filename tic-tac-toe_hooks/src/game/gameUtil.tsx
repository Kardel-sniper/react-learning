import React, {ReactNode, SetStateAction} from "react";
import {Log, Player, State, Value} from "./game";

export class GameUtil {
  public static readonly FIRST_PLAYER: Player = {id: "X", name: "Роман"} as Player;
  private static readonly SECOND_PLAYER: Player = {id: "O", name: "Марія"} as Player;
  private static readonly history: Array<Array<Value>> = [];

  public static handleClick(setState: (state: SetStateAction<State>) => void, index: number): void {
    setState(state => {
      if (!state.gameOver && GameUtil.isNotOccupied(index, state)) {
        GameUtil.history.push(state.values);
        const values = state.values.slice();
        values[index] = {index, text: state.nextPlayer.id};
        return {
          values,
          gameLog: state.gameLog.concat({
            player: state.nextPlayer,
            cellIndex: index,
          }),
          nextPlayer: GameUtil.getNextPlayer(state),
          gameOver: GameUtil.checkGameOver(state, values),
        } as State;
      }
      return {...state} as State;
    });
  }

  public static back(setState: (state: SetStateAction<State>) => void): void {
    if (GameUtil.history.length > 0) {
      setState(state => {
        return {
          values: GameUtil.history.pop(),
          gameLog: state.gameLog.slice(0, state.gameLog.length - 1),
          nextPlayer: GameUtil.getNextPlayer(state),
          gameOver: "",
        } as State;
      });
    }
  }

  public static printGameLog(log: Log): ReactNode {
    return (
      <div key={log.cellIndex}>
        {log.player.name} set {log.player.id} to cell {log.cellIndex + 1}
      </div>
    );
  }

  private static getNextPlayer(state: State): Player {
    return state.nextPlayer === GameUtil.FIRST_PLAYER ? GameUtil.SECOND_PLAYER : GameUtil.FIRST_PLAYER;
  }

  private static checkGameOver(state: State, values: Array<Value>): string {
    if (GameUtil.checkWinner(state.nextPlayer.id, values)) {
      return `Вітаємо, ${state.nextPlayer.name} переможець!!!`;
    } else if (GameUtil.isAllOccupied(values)) {
      return "Нічия, переможця не має";
    }
    return "";
  }

  private static isAllOccupied(values: Array<Value>): boolean {
    return values.every(value => !!value.text);
  }

  private static isNotOccupied(index: number, state: State): boolean {
    return !state.values[index].text;
  }

  private static checkWinner(playerId: string, values: Array<Value>): boolean {
    return (
      GameUtil.isAnyHorizontalWinner(playerId, values) ||
      GameUtil.isAnyVerticalWinner(playerId, values) ||
      GameUtil.isAnyDiagonalWinner(playerId, values)
    );
  }

  private static isAnyHorizontalWinner(playerId: string, values: Array<Value>): boolean {
    const firstLine = values.slice(0, 3);
    const secondLine = values.slice(3, 6);
    const thirdLine = values.slice(6, 9);

    return GameUtil.anyLineMatches(playerId, firstLine, secondLine, thirdLine);
  }

  private static isAnyVerticalWinner(playerId: string, values: Array<Value>): boolean {
    const firstLine = [values[0], values[4], values[8]];
    const secondLine = [values[2], values[4], values[6]];

    return GameUtil.anyLineMatches(playerId, firstLine, secondLine);
  }

  private static isAnyDiagonalWinner(playerId: string, values: Array<Value>): boolean {
    const firstLine = [values[0], values[3], values[6]];
    const secondLine = [values[1], values[4], values[7]];
    const thirdLine = [values[2], values[5], values[8]];

    return GameUtil.anyLineMatches(playerId, firstLine, secondLine, thirdLine);
  }

  private static anyLineMatches(playerId: string, ...lines: Array<Array<Value>>): boolean {
    return lines.some(line => line.every(value => value.text === playerId));
  }
}
