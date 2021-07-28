import {StateStructure} from "../types/StateStructure";
import ReverseBoardService from "../services/ReverseBoardService";
import {RandomMoveService} from "../services/RandomMoveService";
import {GameStatus} from "../model/enums/GameStatus";
import {PlayerColor} from "../model/enums/PlayerColor";
import {GameType} from "../model/enums/GameType";
import {PossibleMovesService} from "../services/PossibleMovesService";
import { Castling } from "../types/Castling";

type startBotGameActionType = {
    payload: { 
        color: PlayerColor 
    }; 
    type: string 
}
const startBotGameAction = function (state: StateStructure["game"], action: startBotGameActionType, initialBoard: string[][], initialCastling: Castling) {
    state.activePlayer = action.payload.color;
    state.whiteMoves = [];
    state.blackMoves = [];
    if (state.activePlayer === PlayerColor.BLACK && state.status !== GameStatus.STARTED) {
        state.player2Name = "Computer"
        let move = RandomMoveService.chooseFirstWhiteMove();
        let moveSourceRow = move[0], moveSourceCol = move[1], moveTargetRow = move[2], moveTargetCol = move[3];
        let sourceCol = String.fromCharCode("h".charCodeAt(0) - moveSourceCol + 1)
        let targetCol = String.fromCharCode("h".charCodeAt(0) - moveTargetCol + 1)
        state.whiteMoves.push({
            step: sourceCol + (moveSourceRow + 1) + "-" + targetCol + (moveTargetRow + 1),
            piece: state.board[moveSourceRow][moveSourceCol].split("-")[1],
            time: "00:00"
        });
        const piece = state.board[7 - moveSourceRow][7 - moveSourceCol + 1]
        state.board[7 - moveSourceRow][7 - moveSourceCol + 1] = "";
        state.board[7 - moveTargetRow][7 - moveTargetCol + 1] = piece;
        ReverseBoardService.rotate180(state.board, true)
        state.possibleMoves = PossibleMovesService.getSteps(initialBoard, initialCastling, PlayerColor.BLACK).steps;
        state.handicapPieces = [];
        state.type = GameType.AI
        state.roomId = Math.random().toString(36).substring(7);
        state.status = GameStatus.STARTED
    } else {
        state.player1Name = "Computer"
        state.status = GameStatus.STARTED
        state.possibleMoves = PossibleMovesService.getSteps(initialBoard, initialCastling, PlayerColor.WHITE).steps;
        state.handicapPieces = [];
        state.type = GameType.AI
        state.roomId = Math.random().toString(36).substring(7);
        state.status = GameStatus.STARTED
    }

}

export default startBotGameAction
