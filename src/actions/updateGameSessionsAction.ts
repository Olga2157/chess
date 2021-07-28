import {StateStructure} from "../types/StateStructure";
import Room from "../model/Room";

type updateGameSessionsActionType = {
    payload: {
        sessions: Room[]
    }; 
    type: string
}
const updateGameSessionsAction = function (state: StateStructure["game"], action: updateGameSessionsActionType) {
    state.sessions = action.payload.sessions
}

export default updateGameSessionsAction
