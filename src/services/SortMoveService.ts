import MoveDbDTO from "../model/MoveDbDTO";
import RoomDbDTO from "../model/RoomDbDTO";

export default class SortMoveService {

    public static sortMoves(moves: MoveDbDTO[], room: RoomDbDTO) {
        return moves.filter(move => move.roomId === room.roomId).sort((m1: MoveDbDTO, m2: MoveDbDTO) => {
            function getSeconds(move: MoveDbDTO) {
                let timeParts = move?.time.split(":");
                return Number(timeParts[0]) * 60 + Number(timeParts[1]);
            }

            return getSeconds(m1) - getSeconds(m2);

        })
    }
}
