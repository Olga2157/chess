import * as React from 'react'
import ChessImg from './ChessImg';
import GameDescription from './GameDescription';
import Player from '../shared/Player';
import RenamePlayer from '../../containers/RenamePlayer';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {PlayerColor} from "../../model/enums/PlayerColor";


export const StartPage = () => {
    const {player2Name} = useSelector((state: RootState) => state.game);
    const {player1Name} = useSelector((state: RootState) => state.game);

    return (
        <section id="start-page">
            <GameDescription/>
            <div className="page-wrapper">
                <Player color={PlayerColor.BLACK} playerFullName={player1Name}/>
                <RenamePlayer/>
                <Player color={PlayerColor.WHITE} playerFullName={player2Name}/>
            </div>
            <div className="changing-name-comment">* If you wish to rename player, please press on the current player's
                name
            </div>
            <ChessImg/>
        </section>
    );
}

export default StartPage
