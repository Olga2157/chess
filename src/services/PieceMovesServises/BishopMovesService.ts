import { getPieceColor } from "../../helpers/getPieceColor";

export default class BishopMovesService {
  public static getSteps(board: string[][],
    row: number, col: number, pieceColor: string) {
    let res: number[][] = [];
    let rowArray: number[] = [];
    let colArray: number[] = [];
    let finishedUpAndRight = false;
    let finishedUpAndLeft = false;
    let finishedDownAndRight = false;
    let finishedDownAndLeft = false;

    for (let k = 1; k < 8; k++) {
      // if there is no piece on the square of possible step 
      // moving diagonally up and right
      if (((row - k + 1) > 0) && ((col + k) < 8) && (!board[row - k][col + k]) && !finishedUpAndRight) {
        rowArray.push(row - k);
        colArray.push(col + k);
      }
      // moving diagonally up and left
      if (((row - k + 1) > 0) && ((col - k + 1) > 0) && (!board[row - k][col - k]) && !finishedUpAndLeft) {
        rowArray.push(row - k);
        colArray.push(col - k);
      }
      // moving diagonally down and right
      if (((row + k) < 8) && ((col + k) < 8) && (!board[row + k][col + k]) && !finishedDownAndRight) {
        rowArray.push(row + k);
        colArray.push(col + k);
      }
      // moving diagonally down and left
      if (((row + k) < 8) && ((col - k + 1) > 0) && (!board[row + k][col - k]) && !finishedDownAndLeft) {
        rowArray.push(row + k);
        colArray.push(col - k);
      }

      // if there is a piece of another player on the square of possible step
      // moving diagonally up and right
      let potentialMoveColor = "";
      if (((row - k + 1) > 0) && ((col + k) < 8) && (board[row - k][col + k]) && !finishedUpAndRight) {
        potentialMoveColor = getPieceColor(board[row - k][col + k]);
        if (potentialMoveColor !== pieceColor) {
          rowArray.push(row - k);
          colArray.push(col + k);
        }
        finishedUpAndRight = true;
      }
      // moving diagonally up and left
      if (((row - k + 1) > 0) && ((col - k + 1) > 0) && (board[row - k][col - k]) && !finishedUpAndLeft) {
        potentialMoveColor = getPieceColor(board[row - k][col - k]);
        if (potentialMoveColor !== pieceColor) {
          rowArray.push(row - k);
          colArray.push(col - k);
        }
        finishedUpAndLeft = true;
      }
      // moving diagonally down and right
      if (((row + k) < 8) && ((col + k) < 8) && (board[row + k][col + k]) && !finishedDownAndRight) {
        potentialMoveColor = getPieceColor(board[row + k][col + k]);
        if (potentialMoveColor !== pieceColor) {
          rowArray.push(row + k);
          colArray.push(col + k);
        }
        finishedDownAndRight = true;
      }
      // moving diagonally down and left
      if (((row + k) < 8) && ((col - k + 1) > 0) && (board[row + k][col - k]) && !finishedDownAndLeft) {
        potentialMoveColor = getPieceColor(board[row + k][col - k]);
        if (potentialMoveColor !== pieceColor) {
          rowArray.push(row + k);
          colArray.push(col - k);
        }
        finishedDownAndLeft = true;
      }
    }
    res[0] = rowArray;
    res[1] = colArray;
    return res;
  }
}