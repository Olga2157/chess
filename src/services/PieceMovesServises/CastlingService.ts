import { Castling } from "../../types/Castling";
import {PlayerColor} from "../../model/enums/PlayerColor";

export default class CastlingService {
  public static getSteps(board: string[][],
    row: number, col: number, pieceColor: string, castling: Castling) {

    let res: number[][] = [];
    let rowArray: number[] = [];
    let colArray: number[] = [];
    let havePiecesBetween = false;
    if (pieceColor === PlayerColor.WHITE) {
      if (castling.isWhiteKingMoved) {
        return res;
      }
      if (!castling.isWhiteLeftRookMoved) {
        for (let i = col - 1; i > 0; i--) {
          if (board[row][i]) {
            havePiecesBetween = true;
            break;
          }
        }
        if (!havePiecesBetween) {
          rowArray.push(7);
          colArray.push(2);
        }
      }
      if (!castling.isWhiteRightRookMoved) {
        havePiecesBetween = false;
        for (let i = col + 1; i < 7; i++) {
          if (board[row][i]) {
            havePiecesBetween = true;
            break;
          }
        }
        if (!havePiecesBetween) {
          rowArray.push(7);
          colArray.push(6);
        }
      }
    } else {
      if (castling.isBlackKingMoved) {
        return res;
      }
      if (!castling.isBlackLeftRookMoved) {
        havePiecesBetween = false;
        for (let i = col - 1; i > 0; i--) {
          if (board[row][i]) {
            havePiecesBetween = true;
            break;
          }
        }
        if (!havePiecesBetween) {
          rowArray.push(7);
          colArray.push(1);
        }
      }
      if (!castling.isBlackRightRookMoved) {
        havePiecesBetween = false;
        for (let i = col + 1; i < 7; i++) {
          if (board[row][i]) {
            havePiecesBetween = true;
            break;
          }
        }
        if (!havePiecesBetween) {
          rowArray.push(7);
          colArray.push(5);
        }
      }
    }
    res[0] = rowArray;
    res[1] = colArray;
    return res;
  }
}
