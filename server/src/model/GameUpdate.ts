export default class GameUpdate {
    row: number;
    col: number;
    chosenCol: number;
    chosenRow: number;
    color: string;

    constructor(roomId: string, row: number, col: number, chosenRow: number, chosenCol: number, color: string) {
        this.row = row;
        this.col = col;
        this.chosenRow = chosenRow;
        this.chosenCol = chosenCol;
        this.color = color;
    }
}
