export default class MoveDbDTO {
    roomId: string;
    move: string;
    color: string;
    time: string;

    constructor(roomId: string, move: string, color: string, time: string) {
        this.roomId = roomId;
        this.move = move;
        this.color = color;
        this.time = time;
    }
}
