import * as React from 'react'
import ChessBoard from './ChessBoard';
import PlayerInformation from './PlayerInformation';
import SocketIo from "../../socket.io.client";
import {RootState, useAppDispatch} from "../../store/store";
import {onlineMove} from "../../store/slices/board/boardSlice";
import { useSelector } from "react-redux";
import GameUpdate from "../../model/GameUpdate";
import {PlayerColor} from "../../model/enums/PlayerColor";

const GamePage = () => {

    const dispatch = useAppDispatch();
    const {player2Name} = useSelector((state: RootState) => state.game);
    const {player1Name} = useSelector((state: RootState) => state.game);

    const updateBoard = (move: GameUpdate) => {
        dispatch(onlineMove({
            row: move.row,
            col: move.col,
            chosenCol: move.chosenCol,
            chosenRow: move.chosenRow,
            color: move.color
        }))
    }

    SocketIo.on('game-update', updateBoard);

    return (
        <section id="game-page">
            <div className="page-wrapper">
                <PlayerInformation color={PlayerColor.BLACK} shortName={player1Name.charAt(0)}/>
                <ChessBoard/>
                <PlayerInformation color={PlayerColor.WHITE} shortName={player2Name.charAt(0)}/>
            </div>
        </section>
    );
}


export default GamePage
