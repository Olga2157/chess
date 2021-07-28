export default class GameMovesStatus {

    constructor(steps: number[][][][], check: boolean, checkMate: boolean, haveMoves: boolean) {
        this.steps = steps;
        this.check = check;
        this.checkMate = checkMate;
        this.haveMoves = haveMoves;
    }

    steps: number[][][][] = [];
    check: boolean = false;
    checkMate: boolean = false;
    haveMoves: boolean = false;
}
