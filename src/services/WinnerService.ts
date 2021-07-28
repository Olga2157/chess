import {StateStructure} from "../types/StateStructure";
import {GameStatus} from "../model/enums/GameStatus";
import {PlayerColor} from "../model/enums/PlayerColor";

export default class WinnerService {
    public static winner(state: StateStructure["game"]) {
        state.timerStatus = GameStatus.FINISHED;
        state.status = GameStatus.FINISHED;
        let winnerImages = document.querySelectorAll(".winnerImage")
        if (state.activePlayer === PlayerColor.WHITE) {
            //set black to winner
            state.winner = state.player1Name;
            winnerImages[0].classList.remove("invisible")
        } else {
            state.winner = state.player2Name;
            winnerImages[1].classList.remove("invisible")
        }
        let activeDivs = document.querySelectorAll(".img-active-wrapper")
        activeDivs.forEach((div: Element) => {
            div.classList.add("invisible")
        })
    }
}


