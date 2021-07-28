import { getPieceName } from "../helpers/getPieceName";

export default class CheckService {

    public static deleteAllIncorrectMovesToKingDirection(board: string[][], steps: number[][][][]) {
        let deletedSteps: number[][] = [];
        for (let row = 0; row < steps.length; row++) {
            for (let col = 0; col < steps[0].length; col++) {
                let stepsForCurPiece = steps[row][col];
                if (!stepsForCurPiece[0]) {
                    continue;
                }
                for (let indexStep = 0; indexStep < stepsForCurPiece[0].length; indexStep++) {
                    let stepRow = steps[row][col][0][indexStep];
                    let stepCol = steps[row][col][1][indexStep];
                    if (!stepRow || !stepCol) {
                        continue;
                    }
                    if (getPieceName(board[stepRow][stepCol]) === "king") {
                        stepsForCurPiece[0].splice(indexStep, 1);
                        stepsForCurPiece[1].splice(indexStep, 1);
                        if (!deletedSteps[0]) {
                            deletedSteps[0] = [];
                        }
                        if (!deletedSteps[1]) {
                            deletedSteps[1] = [];
                        }
                        deletedSteps[0].push(row);
                        deletedSteps[1].push(col);
                    }
                }
            }
        }
        return deletedSteps;
    }
}
