export default class RoomDbDTO {
    roomId: string;
    status: string;
    player1: string;
    player2: string;

    constructor(roomId: string, status: string, player1: string, player2: string) {
        this.roomId = roomId;
        this.status = status;
        this.player1 = player1;
        this.player2 = player2;
    }
}
