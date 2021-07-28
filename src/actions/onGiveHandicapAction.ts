import {StateStructure} from "../types/StateStructure";
import HandicapPieceCoordinates from "../model/HandicapPieceCoordinates";

type onGiveHandicapActionType = {
    payload: { 
        coordinates: HandicapPieceCoordinates 
    }; 
    type: string;
}
const onGiveHandicapAction = function (state: StateStructure["game"], action: onGiveHandicapActionType) {
    if (state.curOnlinePlayer === action.payload.coordinates.color) {
    } else {
        state.handicapPieces.push(action.payload.coordinates);
        state.board[7 - action.payload.coordinates.row][7 - action.payload.coordinates.col] = ""
    }
}

export default onGiveHandicapAction
