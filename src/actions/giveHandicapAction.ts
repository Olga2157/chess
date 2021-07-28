import {StateStructure} from "../types/StateStructure";
import {RandomMoveService} from "../services/RandomMoveService";
import SocketIo from "../socket.io.client";
import {GameStatus} from "../model/enums/GameStatus";
import {GameType} from "../model/enums/GameType";

type onGiveHandicapActionType = {
    payload: { 
        piece: string 
    }; 
    type: string;
}
const onGiveHandicapAction = function (state: StateStructure["game"], action: onGiveHandicapActionType) {
    state.status = GameStatus.PENDING;
    let pieceCoordinates
    if (state.type === GameType.ONLINE) {
        pieceCoordinates = RandomMoveService.choosePiece(state.curOnlinePlayer, state.board, action.payload.piece);
    } else {
        pieceCoordinates = RandomMoveService.choosePiece(state.activePlayer, state.board, action.payload.piece);
    }
    if (pieceCoordinates.row !== -1) {
        state.board[pieceCoordinates.row][pieceCoordinates.col] = "";
        state.handicapPieces.push(pieceCoordinates);
    }
    if (state.type === GameType.OFFLINE) {
        SocketIo.emit("give-handicap", pieceCoordinates)
    }
    let popup = document.getElementById("handicap-popup") as Element;
    popup.classList.add("invisible")
    state.status = GameStatus.STARTED;
}

export default onGiveHandicapAction
