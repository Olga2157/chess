import {PossibleMovesService} from "../services/PossibleMovesService";
import ReverseBoardService from "../services/ReverseBoardService";
import {StateStructure} from "../types/StateStructure";
import SocketIo from "../socket.io.client";
import ChangePlayersService from "../services/ChangePlayersService";
import {RandomMoveService} from "../services/RandomMoveService";
import RoomDbDTO from "../model/RoomDbDTO";
import SaveMoveService from "../services/SaveMoveService";
import DrawService from "../services/DrawService";
import WinnerService from "../services/WinnerService";
import GameMovesStatus from "../model/GameMovesStatus";
import {GameStatus} from "../model/enums/GameStatus";
import {PlayerColor} from "../model/enums/PlayerColor";
import {GameType} from "../model/enums/GameType";
import { getPieceColor } from "../helpers/getPieceColor";
import { getPieceName } from "../helpers/getPieceName";

type movePieceActionType = {
    payload: { 
        row: number; 
        col: number; 
    }; 
    type: string;
}
const movePieceAction = function (state: StateStructure["game"], action: movePieceActionType) {
    let squares = document.querySelectorAll("td");
    let chosenPieceRow = state.chosenPiece.row
    let chosenPieceCol = state.chosenPiece.col
    if (squares.length === 0 || !squares[chosenPieceRow * 8 + chosenPieceCol].classList.contains("currentPiece")) {
        return;
    }
    state.status = GameStatus.PENDING;
    let time: string | null | undefined = ""
    let munutesDiv = document.getElementById("minutes");
    let secondsDiv = document.getElementById("seconds");
    if (munutesDiv && munutesDiv?.textContent
        && secondsDiv && secondsDiv?.textContent) {
        time = munutesDiv?.textContent + ":" + secondsDiv?.textContent
    }
    if (state.activePlayer === PlayerColor.WHITE) {
        let sourceCol = String.fromCharCode("a".charCodeAt(0) + state.chosenPiece.col)
        let targetCol = String.fromCharCode("a".charCodeAt(0) + action.payload.col)
        let step = sourceCol + (7 - state.chosenPiece.row + 1) + "-" + targetCol + (7 - action.payload.row + 1);
        state.whiteMoves.push({
            step: step,
            piece: state.board[state.chosenPiece.row][state.chosenPiece.col].split("-")[1],
            time: time
        });
    } else {
        let sourceCol = String.fromCharCode("h".charCodeAt(0) - state.chosenPiece.col)
        let targetCol = String.fromCharCode("h".charCodeAt(0) - action.payload.col)
        let step = sourceCol + (state.chosenPiece.row + 1) + "-" + targetCol + (action.payload.row + 1);
        state.blackMoves.push({
            step: step,
            piece: state.board[state.chosenPiece.row][state.chosenPiece.col].split("-")[1],
            time: time
        });
    }
    const piece = state.board[state.chosenPiece.row][state.chosenPiece.col]
    state.board[state.chosenPiece.row][state.chosenPiece.col] = "";
    state.board[action.payload.row][action.payload.col] = piece;
    let pieceColor = getPieceColor(piece);
    let pieceName = getPieceName(piece);
    if (action.payload.row === 0 && pieceName === "pawn") {
        if (pieceColor === PlayerColor.WHITE) {
            state.board[action.payload.row][action.payload.col] = "white-queen";
        } else {
            state.board[action.payload.row][action.payload.col] = "black-queen";
        }
    }
    state.activePlayer = (state.activePlayer === PlayerColor.WHITE) ? PlayerColor.BLACK : PlayerColor.WHITE;
    ChangePlayersService.changeActivePlayerImg();
    if (state.type === GameType.OFFLINE) {
        ReverseBoardService.rotate180(state.board)
        let gameStatus = PossibleMovesService.getSteps(state.board, state.castling, state.activePlayer, true);
        state.possibleMoves = gameStatus.steps
        if (gameStatus.checkMate) {
            WinnerService.winner(state);
            let roomDbDTO = new RoomDbDTO(state.roomId, state.winner + " win", state.player1Name, state.player2Name);
            SaveMoveService.saveTODb(roomDbDTO, state)
            let finishPopup = document.getElementById("finish-popup") as HTMLElement;
            finishPopup.classList.remove("invisible")
            state.curOnlinePlayer = PlayerColor.NO;
        } else if (!gameStatus.haveMoves) {
            DrawService.draw(state);
            state.curOnlinePlayer = PlayerColor.NO;
        } else {
            state.status = GameStatus.STARTED;
        }
    } else if (state.type === GameType.AI) {
        ReverseBoardService.rotate180(state.board);
        let gameStatus = PossibleMovesService.getSteps(state.board, state.castling, state.activePlayer);
        if (checkMateCheck(gameStatus, state)) {
            return;
        }
        state.possibleMoves = gameStatus.steps;
        let move = RandomMoveService.chooseMove(state.activePlayer, state.board, state.possibleMoves);
        let moveSourceRow = move[0], moveSourceCol = move[1], moveTargetRow = move[2], moveTargetCol = move[3];
        let time: string | null | undefined = ""
        let munutesDiv = document.getElementById("minutes");
        let secondsDiv = document.getElementById("seconds");
        if (munutesDiv && munutesDiv?.textContent
            && secondsDiv && secondsDiv?.textContent) {
            time = munutesDiv?.textContent + ":" + secondsDiv?.textContent
        }
        if (state.activePlayer === PlayerColor.WHITE) {
            let sourceCol = String.fromCharCode("a".charCodeAt(0) + moveSourceCol)
            let targetCol = String.fromCharCode("a".charCodeAt(0) + moveTargetCol)
            state.whiteMoves.push({
                step: sourceCol + (7 - moveSourceRow + 1) + "-" + targetCol + (7 - moveTargetRow + 1),
                piece: state.board[moveSourceRow][moveSourceCol].split("-")[1],
                time: time
            });
        } else {
            let sourceCol = String.fromCharCode("h".charCodeAt(0) - moveSourceCol)
            let targetCol = String.fromCharCode("h".charCodeAt(0) - moveTargetCol)
            state.blackMoves.push({
                step: sourceCol + (moveSourceRow + 1) + "-" + targetCol + (moveTargetRow + 1),
                piece: state.board[moveSourceRow][moveSourceCol].split("-")[1],
                time: time
            });
        }
        const piece = state.board[moveSourceRow][moveSourceCol]
        state.board[moveSourceRow][moveSourceCol] = "";
        state.board[moveTargetRow][moveTargetCol] = piece;
        state.activePlayer = (state.activePlayer === PlayerColor.WHITE) ? PlayerColor.BLACK : PlayerColor.WHITE;
        ReverseBoardService.rotate180(state.board);
        gameStatus = PossibleMovesService.getSteps(state.board, state.castling, state.activePlayer);
        if (checkMateCheck(gameStatus, state)) {
            return;
        }
        state.possibleMoves = gameStatus.steps;
        state.status = GameStatus.STARTED;
    } else {
        state.status = GameStatus.PENDING;
        SocketIo.emit('game-update', {
            "row": action.payload.row,
            "col": action.payload.col,
            "chosenRow": state.chosenPiece.row,
            "chosenCol": state.chosenPiece.col,
            "color": state.curOnlinePlayer
        });
    }
}

const checkMateCheck = (gameStatus: GameMovesStatus, state: StateStructure["game"]) => {
    if (gameStatus.checkMate) {
        WinnerService.winner(state);
        let roomDbDTO = new RoomDbDTO(state.roomId, state.winner + " win", state.player1Name, state.player2Name);
        SaveMoveService.saveTODb(roomDbDTO, state)
        let finishPopup = document.getElementById("finish-popup") as HTMLElement;
        finishPopup.classList.remove("invisible")
        state.curOnlinePlayer = PlayerColor.NO;
        return true;
    } else if (!gameStatus.haveMoves) {
        DrawService.draw(state);
        state.curOnlinePlayer = PlayerColor.NO;
        return true;
    }
    return false;
}

export default movePieceAction
