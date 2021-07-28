import MoveDbDTO from "./MoveDbDTO";

export default class RoomResult {
    roomId: string;
    status: string;
    player1: string;
    player2: string;
    steps: number;
    time: string;
    moves: MoveDbDTO[]

    constructor(roomId: string, status: string, player1: string, player2: string, steps: number, time: string, moves: MoveDbDTO[]) {
        this.roomId = roomId;
        this.status = status;
        this.player1 = player1;
        this.player2 = player2;
        this.steps = steps;
        this.time = time;
        this.moves = moves;
    }
}
