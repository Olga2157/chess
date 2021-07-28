import { getPieceColor } from "../../helpers/getPieceColor";
import { Castling } from "../../types/Castling";
import CastlingService from "./CastlingService";

export default class KingMovesService {
  public static getSteps(board: string[][],
    row: number, col: number, pieceColor: string, castling: Castling) {
    let res: number[][] = [];
    let rowArray: number[] = [];
    let colArray: number[] = [];
    res[0] = rowArray;
    res[1] = colArray;

    const dirRow = [1, 1, 0, 0, -1, -1, -1, 1];
    const dirCol = [0, 1, 1, -1, 1, -1, 0, -1];

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

  let castlingMoves =  CastlingService.getSteps(board, row, col, pieceColor, castling);
  rowArray = rowArray.concat(castlingMoves[0]);
  colArray = colArray.concat(castlingMoves[1]);

    res[0] = rowArray;
    res[1] = colArray;

    return res;
  }
}
