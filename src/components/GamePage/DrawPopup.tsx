import * as React from "react";
import AppButton from "../shared/AppButton";
import Heading from "../shared/Heading";
import DrawImg from "./DrawImg";
import {useAppDispatch} from "../../store/store";
import {startReplayCur} from "../../store/slices/board/boardSlice";
import {useHistory} from "react-router-dom";

const DrawPopup = () => {

    const dispatch = useAppDispatch();
    const history = useHistory();

    const viewReplay = () => {
        let drawPopup = document.getElementById("draw-popup") as HTMLElement;
        drawPopup.classList.add("invisible")
        dispatch(startReplayCur({}))
        history.push('/replay');
    }

    return (
        <div className="draw-popup-container invisible" id="draw-popup" z-index="2">
            <Heading headingClass='' headingText="The draw!"/>
            <DrawImg/>
            <div>
                <AppButton buttonId="to-lobby-after-draw" buttonText="Back to Lobby" path="/"/>
                <AppButton buttonId="view-replay-after-draw" buttonText="View replay" listener={viewReplay}/>
            </div>
        </div>
    );

}

export default DrawPopup
