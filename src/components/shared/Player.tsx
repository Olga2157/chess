import * as React from 'react'
import {PlayerFullName} from '../../containers/PlayerFullName';
import NoPlayer from '../startPage/NoPlayer';
import PlayerShortName from "../PlayerShortName";

type PlayerProps = {
    color: string;
    playerFullName: string
}
export const Player = (props: PlayerProps) => {

    return (
        <div className={"player-information " + props.color}>
            <NoPlayer color={props.color}/>
            <PlayerShortName id={props.color + "-player-short-name"} shortName={props.playerFullName.charAt(0)} invisible={true}/>
            <PlayerFullName id={props.color + "-player-full-name"} color={props.color}/>
        </div>
    );
}

export default Player
