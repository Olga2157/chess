import {StateStructure} from "../types/StateStructure";
import RoomDbDTO from "../model/RoomDbDTO";
import SaveMoveService from "./SaveMoveService";
import {GameStatus} from "../model/enums/GameStatus";

export default class DrawService {

    public static draw(state: StateStructure["game"]) {
        state.timerStatus = GameStatus.FINISHED;
        state.status = GameStatus.FINISHED;
        state.winner = "Draw!";
        let roomDbDTO = new RoomDbDTO(state.roomId, "Draw!", state.player1Name, state.player2Name);
        SaveMoveService.saveTODb(roomDbDTO, state)
        let finishPopup = document.getElementById("finish-popup") as HTMLElement;
        finishPopup.classList.remove("invisible")
    }
}


