import * as React from 'react'
import AppButton from '../shared/AppButton';
import Heading from '../shared/Heading';
import {startOfflineGame} from "../../store/slices/board/boardSlice";
import {useAppDispatch} from "../../store/store";
import {useHistory} from "react-router-dom";

const GameDescription = () => {

    const dispatch = useAppDispatch();
    const history = useHistory();

    const startOfflineGameListener = () => {
        dispatch(startOfflineGame({}));
        setTimeout(history.push("/game"), 500);
    }

    return (
        <div className="game-description">
            <Heading headingClass="" headingText="1. Choose the type of game"/>
            <AppButton buttonId="online-game" buttonText="Online" path="/online"/>
            <AppButton buttonId="offline-game" buttonText="Offline" path=""/>
            <AppButton buttonId="ai" buttonText="AI" path="/ai"/>

            <Heading headingClass="start-description" headingText="2. Start the game"/>
            <AppButton buttonId="start-game" buttonText="Start" listener={startOfflineGameListener}/>

            <Heading headingClass="view-description" headingText="3."/>
            <AppButton buttonId="view-replays" buttonText="View replays" path="/replays"/>
        </div>
    );
}

export default GameDescription
