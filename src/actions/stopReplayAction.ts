import {StateStructure} from "../types/StateStructure";
import {GameStatus} from "../model/enums/GameStatus";
import {PlayerColor} from "../model/enums/PlayerColor";
import {GameType} from "../model/enums/GameType";

type stopReplayActionType = {
    payload: {
    }; 
    type: string
}
const stopReplayAction = function (state: StateStructure["game"], action: stopReplayActionType, initialBoard: string[][]) {
    state.board = initialBoard;
    state.activePlayer = PlayerColor.WHITE;
    state.whiteMoves = [];
    state.blackMoves = [];
    state.handicapPieces = [];
    state.possibleMoves = [];
    state.type = GameType.OFFLINE;
    state.status = GameStatus.PENDING
    state.timerStatus = GameStatus.PENDING
    state.replayTimerSpeed = 1
}

export default stopReplayAction
