import RoomDbDTO from "../model/RoomDbDTO";
import {StateStructure} from "../types/StateStructure";
import RoomIndexedDB from "./db/RoomIndexedDB";
import {PieceMove} from "../types/PieceMove";
import MoveDbDTO from "../model/MoveDbDTO";
import MoveIndexedDB from "./db/MoveIndexedDB";
import HandicapPieceCoordinates from "../model/HandicapPieceCoordinates";
import {PlayerColor} from "../model/enums/PlayerColor";
import { Constants } from "../model/Constants";

type gameType = "game";

export default class SaveMoveService {

    public static saveTODb(roomDbDTO: RoomDbDTO, state: StateStructure[gameType]) {
        RoomIndexedDB.putRoom(roomDbDTO)
        state.whiteMoves.forEach((move: PieceMove) => {
                let whiteMove = new MoveDbDTO(state.roomId, move.step, PlayerColor.WHITE, move.time);
                MoveIndexedDB.putMove(whiteMove)
            }
        )
        state.blackMoves.forEach((move: PieceMove) => {
                let blackMove = new MoveDbDTO(state.roomId, move.step, PlayerColor.BLACK, move.time);
                MoveIndexedDB.putMove(blackMove)
            }
        )
        state.handicapPieces.forEach((handicapPiece: HandicapPieceCoordinates) => {
            let moveDbDTO = new MoveDbDTO(state.roomId, "rm " + handicapPiece.row + ":" + handicapPiece.col, handicapPiece.color, handicapPiece.time);
            MoveIndexedDB.putMove(moveDbDTO)
        })
    }
}


