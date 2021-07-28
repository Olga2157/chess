import * as React from 'react'

type PlayerShortNameProps = {
    id: string,
    shortName: string,
    invisible?: boolean
}
type PlayerShortNameState = {}

class PlayerShortName extends React.Component<PlayerShortNameProps, PlayerShortNameState> {

    render() {
        if (this.props.invisible) {
            return (
                <div className="player invisible">
                    <div className="player-short-name" id={this.props.id}>{this.props.shortName}</div>
                </div>
            );
        } else {
            return (
                <div className="player">
                    <div className="player-short-name" id={this.props.id}>{this.props.shortName}</div>
                </div>
            );
        }
    }
}

export default PlayerShortName
