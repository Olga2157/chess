import { getPieceColor } from "../helpers/getPieceColor";
import { getPieceName } from "../helpers/getPieceName";
import HandicapPieceCoordinates from "../model/HandicapPieceCoordinates";

export class RandomMoveService {

    public static chooseMove(activePlayer: string, board: string[][], possibleMoves: number[][][][]): number[] {
        let found = false, res: number[] = [];
        let moveEatArray = RandomMoveService.checkEatOppurtunities(activePlayer, board, possibleMoves)
        if (moveEatArray[5].length === 0) {
            return res; // have no moves
        }
        for (let i = 0; i < moveEatArray.length; i++) {
            if (moveEatArray[i].length > 0) {
                return moveEatArray[i];
            }
        }
        found = false;
        while (!found) {
            let row = RandomMoveService.randomInteger(0, 7), col = RandomMoveService.randomInteger(0, 7);
            let piece = board[row][col];
            if (!piece) {
                continue;
            }
            let moves = possibleMoves[row][col];
            if (piece.split("-")[0] !== activePlayer || !moves[0] || moves[0].length === 0) {
                continue;
            }
            res.push(row);
            res.push(col);
            let index = RandomMoveService.randomInteger(0, moves[0].length - 1);
            res.push(moves[0][index]);
            res.push(moves[1][index]);
            found = true;
        }
        return res;
    }

    public static choosePiece(activePlayer: string, board: string[][], piece: string): HandicapPieceCoordinates {
        let found = false;
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length; col++) {
                let curPiece = board[row][col];
                if (!curPiece) {
                    continue;
                }
                let pieceColor = getPieceColor(curPiece);
                let pieceName = getPieceName(curPiece);
                if (pieceName === piece && pieceColor === activePlayer) {
                    found = true;
                }
            }
        }
        if (!found) {
            return new HandicapPieceCoordinates(-1, -1, activePlayer, "");
        }
        while (true) {
            let row = RandomMoveService.randomInteger(0, 7)
            let col = RandomMoveService.randomInteger(0, 7);
            let curPiece = board[row][col];
            if (!curPiece) {
                continue;
            }
            let pieceColor = getPieceColor(curPiece);
            let pieceName = getPieceName(curPiece);
            if (pieceName === piece && pieceColor === activePlayer) {
                let time = ""
                let munutesDiv = document.getElementById("minutes");
                let secondsDiv = document.getElementById("seconds");
                if (munutesDiv && munutesDiv?.textContent
                    && secondsDiv && secondsDiv?.textContent) {
                    time = munutesDiv?.textContent + ":" + secondsDiv?.textContent
                }
                return new HandicapPieceCoordinates(row, col, activePlayer, time);
            }
        }
    }

    public static chooseFirstWhiteMove(): number[] {
        let candidates = [
            [1, 1, 2, 1],
            [1, 1, 3, 1],
            [1, 2, 2, 2],
            [1, 2, 3, 2],
            [1, 3, 3, 3],
            [1, 3, 3, 3],
            [1, 4, 3, 4],
            [1, 4, 3, 4],
            [1, 5, 3, 5],
            [1, 5, 3, 5],
            [1, 6, 3, 6],
            [1, 6, 3, 6],
            [1, 7, 3, 7],
            [1, 7, 3, 7],
            [1, 8, 3, 8],
            [1, 8, 3, 8]
        ]
        let index = RandomMoveService.randomInteger(0, candidates.length);
        return candidates[index];
    }

    private static randomInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private static checkEatOppurtunities(activePlayer: string, board: string[][], possibleMoves: number[][][][]): number[][] {
        let moveEatArray: number[][] = [[], [], [], [], [], []];// queen, rook, knight, bishop, pawn, moveExist
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length; col++) {
                if (possibleMoves[row][col] && possibleMoves[row][col][0] && possibleMoves[row][col][0].length > 0) {
                    let pieceColor = board[row][col].split("-")[0];
                    if (pieceColor !== activePlayer) {
                        continue;
                    }
                    let movesForPiece = possibleMoves[row][col]
                    for (let i = 0; i < movesForPiece[0].length; i++) {
                        let pieceRow = movesForPiece[0][i]
                        let pieceCol = movesForPiece[1][i]
                        switch (board[pieceRow][pieceCol].split("-")[1]) {
                            case "queen":
                                moveEatArray[0] = [row, col, pieceRow, pieceCol];
                                break;
                            case "rook":
                                moveEatArray[1] = [row, col, pieceRow, pieceCol];
                                break;
                            case "knight":
                                moveEatArray[2] = [row, col, pieceRow, pieceCol];
                                break;
                            case "bishop":
                                moveEatArray[3] = [row, col, pieceRow, pieceCol];
                                break;
                            case "pawn":
                                moveEatArray[4] = [row, col, pieceRow, pieceCol];
                                break;
                            default:
                                break;
                        }
                    }
                    moveEatArray[5] = [1]; // have moves
                }
            }
        }
        return moveEatArray;
    }
}

