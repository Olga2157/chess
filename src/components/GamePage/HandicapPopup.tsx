import * as React from "react";
import AppButton from "../shared/AppButton";
import Heading from "../shared/Heading";
import {useAppDispatch} from "../../store/store";
import {giveHandicap} from "../../store/slices/board/boardSlice";

const HandicapPopup = () => {

    const dispatch = useAppDispatch();

    const giveHandicapClick = function (e: React.FormEvent<EventTarget>) {
        let button = e.target as HTMLButtonElement
        dispatch(giveHandicap({"piece" : button.id.split("-")[2]}))
    }

    const closePopup = function () {
        let popup = document.getElementById("handicap-popup") as Element;
        popup.classList.add("invisible")
    }

    return (
        <div className="handicap-popup-container invisible" id="handicap-popup" z-index="2">
            <Heading headingClass='' headingText="Handicap?"/>
            <p>Would you like to give your opponent a handicap?</p>
            <div>
                <AppButton buttonId="give-handicap-pawn" buttonText="Yes, pawn" listener={giveHandicapClick}/>
                <AppButton buttonId="give-handicap-bishop" buttonText="Yes, bishop" listener={giveHandicapClick}/>
                <AppButton buttonId="give-handicap-knight" buttonText="Yes, knight" listener={giveHandicapClick}/>
                <AppButton buttonId="give-handicap-rook" buttonText="Yes, rook" listener={giveHandicapClick}/>
                <AppButton buttonId="give-handicap-queen" buttonText="Yes, queen" listener={giveHandicapClick}/>
                <AppButton buttonId="without-handicap" buttonText="No" listener={closePopup}/>
            </div>
        </div>
    );
}

export default HandicapPopup
