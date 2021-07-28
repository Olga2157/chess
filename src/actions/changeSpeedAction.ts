import { StateStructure } from "../types/StateStructure";
import { GameStatus } from "../model/enums/GameStatus";

type changeSpeedActionType = {
    payload: {
        speed: number
    };
    type: string;
}
const changeSpeedAction = function (state: StateStructure["game"], action: changeSpeedActionType) {
    if (state.status === GameStatus.STARTED) {
        state.replayTimerSpeed = action.payload.speed
    }
}

export default changeSpeedAction
