import * as React from 'react'
import SocketIo from "../../socket.io.client";
import User from "../../model/User";
import {PlayerColor} from "../../model/enums/PlayerColor";

type GameSessionProps = {
    user: User | null,
    roomId: string,
    playerName: string,
    color: string
}
type GameSessionState = {}

class GameSession extends React.Component<GameSessionProps, GameSessionState> {

    public joinGame = () => {
        let oppositeColor = this.props.color === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE
        SocketIo.emit('join-game', {
            "roomId": this.props.roomId,
            "player1" : this.props.user,
            "player2": new User(this.props.playerName, oppositeColor)
        });
    }

    render() {
        return (
            <div className="game-session">
                <h3>Room id : {this.props.roomId}</h3>
                <h3>{this.props.color} player:</h3>
                <h3>{this.props.user?.userName}</h3>
                <button onClick={() => this.joinGame()}>Join</button>
            </div>
        );
    }
}

export default GameSession

