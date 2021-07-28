import * as React from "react";
import {changeRenamedPlayer} from "../store/slices/board/boardSlice";
import {RootState, useAppDispatch} from "../store/store";
import {useSelector} from "react-redux";
import {PlayerColor} from "../model/enums/PlayerColor";


type AppProps = {
    id: string,
    color: string
};
export const PlayerFullName = (props: AppProps) => {
    const dispatch = useAppDispatch();
    const {player1Name} = useSelector((state: RootState) => state.game);
    const {player2Name} = useSelector((state: RootState) => state.game);
    let fullName = "";
    if (props.color === PlayerColor.BLACK) {
        fullName = player1Name;
    } else {
        fullName = player2Name;
    }

    const renamePlayer = function () {
        const renameDiv = document.getElementById("renamePlayerDiv");
        renameDiv?.classList.remove("invisible");
        dispatch(changeRenamedPlayer({"player": props.color}))
    }

    return (
        <div className="player-name" id={props.id} onClick={() => renamePlayer()}>{fullName}</div>
    );
};
