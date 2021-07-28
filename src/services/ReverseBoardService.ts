import ChangePlayersService from "./ChangePlayersService";
import { reverseChildren } from "../helpers/reverseChildren";
import { getPieceColor } from "../helpers/getPieceColor";

export default class ReverseBoardService {

    // Function to rotate the matrix by 180 degree
    static reverseColumns(arr: string[][]) {
        for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0, k = arr[0].length - 1; j < k; j++, k--) {
                const temp = arr[j][i];
                arr[j][i] = arr[k][i];
                arr[k][i] = temp;
            }
        }
    }

    // Function for transpose of matrix
    static transpose(arr: string[][]) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i; j < arr[0].length; j++) {
                const temp = arr[i][j];
                arr[i][j] = arr[j][i];
                arr[j][i] = temp;
            }
        }
    }

    // Function to anticlockwise rotate matrix by 180 degree
    static rotate180(arr: string[][], changePlayer?: boolean, toColor?: string) {
        if (getPieceColor(arr[7][0]) === toColor) {
            return;
        }
        ReverseBoardService.transpose(arr);
        ReverseBoardService.reverseColumns(arr);
        ReverseBoardService.transpose(arr);
        ReverseBoardService.reverseColumns(arr);
        setTimeout(() => {
            if (changePlayer) {
                ChangePlayersService.changeActivePlayerImg()
            }
            const notationNumbers = document.querySelector(".board-numbers") as HTMLElement;
            const notationLetters = document.querySelector(".board-letters") as HTMLElement;
            reverseChildren(notationNumbers);
            notationNumbers?.classList.add("board-animation");
            setTimeout(() => notationNumbers?.classList.remove("board-animation"), 1000);
            reverseChildren(notationLetters);
            notationLetters?.classList.add("board-animation");
            setTimeout(() => notationLetters?.classList.remove("board-animation"), 1000);
        }, 1000);
    }
}


