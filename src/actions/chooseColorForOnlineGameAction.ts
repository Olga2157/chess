import {StateStructure} from "../types/StateStructure";
import {PlayerColor} from "../model/enums/PlayerColor";

type chooseColorForOnlineGameActionType = {
    payload: { 
        color: PlayerColor 
    }; 
    type: string; 
}
const chooseColorForOnlineGameAction = function (state: StateStructure["game"], action: chooseColorForOnlineGameActionType) {
    state.curOnlinePlayer = action.payload.color;
    let onlineChessImg = document.getElementById("online-chess-image");
    onlineChessImg?.classList.add("invisible")
    let waitingPlayer = document.getElementById("waiting-player");
    waitingPlayer?.classList.remove("invisible")
    let gameSeesions = document.getElementById("game-sessions-id");
    gameSeesions?.classList.add("invisible")
    document.querySelectorAll(".change-color button").forEach((el: Element) => {
        el.setAttribute("disabled", "true");
    })
    let startButton = document.getElementById("start-online-game") as HTMLElement;
    startButton.setAttribute("disabled", "true");
}

export default chooseColorForOnlineGameAction
