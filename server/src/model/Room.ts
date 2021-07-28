import User from "./User";

export default class Room {
    player1: User | null;
    player2: User| null;
    roomId: string;

    constructor(roomId: string, player1: User, player2: User) {
        this.roomId = roomId;
        this.player1 = player1;
        this.player2 = player2;
    }
}
