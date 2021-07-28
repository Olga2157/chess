import * as React from 'react'
import NotationNumbers from "./NotationNumbers";
import NotationLetters from "./NotationLetters";
import Board from "../../containers/Board";

const ChessBoard: React.FC<{}> = props => {

    return (
        <div className="chess-board">
            <div className="board-elements">
                <div className="board-elements-vertical">
                    <NotationNumbers />
                    <Board />
                </div>
                <NotationLetters />
            </div>
        </div>

    );
}

export default ChessBoard
