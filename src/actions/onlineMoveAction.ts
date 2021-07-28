import ReverseBoardService from "../services/ReverseBoardService";
import { StateStructure } from "../types/StateStructure";
import {PossibleMovesService} from "../services/PossibleMovesService";
import SocketIo from "../socket.io.client";
import DrawService from "../services/DrawService";
import WinnerService from "../services/WinnerService";
import {GameStatus} from "../model/enums/GameStatus";
import {PlayerColor} from "../model/enums/PlayerColor";

type onlineMoveActionType = {
    payload: { 
        chosenRow: number, 
        chosenCol: number, 
        row: number, 
        col: number, 
        color: string 
    }; 
    type: string; 
}
 const onlineMoveAction = function (state: StateStructure["game"], action: onlineMoveActionType) {
     if (state.activePlayer !== action.payload.color) {
         return;
     }
     state.activePlayer = state.curOnlinePlayer;
     state.chosenPiece.row = action.payload.chosenRow;
     state.chosenPiece.col= action.payload.chosenCol;
     ReverseBoardService.rotate180(state.board);
     let time: string | null | undefined = ""
     let munutesDiv = document.getElementById("minutes");
     let secondsDiv = document.getElementById("seconds");
     if (munutesDiv && munutesDiv?.textContent
         && secondsDiv && secondsDiv?.textContent) {
         time = munutesDiv?.textContent + ":" + secondsDiv?.textContent
     }
     if (state.curOnlinePlayer === PlayerColor.BLACK) {
         let sourceCol = String.fromCharCode("a".charCodeAt(0) + state.chosenPiece.col)
         let targetCol = String.fromCharCode("a".charCodeAt(0) + action.payload.col)
         state.whiteMoves.push({
             step: sourceCol + (7 - state.chosenPiece.row+1) + "-" + targetCol + (7-action.payload.row+1),
             piece: state.board[state.chosenPiece.row][state.chosenPiece.col].split("-")[1],
             time: time
         });
     } else {
         let sourceCol = String.fromCharCode("h".charCodeAt(0) - state.chosenPiece.col)
         let targetCol = String.fromCharCode("h".charCodeAt(0) - action.payload.col)
         state.blackMoves.push({
             step: sourceCol + (state.chosenPiece.row+1) + "-" + targetCol + (action.payload.row+1),
             piece: state.board[state.chosenPiece.row][state.chosenPiece.col].split("-")[1],
             time: time
         });
     }
     const piece = state.board[state.chosenPiece.row][state.chosenPiece.col]
     state.board[state.chosenPiece.row][state.chosenPiece.col] = "";
     state.board[action.payload.row][action.payload.col] = piece;
     ReverseBoardService.rotate180(state.board, true)
     let gameStatus = PossibleMovesService.getSteps(state.board, state.castling, state.activePlayer);
     if (gameStatus.checkMate) {
         WinnerService.winner(state);
         let finishPopup = document.getElementById("finish-popup") as HTMLElement;
         finishPopup.classList.remove("invisible")
         SocketIo.emit('admit-loss', {});
         return;
     } else if (!gameStatus.haveMoves) {
         DrawService.draw(state);
         SocketIo.emit('draw-event', {});
         return;
     }
     state.possibleMoves = gameStatus.steps;
     state.status = GameStatus.STARTED;
}

export default onlineMoveAction
