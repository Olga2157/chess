import {StateStructure} from "../types/StateStructure";
import {GameStatus} from "../model/enums/GameStatus";
import { PlayerColor } from "../model/enums/PlayerColor";

type drawActionType = {
    payload: {
    }; 
    type: string;
}
const drawAction = function (state: StateStructure["game"], action: drawActionType) {
    let offerDrawPopup = document.getElementById("offer-draw-popup") as HTMLElement;
    offerDrawPopup.classList.add("invisible")
    let drawPopup = document.getElementById("draw-popup") as HTMLElement;
    drawPopup.classList.remove("invisible")
    state.status = GameStatus.FINISHED;
    state.timerStatus = GameStatus.FINISHED;
    state.curOnlinePlayer = PlayerColor.NO;
}

export default drawAction
