import * as React from "react";
import {useSelector} from "react-redux";
import {choosePiece, movePiece} from "../store/slices/board/boardSlice";
import store, {RootState, useAppDispatch} from "../store/store";
import {Piece} from "./Piece";
import {GameType} from "../model/enums/GameType";

type SquareProps = {
    classColor: string,
    row: number,
    col: number
};

const Square = (properties: SquareProps) => {

    const {board} = useSelector((state: RootState) => state.game);
    const {possibleMoves} = useSelector((state: RootState) => state.game);
    const {chosenPiece} = useSelector((state: RootState) => state.game);
    const {activePlayer} = useSelector((state: RootState) => state.game);
    const {type} = useSelector((state: RootState) => state.game);
    const dispatch = useAppDispatch();

    store.subscribe(() => {
            let squares = document.querySelectorAll("td");
            if (squares.length > 0) {
                if (store.getState().game.board[row][col].endsWith("-check")) {
                    squares[row * 8 + col].classList.add("check-square");
                } else {
                    squares[row * 8 + col].classList.remove("check-square");
                }
                if (store.getState().game.board[row][col].endsWith("-attack_king")) {
                    squares[row * 8 + col].classList.add("check");
                } else {
                    squares[row * 8 + col].classList.remove("check");
                }
                if (store.getState().game.board[row][col].endsWith("-attack_king_checkmate")) {
                    squares[row * 8 + col].classList.add("checkmate");
                } else {
                    squares[row * 8 + col].classList.remove("checkmate");
                }
                if (store.getState().game.board[row][col].endsWith("-checkmate")) {
                    squares[row * 8 + col].classList.add("checkmate-square");
                } else {
                    squares[row * 8 + col].classList.remove("checkmate-square");
                }
            }
        }
    )

    const onCLickHandler = (e: React.FormEvent<EventTarget>) => {
        if (type === GameType.REPLAY) {
            return;
        }
        const pieceColor = board[row][col]?.split("-")[0]
        let targetElement = e.target as HTMLElement;
        let tdElement = targetElement;
        if (!targetElement.classList.contains("w") && !targetElement.classList.contains("b")) {
            tdElement = targetElement.parentElement?.parentElement as HTMLElement;
        }
        let correctPossibleMove = false;
        if (chosenPiece.row !== -1) {
            if (possibleMoves[chosenPiece.row][chosenPiece.col][0] && possibleMoves[chosenPiece.row][chosenPiece.col][0].includes(row)
                && possibleMoves[chosenPiece.row][chosenPiece.col][1].includes(col)) {
                correctPossibleMove = true;
            }
        }
        if (correctPossibleMove) {
            dispatch(movePiece({row: row, col: col}))
            // delete all color backlights
            let squares = document.querySelectorAll("td");
            cleanColorBacklights(squares);
            if (type === GameType.OFFLINE) {
                const board = document.querySelector(".board");
                board?.classList.add("board-animation");
                setTimeout(() => board?.classList.remove("board-animation"), 1000);
            }
        } else if (pieceColor === activePlayer && !tdElement?.classList.contains("currentPiece") && board[properties.row][properties.col]) {
            let squares = document.querySelectorAll("td");
            cleanColorBacklights(squares);
            tdElement.classList.add("currentPiece")
            if (possibleMoves[row][col][0]) {
                for (let i = 0; i < possibleMoves[row][col][0].length; i++) {
                    squares[possibleMoves[row][col][0][i] * 8 + possibleMoves[row][col][1][i]].classList.add("possibleStep");
                }
            }
            dispatch(choosePiece({row: row, col: col}))
        }
    };


    function cleanColorBacklights(squares: NodeListOf<HTMLTableDataCellElement>) {
        squares.forEach(square => {
            square.classList.remove("currentPiece");
            square.classList.remove("possibleStep");
        });
    }

    let row = properties.row;
    let col = properties.col;
    if (board[row] && board[row][col]) {
        const piece = board[row][col]
        const pieceParts = piece?.split("-")
        return (
            <td className={properties.classColor} onClick={onCLickHandler}>
                <Piece pieceColor={pieceParts![0]} pieceName={pieceParts![1]}/>
            </td>
        );
    } else {
        return (
            <td className={properties.classColor} onClick={onCLickHandler}>
            </td>
        );
    }
}

export default Square

