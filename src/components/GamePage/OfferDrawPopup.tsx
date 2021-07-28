import * as React from "react";
import AppButton from "../shared/AppButton";
import Heading from "../shared/Heading";
import DrawImg from "./DrawImg";
import {RootState, useAppDispatch} from "../../store/store";
import {draw} from "../../store/slices/board/boardSlice";
import {useSelector} from "react-redux";
import SocketIo from "../../socket.io.client";
import {GameType} from "../../model/enums/GameType";

const OfferDrawPopup = () => {

    const dispatch = useAppDispatch();
    const {type} = useSelector((state: RootState) => state.game);

    const declineDraw = () => {
        let offerDrawPopup = document.getElementById("offer-draw-popup") as HTMLElement;
        offerDrawPopup.classList.add("invisible")
    }

    const agreeDraw = () => {
        dispatch(draw({}))
        if (type === GameType.ONLINE) {
            SocketIo.emit('draw-event', {});
        }
    }
    return (
        <div className="draw-popup-container invisible" id="offer-draw-popup" z-index="2">
            <Heading headingClass='' headingText="The draw?"/>
            <p>Your opponent offers the draw!</p>
            <DrawImg/>
            <div>
                <AppButton buttonId="accept-draw" buttonText="Agree the draw" listener={agreeDraw}/>
                <AppButton buttonId="decline-draw" buttonText="Reject a draw" listener={declineDraw}/>
            </div>
        </div>
    );
}

export default OfferDrawPopup
