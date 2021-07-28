import BishopMovesService from "./BishopMovesService";
import RookMovesService from "./RookMovesService";

export default class QueenMovesService {
  public static getSteps(board: string[][],
    row: number, col: number, pieceColor: string) {
    let res: number[][] = [];
    let rowArray: number[] = [];
    let colArray: number[] = [];
    
    let possibleHorizontallyAndVerticallyMovesArray = RookMovesService.getSteps(board, row, col, pieceColor)
    let possibleDiagonallyMovesArray = BishopMovesService.getSteps(board, row, col, pieceColor)


    res[0] = rowArray.concat(possibleHorizontallyAndVerticallyMovesArray[0], possibleDiagonallyMovesArray[0]);
    res[1] = colArray.concat(possibleHorizontallyAndVerticallyMovesArray[1], possibleDiagonallyMovesArray[1]);
    return res;
  }
}