import * as React from 'react'
import AppButton from '../shared/AppButton';
import {TimeLabel} from '../../containers/TimeLabel';
import Logo from '../shared/Logo';
import {RootState, useAppDispatch} from "../../store/store";
import {admitLoss, offerDraw} from "../../store/slices/board/boardSlice";
import {useSelector} from "react-redux";
import {GameType} from "../../model/enums/GameType";


export const HeaderGamePage = () => {

    const dispatch = useAppDispatch();
    const {type} = useSelector((state: RootState) => state.game);

    const admitLossClick = function() {
        let finishPopup = document.getElementById("finish-popup") as HTMLElement;
        finishPopup.classList.remove("invisible")
        dispatch(admitLoss({}));
    }

    const offerDrawClick = function() {
        if (type === GameType.ONLINE) {
            dispatch(offerDraw({}))
        } else {
            let offerDrawPopup = document.getElementById("offer-draw-popup") as HTMLElement;
            offerDrawPopup.classList.remove("invisible")
        }
    }

    const offerGiveHadicap = function() {
        let handicapPopup = document.getElementById("handicap-popup") as Element;
        handicapPopup.classList.remove("invisible");
    }

    return (
        <header>
            <Logo/>
            <nav className="navigation-buttons">
                <TimeLabel/>
                <AppButton buttonId="admit-loss" buttonText="ADMIT LOSS" listener={admitLossClick}/>
                <AppButton buttonId="offer-the-draw" buttonText="Offer the draw" listener={offerDrawClick}/>
                <AppButton buttonId="give-handicap" buttonText="Give a handicap" listener={offerGiveHadicap}/>
            </nav>
        </header>
    );
}

export default HeaderGamePage
