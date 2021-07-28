import {Castling} from "../types/Castling";
import CheckService from "./CheckService";
import BishopMovesService from "./PieceMovesServises/BishopMovesService";
import KingMovesService from "./PieceMovesServises/KingMovesService";
import KnightMovesService from "./PieceMovesServises/KnightMovesService";
import PawnMovesService from "./PieceMovesServises/PawnMovesService";
import QueenMovesService from "./PieceMovesServises/QueenMovesService";
import RookMovesService from "./PieceMovesServises/RookMovesService";
import GameMovesStatus from "../model/GameMovesStatus";
import {PlayerColor} from "../model/enums/PlayerColor";
import { getPieceColor } from "../helpers/getPieceColor";
import { getPieceName } from "../helpers/getPieceName";

export class PossibleMovesService {
    public static getSteps(board: string[][], castling: Castling, activePlayer: string, checkOppositePawns : boolean = false): GameMovesStatus {
        let steps: number[][][][] = []
        PossibleMovesService.calculateSteps(board, steps, castling, checkOppositePawns ? activePlayer : "");
        let resCheck = false;
        let checkMate = false;
        let deletedSteps = CheckService.deleteAllIncorrectMovesToKingDirection(board, steps);
        if (deletedSteps.length > 0) {
            resCheck = true;
            checkMate = true;
            // check situation
            let attackColor = PossibleMovesService.getAttackColor(board, deletedSteps);
            // recalculate Steps
            for (let curStepRow = 0; curStepRow < board.length; curStepRow++) {
                let curStepCol = 0
                for (curStepCol = 0; curStepCol < board[0].length; curStepCol++) {
                    let rowArrayCheckEscaping: number[] = [];
                    let colArrayCheckEscaping: number[] = [];
                    let curPiece = board[curStepRow][curStepCol];
                    if (!curPiece || attackColor === getPieceColor(curPiece)) {
                        continue;
                    }
                    let stepsForCurPiece = steps[curStepRow][curStepCol];
                    if (!stepsForCurPiece[0]) {
                        continue;
                    }
                    for (let index = 0; index < stepsForCurPiece[0].length; index++) {
                        let copyBoard: string[][] = [];
                        for (let i = 0; i < board.length; i++) {
                            copyBoard[i] = board[i].slice();
                        }
                        let copiedCurPiece = copyBoard[curStepRow][curStepCol];
                        copyBoard[curStepRow][curStepCol] = "";
                        let updatedRow = stepsForCurPiece[0][index];
                        let updatedCol = stepsForCurPiece[1][index];
                        if (!updatedRow || !updatedCol) {
                            continue;
                        }
                        copyBoard[updatedRow][updatedCol] = copiedCurPiece;
                        let resForCurMove: number[][][][] = []
                        PossibleMovesService.calculateSteps(copyBoard, resForCurMove, castling, "");
                        let deletedSteps = CheckService.deleteAllIncorrectMovesToKingDirection(copyBoard, resForCurMove);
                        if (deletedSteps.length === 0) {
                            rowArrayCheckEscaping.push(updatedRow);
                            colArrayCheckEscaping.push(updatedCol);
                        }
                    }
                    steps[curStepRow][curStepCol] = [];
                    if (rowArrayCheckEscaping.length > 0) {
                        checkMate = false;
                        steps[curStepRow][curStepCol][0] = rowArrayCheckEscaping;
                        steps[curStepRow][curStepCol][1] = colArrayCheckEscaping;
                    }
                }
            }
            PossibleMovesService.colorCheckSituation(deletedSteps, board, checkMate);
        }
        return new GameMovesStatus(steps, resCheck, checkMate, PossibleMovesService.haveMoves(steps, board, activePlayer));
    }

    private static calculateSteps(board: string[][], res: number[][][][], castling: Castling, colorToCheck: string) {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length; col++) {
                let curPiece = board[row][col];
                if (board[row][col].endsWith("-check") || board[row][col].endsWith("-attack_king")) {
                    board[row][col] = getPieceColor(curPiece) + "-" + getPieceName(curPiece);
                }
                if (!curPiece) {
                    if (!res[row]) {
                        res[row] = [];
                    }
                    res[row][col] = [];
                } else {
                    if (!res[row]) {
                        res[row] = [];
                    }
                    if (!res[row][col]) {
                        res[row][col] = [];
                    }
                    res[row][col] = PossibleMovesService.getMovesForCurPiece(board, curPiece, row, col, castling, colorToCheck);
                }
            }
        }
    }

    public static colorCheckSituation(steps: number[][], board: string[][], isCheckMate: boolean) {
        let attackColor = PossibleMovesService.getAttackColor(board, steps);
        let rowKing = -1;
        let colKing = -1;
        if (attackColor === PlayerColor.WHITE) {
            for (let row = 0; row < board.length; row++) {
                for (let col = 0; col < board[0].length; col++) {
                    let curPiece = board[row][col];
                    if (getPieceName(curPiece) === "king" && getPieceColor(curPiece) === PlayerColor.BLACK) {
                        rowKing = row;
                        colKing = col;
                        break;
                    }
                }
            }
        } else {
            for (let row = 0; row < board.length; row++) {
                for (let col = 0; col < board[0].length; col++) {
                    let curPiece = board[row][col];
                    if (getPieceName(curPiece) === "king" && getPieceColor(curPiece) === PlayerColor.WHITE) {
                        rowKing = row;
                        colKing = col;
                        break;
                    }
                }
            }
        }
        if (isCheckMate) {
            board[rowKing][colKing] += "-checkmate";
        } else {
            board[rowKing][colKing] += "-check";
        }

        for (let index = 0; index < steps[0].length; index++) {
            let rowStep = steps[0][index];
            let colStep = steps[1][index];
            if (isCheckMate) {
                board[rowStep][colStep] += "-attack_king_checkmate";
            } else {
                board[rowStep][colStep] += "-attack_king";
            }
        }
    }

    public static getMovesForCurPiece(board: string[][], curPiece: string, row: number, col: number, castling: Castling, colorToCheck: string) {
        let res: number[][] = [];
        let chosenPiece = getPieceName(curPiece);
        let pieceColor = getPieceColor(curPiece);
        switch (chosenPiece) {
            case "pawn":
                res = PawnMovesService.getSteps(board, row, col, pieceColor, colorToCheck);
                break;
            case "rook":
                res = RookMovesService.getSteps(board, row, col, pieceColor);
                break;
            case "knight":
                res = KnightMovesService.getSteps(board, row, col, pieceColor);
                break;
            case "bishop":
                res = BishopMovesService.getSteps(board, row, col, pieceColor);
                break;
            case "queen":
                res = QueenMovesService.getSteps(board, row, col, pieceColor);
                break;
            case "king":
                res = KingMovesService.getSteps(board, row, col, pieceColor, castling);
                break;
        }
        return res;
    }

    private static getAttackColor(board: string[][], steps: number[][]) {
        return getPieceColor(board[steps[0][0]][steps[1][0]]);
    }

    private static haveMoves(steps: number[][][][], board: string[][], activePlayer: string) {
        let res = false;
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length; col++) {
                let curPiece = board[row][col];
                if (getPieceColor(curPiece) !== activePlayer) {
                    continue;
                }
                if (steps[row][col][0]  && steps[row][col][0].length > 0) {
                    res = true;
                    break;
                }
            }
            if (res) {
                break;
            }
        }
        return res;
    }
}

