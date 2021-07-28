import {StateStructure} from "../types/StateStructure";
import {PossibleMovesService} from "../services/PossibleMovesService";
import {GameStatus} from "../model/enums/GameStatus";
import {PlayerColor} from "../model/enums/PlayerColor";
import {GameType} from "../model/enums/GameType";
import { Castling } from "../types/Castling";

type startOfflineGameActionType = {
    payload: { 
    }; 
    type: string 
}
const startOfflineGameAction = function (state: StateStructure["game"], action: startOfflineGameActionType, initialBoard: string[][], initialCastling: Castling) {
    state.board = initialBoard;
    state.activePlayer = PlayerColor.WHITE;
    state.whiteMoves = [];
    state.blackMoves = [];
    state.possibleMoves = PossibleMovesService.getSteps(initialBoard, initialCastling, PlayerColor.WHITE).steps;
    state.status = GameStatus.STARTED;
    state.timerStatus = GameStatus.PENDING
    state.type = GameType.OFFLINE;
    state.handicapPieces = [];
    state.roomId = Math.random().toString(36).substring(7);
}

export default startOfflineGameAction
