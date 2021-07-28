import * as React from 'react'
import GameStep from '../components/GamePage/GameStep';
import {RootState} from '../store/store';
import {useSelector} from "react-redux";
import {PlayerColor} from "../model/enums/PlayerColor";

type GameStepsProps = {
    color: string
}
export const GameSteps = (props: GameStepsProps) => {
    const {whiteMoves} = useSelector((state: RootState) => state.game);
    const {blackMoves} = useSelector((state: RootState) => state.game);

    const moves = (props.color === PlayerColor.WHITE) ? whiteMoves : blackMoves;

    return (
        <div className="game-steps" id={"game-steps" + props.color}>
            {moves.map((move) => <GameStep key={move.time + Math.random()} color={props.color} piece={move.piece}
                                           step={move.step}
                                           time={move.time}/>)}
        </div>
    );
}

export default GameSteps
