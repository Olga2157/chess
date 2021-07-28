import { getPieceColor } from "../../helpers/getPieceColor";

export default class PawnMovesService {
    public static getSteps(board: string[][], row: number, col: number, pieceColor: string, colorToCheck: string) {
        let res: number[][] = [];
        let rowArray: number[] = [];
        let colArray: number[] = [];
        res[0] = rowArray;
        res[1] = colArray;

        // if there is no piece on the same column - go up
        if (row > 0 && !board[row - 1][col]) {
            rowArray.push(row - 1);
            colArray.push(col);
        }
        if (row === 6 && !board[row - 1][col] && !board[row - 2][col]) {
            // opportunity for the fist moving
            rowArray.push(row - 2);
            colArray.push(col);
        }

        let potentialMoveColor = "";
        // if there is a piece of another player
        if ((row - 1) >= 0 && (col - 1) > 0 && board[row - 1][col - 1]) {
            potentialMoveColor = getPieceColor(board[row - 1][col - 1]);
            if (potentialMoveColor !== pieceColor) {
                rowArray.push(row - 1)
                colArray.push(col - 1)
            }
        }
        // if there is a piece of another player
        if ((row - 1) >= 0 && (col + 1) < 8 && board[row - 1][col + 1]) {
            potentialMoveColor = getPieceColor(board[row - 1][col + 1]);
            if (potentialMoveColor !== pieceColor) {
                rowArray.push(row - 1)
                colArray.push(col + 1)
            }
        }
        // check for opponent
        if (colorToCheck) {
            // if there is a piece of another player
            if ((row + 1) < 8 && (col - 1) > 0 && board[row + 1][col - 1]) {
                potentialMoveColor = getPieceColor(board[row + 1][col - 1]);
                if (potentialMoveColor !== pieceColor) {
                    rowArray.push(row + 1)
                    colArray.push(col - 1)
                }
            }
            // if there is a piece of another player
            if ((row + 1) < 8 && (col + 1) < 8 && board[row + 1][col + 1]) {
                potentialMoveColor = getPieceColor(board[row + 1][col + 1]);
                if (potentialMoveColor !== pieceColor) {
                    rowArray.push(row + 1)
                    colArray.push(col + 1)
                }
            }
        }
        return res;
    }
}
