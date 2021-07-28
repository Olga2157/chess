import {StateStructure} from "../types/StateStructure";
import RoomDbDTO from "../model/RoomDbDTO";
import MoveDbDTO from "../model/MoveDbDTO";
import {PieceMove} from "../types/PieceMove";
import HandicapPieceCoordinates from "../model/HandicapPieceCoordinates";
import RoomResult from "../model/RoomResult";
import SortMoveService from "../services/SortMoveService";
import SaveMoveService from "../services/SaveMoveService";
import {GameStatus} from "../model/enums/GameStatus";
import {PlayerColor} from "../model/enums/PlayerColor";
import {GameType} from "../model/enums/GameType";

type startReplayCurActionType = {
    payload: {
    }; 
    type: string
}
const startReplayCurAction = function (state: StateStructure["game"], action: startReplayCurActionType, initialBoard: string[][]) {
    let roomDbDTO = new RoomDbDTO(state.roomId, state.winner + " win", state.player1Name, state.player2Name);
    let moves: MoveDbDTO[] = []
    state.whiteMoves.forEach((move: PieceMove) => {
            let whiteMove = new MoveDbDTO(state.roomId, move.step, PlayerColor.WHITE, move.time);
            moves.push(whiteMove)
        }
    )
    state.blackMoves.forEach((move: PieceMove) => {
            let blackMove = new MoveDbDTO(state.roomId, move.step, PlayerColor.BLACK, move.time);
            moves.push(blackMove)
        }
    )
    state.handicapPieces.forEach((handicapPiece: HandicapPieceCoordinates) => {
        let moveDbDTO = new MoveDbDTO(state.roomId, "rm " + handicapPiece.row + ":" + handicapPiece.col, handicapPiece.color, handicapPiece.time);
        moves.push(moveDbDTO)
    })
    let curRoom;
    if (moves.length > 0) {
        moves = SortMoveService.sortMoves(moves, roomDbDTO);
        curRoom = new RoomResult(roomDbDTO.roomId, roomDbDTO.status, roomDbDTO.player1, roomDbDTO.player2, moves.length, moves[moves.length - 1].time, moves)
    } else {
        curRoom = new RoomResult(roomDbDTO.roomId, roomDbDTO.status, roomDbDTO.player1, roomDbDTO.player2, moves.length, "00:00", moves)
    }
    state.curOnlinePlayer = PlayerColor.NO;
    state.replayRoom = curRoom;
    state.board = initialBoard;
    state.player1Name = curRoom.player1;
    state.player2Name = curRoom.player2;
    state.activePlayer = PlayerColor.WHITE;
    state.whiteMoves = [];
    state.handicapPieces = [];
    state.blackMoves = [];
    state.possibleMoves = [];
    state.type = GameType.REPLAY;
    state.status = GameStatus.STARTED
    state.timerStatus = GameStatus.STARTED
    SaveMoveService.saveTODb(roomDbDTO, state);
}

export default startReplayCurAction
