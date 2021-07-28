import * as React from "react";
import AppButton from "../shared/AppButton";
import WinImg from "./WinImg";
import Heading from "../shared/Heading";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {useHistory} from "react-router-dom";
import {startReplayCur} from "../../store/slices/board/boardSlice";

export const FinishPopup = () => {

    const { winner } = useSelector((state: RootState) => state.game);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const toHome = (e: React.FormEvent<EventTarget>) => {
        history.push("/")
    }

    const toReplay = () => {
        let finishPopup = document.getElementById("finish-popup") as HTMLElement;
        finishPopup.classList.add("invisible")
        dispatch(startReplayCur({}))
        setTimeout(history.push('/replay'), 500);
    }

    return (
        <div className="finish-popup-container invisible" id="finish-popup" z-index="2">
            <Heading headingClass='' headingText="The End!"/>
            <p>Player <b id="win-name">{winner}</b> is a winner!</p>
            <WinImg/>
            <div>
                <AppButton buttonId="to-lobby" buttonText="Back to Lobby" listener={toHome}/>
                <AppButton buttonId="view-replay" buttonText="View replay" listener={toReplay}/>
            </div>
        </div>
    );

}

export default FinishPopup
