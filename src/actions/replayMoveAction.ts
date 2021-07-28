import {StateStructure} from "../types/StateStructure";
import ChangePlayersService from "../services/ChangePlayersService";
import MoveDbDTO from "../model/MoveDbDTO";
import {GameStatus} from "../model/enums/GameStatus";
import {PlayerColor} from "../model/enums/PlayerColor";
import {GameType} from "../model/enums/GameType";

type replayMoveActionType = {
    payload: { 
        nextMove: MoveDbDTO 
    }; 
    type: string;
}
const replayMoveAction = function (state: StateStructure["game"], action: replayMoveActionType) {
    let move = action.payload.nextMove;
    let moveParts = move.move.split(" ");
    if (moveParts[0] === "rm") {
        if (action.payload.nextMove.color === PlayerColor.WHITE) {
            state.whiteMoves.push({
                step: "rm " + state.board[moveParts[1][0]][moveParts[1][2]],
                piece: state.board[moveParts[1][0]][moveParts[1][2]].split("-")[1],
                time: move.time
            });
            state.board[moveParts[1][0]][moveParts[1][2]] = ""
        } else {
            let piece = state.board[7 - Number(moveParts[1][0])][7 - Number(moveParts[1][2])];
            state.blackMoves.push({
                step: "rm " + piece,
                piece: piece.split("-")[1],
                time: move.time
            });
            state.board[7 - Number(moveParts[1][0])][7 - Number(moveParts[1][2])] = ""
        }
    } else {
        let curMove = moveParts[0];
        let originalPosition = curMove.split("-")[0];
        let targetPosition = curMove.split("-")[1];
        let sourceCol = originalPosition[0].charCodeAt(0) - "a".charCodeAt(0)
        let sourceRow = 7 - Number(originalPosition[1]) + 1
        let targetCol = targetPosition[0].charCodeAt(0) - "a".charCodeAt(0)
        let targetRow = 7 - Number(targetPosition[1]) + 1
        if (move.color === PlayerColor.WHITE) {
            state.whiteMoves.push({
                step: curMove,
                piece: state.board[sourceRow][sourceCol].split("-")[1],
                time: move.time
            });
        } else {
            state.blackMoves.push({
                step: curMove,
                piece: state.board[sourceRow][sourceCol].split("-")[1],
                time: move.time
            });
        }
        let piece = state.board[sourceRow][sourceCol]
        state.board[sourceRow][sourceCol] = "";
        state.board[targetRow][targetCol] = piece;
        ChangePlayersService.changeActivePlayerImg();
        let curSteps = document.querySelectorAll(".step")
        if (state.replayRoom?.steps === curSteps.length) {
            state.type = GameType.OFFLINE;
            state.status = GameStatus.PENDING
            state.timerStatus = GameStatus.PENDING
            state.replayTimerSpeed = 1
        }
    }
}

export default replayMoveAction
