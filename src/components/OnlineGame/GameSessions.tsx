import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import GameSession from "./GameSession";

export const GameSessions = () => {

    const {sessions} = useSelector((state: RootState) => state.game);
    const {player2Name} = useSelector((state: RootState) => state.game);

    return (
        <div id="game-sessions-id" className="game-sessions-container invisible">
            {sessions.map((session) => <GameSession roomId={session.roomId} playerName={player2Name}
            color={session.player1 ? session.player1.color : ""} user={session.player1}/>)}
        </div>
    );
};
