import { getPieceColor } from "../../helpers/getPieceColor";

export default class KnightMovesService {
  public static getSteps(board: string[][],
    row: number, col: number, pieceColor: string) {
    let res: number[][] = [];
    let rowArray: number[] = [];
    let colArray: number[] = [];

    const dirRow = [2, 2, 1, 1, -1, -1, -2, -2];
    const dirCol = [1, -1, 2, -2, 2, -2, 1, -1];

    for (let i=0; i<dirRow.length; i++) {
      let curRow = row + dirRow[i];
      let curCol = col + dirCol[i];
      if (curRow < 0 || curRow > 7) {
        continue;
      }
      if (curCol < 0 || curCol > 7) {
        continue;
      }
      // if there is no piece on possible move square
      if (!board[curRow][curCol]) {
        rowArray.push(curRow);
        colArray.push(curCol);
      } else {
        // if there is a piece on possible move square
        let potentialMoveColor = "";
        potentialMoveColor = getPieceColor(board[curRow][curCol]);
        if (potentialMoveColor !== pieceColor) {
          rowArray.push(curRow);
          colArray.push(curCol);
    }
      }
      
  }
    res[0] = rowArray;
    res[1] = colArray;
    return res;
  }
}