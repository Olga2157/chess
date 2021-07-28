import ReverseBoardService from "../services/ReverseBoardService";
import {StateStructure} from "../types/StateStructure";
import Room from "../model/Room";
import {PossibleMovesService} from "../services/PossibleMovesService";
import {GameStatus} from "../model/enums/GameStatus";
import {PlayerColor} from "../model/enums/PlayerColor";
import {GameType} from "../model/enums/GameType";
import { Castling } from "../types/Castling";

type startOnlineGameActionType = {
    payload: { 
        color: PlayerColor; 
        room: Room; 
        curPlayer: string 
    }; 
    type: string 
}
const startOnlineGameAction = function (state: StateStructure["game"], action: startOnlineGameActionType, initialCastling: Castling) {
   
    state.activePlayer = PlayerColor.WHITE;
    let player1 = action.payload.room.player1?.userName ? action.payload.room.player1.userName : "";
    let player2 = action.payload.room.player2?.userName ? action.payload.room.player2.userName : "";
    if (action.payload.color === PlayerColor.BLACK) {
        ReverseBoardService.rotate180(state.board, false, PlayerColor.BLACK)
        state.curOnlinePlayer = PlayerColor.BLACK
        state.status = GameStatus.PENDING
        state.player1Name = action.payload.color ? player2 : player1
        state.player2Name = action.payload.color ? player1 : player2
    } else {
        state.status = GameStatus.STARTED
        state.curOnlinePlayer = PlayerColor.WHITE
        state.player1Name = action.payload.color ? player2 : player1
        state.player2Name = action.payload.color ? player1 : player2
    }
    state.handicapPieces = [];
    state.whiteMoves = [];
    state.blackMoves = [];
    state.possibleMoves = PossibleMovesService.getSteps(state.board, initialCastling, state.curOnlinePlayer).steps;
    state.roomId = action.payload.room.roomId;
    state.type = GameType.ONLINE
}

export default startOnlineGameAction
