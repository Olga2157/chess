import { StateStructure } from "../types/StateStructure";
import SocketIo from "../socket.io.client";
import RoomIndexedDB from "../services/db/RoomIndexedDB";
import RoomDbDTO from "../model/RoomDbDTO";
import { PieceMove } from "../types/PieceMove";
import MoveIndexedDB from "../services/db/MoveIndexedDB";
import MoveDbDTO from "../model/MoveDbDTO";
import HandicapPieceCoordinates from "../model/HandicapPieceCoordinates";
import { GameStatus } from "../model/enums/GameStatus";
import { PlayerColor } from "../model/enums/PlayerColor";

type AdmitLossActionType = {
    payload: { 
        anotherPlayer?: boolean 
    }; 
    type: string;
}
const admitLossAction = function (state: StateStructure["game"], action: AdmitLossActionType) {
    if (state.timerStatus === GameStatus.FINISHED) {
        return;
    }
    state.timerStatus = GameStatus.FINISHED;
    state.status = GameStatus.FINISHED;
    if (state.activePlayer === PlayerColor.WHITE) {
        state.winner = action.payload.anotherPlayer ? state.player2Name : state.player1Name;
    } else {
        state.winner = action.payload.anotherPlayer ? state.player1Name : state.player2Name;
    }
    RoomIndexedDB.putRoom(new RoomDbDTO(state.roomId, state.winner + " win", state.player1Name, state.player2Name))
    state.whiteMoves.forEach((move: PieceMove) => {
        MoveIndexedDB.putMove(new MoveDbDTO(state.roomId, move.step, PlayerColor.WHITE, move.time))
    }
    )
    state.blackMoves.forEach((move: PieceMove) => {
        MoveIndexedDB.putMove(new MoveDbDTO(state.roomId, move.step, PlayerColor.BLACK, move.time))
    }
    )
    state.handicapPieces.forEach((handicapPiece: HandicapPieceCoordinates) => {
        MoveIndexedDB.putMove(new MoveDbDTO(state.roomId, "rm " + handicapPiece.row + ":" + handicapPiece.col, handicapPiece.color, handicapPiece.time))
    })
    state.curOnlinePlayer = PlayerColor.NO;
    if (!action.payload.anotherPlayer) {
        SocketIo.emit('admit-loss', {});
    }
}

export default admitLossAction
