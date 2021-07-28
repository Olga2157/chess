import * as React from 'react'


type GameStepProps = {
    color: string,
    piece: string,
    step: string,
    time: string
}
type GameStepState = {}

class GameStep extends React.Component<GameStepProps, GameStepState> {

    render() {

        return (
            <div className="step">
                <div className="piece-step-wrapper">
                    <img src={"img/piece/" + this.props.color + "/" + this.props.piece + ".png"} alt={""}/>
                </div>
                <div className="step-text">
                    {this.props.step}
                </div>
                <div className="step-time">
                    | {this.props.time}
                </div>
            </div>
        );
    }
}

export default GameStep
