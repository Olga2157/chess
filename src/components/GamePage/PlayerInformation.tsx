import * as React from 'react'
import WinnerImg from './WinnerImg';
import ActivePlayerImg from './ActivePlayerImg';
import PlayerShortName from '../PlayerShortName';
import GameSteps from '../../containers/GameSteps';
import {PlayerFullName} from '../../containers/PlayerFullName';
import {PlayerColor} from "../../model/enums/PlayerColor";

type PlayerInformationProps = {
    color: string,
    shortName: string
}
type PlayerInformationState = {}

class PlayerInformation extends React.Component<PlayerInformationProps, PlayerInformationState> {

    render() {
        const isActive = (this.props.color === PlayerColor.WHITE);
        return (

            <div className={"player-information " + this.props.color}>
                <WinnerImg/>
                <ActivePlayerImg isActive={isActive}/>
                <PlayerShortName id={this.props.color + "-player-short-name"} shortName={this.props.shortName}/>
                <PlayerFullName id={this.props.color + "-player-full-name"} color={this.props.color}/>
                <GameSteps color={this.props.color}/>
            </div>

        );
    }
}

export default PlayerInformation
