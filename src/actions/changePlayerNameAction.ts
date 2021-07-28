import {StateStructure} from "../types/StateStructure";
import {PlayerColor} from "../model/enums/PlayerColor";

type changePlayerNameActionType = {
    payload: { 
        newName: string; 
    }; 
    type: string; 
}
const changePlayerNameAction = function (state: StateStructure["game"], action: changePlayerNameActionType) {
    let playersDiv = document.querySelectorAll(".player")
    let noPlayerDivs = document.querySelectorAll(".no-player")
    if (state.renamedPlayer === PlayerColor.BLACK) {
        state.player1Name = action.payload.newName;
        if (noPlayerDivs.length > 0) {
            playersDiv[0].classList.remove("invisible")
            noPlayerDivs[0].classList.add("invisible")
        }
    } else {
        state.player2Name = action.payload.newName;
        if (noPlayerDivs.length > 0) {
            if (noPlayerDivs.length === 2) {
                playersDiv[1].classList.remove("invisible")
                noPlayerDivs[1].classList.add("invisible")
            } else {
                playersDiv[0].classList.remove("invisible")
                noPlayerDivs[0].classList.add("invisible")
            }
        }
    }
}

export default changePlayerNameAction
