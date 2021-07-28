import {StateStructure} from "../types/StateStructure";

type choosePieceActionType = {
    payload: { 
        row: number; 
        col: number; 
    }; 
    type: string; 
}
const choosePieceAction = function (state: StateStructure["game"], action: choosePieceActionType) {
    state.chosenPiece.col = action.payload.col;
    state.chosenPiece.row = action.payload.row;
}

export default choosePieceAction
