import * as React from 'react'
import AppButton from '../shared/AppButton';
import {useHistory} from "react-router-dom";
import {useAppDispatch} from "../../store/store";
import {startReplay} from "../../store/slices/board/boardSlice";

type GameRowProperties = {
    room: string
};

const GameRow = (properties: GameRowProperties) => {
    const history = useHistory();
    const dispatch = useAppDispatch();


    let curRoom = JSON.parse(properties.room)

    const replayClick = () => {
        dispatch(startReplay({"room": properties.room}))
        history.push("/replay")
    }

    return (
        <div className="game-details-div">
            <p className="black-player-replay">{curRoom.player1}</p>
            <p className="vs">VS</p>
            <p className="white-player-replay">{curRoom.player2}</p>
            <p className="status">{curRoom.status}</p>
            <p className="steps">{curRoom.steps}</p>
            <p className="game-time">{curRoom.time}</p>
            <div className="replay-management">
                <AppButton buttonId="" buttonText="watch" listener={replayClick}/>
            </div>
        </div>

    );
}

export default GameRow
