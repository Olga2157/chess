import { getPieceColor } from "../../helpers/getPieceColor";

export default class RookMovesService {
  public static getSteps(board: string[][],
    row: number, col: number, pieceColor: string) {
    let res: number[][] = [];
    let rowArray: number[] = [];
    let colArray: number[] = [];
    res[0] = rowArray;
    res[1] = colArray;
    let finishedUp = false;
    let finishedDown = false;
    let finishedLeft = false;
    let finishedRight = false;

    for (let k = 1; k < 8; k++) {
      // moving vertically up and down

      if ((row - k + 1 > 0) && (!board[row - k][col]) && !finishedUp) {
        rowArray.push(row - k);
        colArray.push(col);
      }
      if ((row + k < 8) && (!board[row + k][col]) && !finishedDown) {
        rowArray.push(row + k);
        colArray.push(col);
      }
      // moving horizontally left and right
      if ((col - k + 1 > 0) && (!board[row][col - k]) && !finishedLeft) {
        rowArray.push(row);
        colArray.push(col - k);
      }
      if ((col + k < 8) && (!board[row][col + k]) && !finishedRight) {
        rowArray.push(row);
        colArray.push(col + k);
      }

      // if there is a piece of another player
      // moving vertically up and down
      let potentialMoveColor = "";
      if ((row - k + 1 > 0) && (board[row - k][col]) && !finishedUp) {
        potentialMoveColor = getPieceColor(board[row - k][col]);
        if (potentialMoveColor !== pieceColor) {
          rowArray.push(row - k);
          colArray.push(col);
        }
        finishedUp = true;
      }
      if ((row + k < 8) && (board[row + k][col]) && !finishedDown) {
        potentialMoveColor = getPieceColor(board[row + k][col]);
        if (potentialMoveColor !== pieceColor) {
          rowArray.push(row + k);
          colArray.push(col);
        }
        finishedDown = true;
      }
      // moving horizontally left and right
      if ((col - k + 1 > 0) && (board[row][col - k]) && !finishedLeft) {
        potentialMoveColor = getPieceColor(board[row][col - k]);
        if (potentialMoveColor !== pieceColor) {
          rowArray.push(row);
          colArray.push(col - k);
        }
        finishedLeft = true;
      }
      if ((col + k < 8) && (board[row][col + k]) && !finishedRight) {
        potentialMoveColor = getPieceColor(board[row][col + k]);
        if (potentialMoveColor !== pieceColor) {
          rowArray.push(row);
          colArray.push(col + k);
        }
        finishedRight = true;
      }
    }
    return res;
  }
}