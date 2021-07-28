import {StateStructure} from "../types/StateStructure";
import {GameStatus} from "../model/enums/GameStatus";
import {PlayerColor} from "../model/enums/PlayerColor";
import {GameType} from "../model/enums/GameType";

type startReplayActionType = {
    payload: { 
        room: string 
    }; 
    type: string
}
const startReplayAction = function (state: StateStructure["game"], action: startReplayActionType, initialBoard: string[][]) {
    let curRoom = JSON.parse(action.payload.room)
    state.replayRoom = curRoom;
    state.board = initialBoard;
    state.player1Name = curRoom.player1;
    state.player2Name = curRoom.player2;
    state.activePlayer = PlayerColor.WHITE;
    state.whiteMoves = [];
    state.handicapPieces = [];
    state.blackMoves = [];
    state.possibleMoves = [];
    state.type = GameType.REPLAY;
    state.status = GameStatus.STARTED
    state.timerStatus = GameStatus.STARTED
}

export default startReplayAction
