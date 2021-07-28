import * as React from 'react'
import {PlayerFullName} from '../../containers/PlayerFullName';
import RenamePlayer from '../../containers/RenamePlayer';
import AppButton from '../shared/AppButton';
import {resetBoard, startBotGame} from "../../store/slices/board/boardSlice";
import {useAppDispatch} from "../../store/store";
import Heading from '../shared/Heading';
import {useHistory} from "react-router-dom";
import {PlayerColor} from "../../model/enums/PlayerColor";

type AIPageProps = { color: string; }

const AIPage = (properties: AIPageProps) => {

    const dispatch = useAppDispatch();
    const history = useHistory();

    dispatch(resetBoard({}))

    const createGame = () => {
        window.onpopstate = function (event) {
            history.go(1);
        };
        history.push('/game');
        let chosenColorButton = document.querySelector("#choose-color-div .active-color") as HTMLButtonElement
        let color: PlayerColor;
        let chosenColor = chosenColorButton.id.split("-")[1];
        if (chosenColor !== PlayerColor.WHITE && chosenColor !== PlayerColor.BLACK) {
            color = Math.random() < 0.5 ? PlayerColor.WHITE : PlayerColor.BLACK;
        } else {
            color = chosenColor;
        }
        dispatch(startBotGame({
            "color": color
        }))
    }

    const changeColorClick = (e: React.FormEvent<EventTarget>) => {
        document.querySelectorAll("#choose-color-div .active-color").forEach((el: Element) => {
            el.classList.remove("active-color");
        })
        let clickedButton = e.target as HTMLButtonElement;
        clickedButton.classList.add("active-color")
    }

    return (
        <section id="online-page">
            <div className="page-wrapper">
                <div className="online-game-manage-wrapper">
                    <PlayerFullName id={properties.color + "-player-full-name"} color={properties.color}/>
                    <RenamePlayer/>
                    
                    <div className="changing-color" id="choose-color-div">
                        <Heading headingClass="" headingText="Choose color"/>
                        <div className="change-color">
                            <AppButton buttonId="ai-black-color" buttonText={PlayerColor.BLACK} listener={changeColorClick}
                                       class={"active-color"}/>
                            <AppButton buttonId="ai-white-color" buttonText={PlayerColor.WHITE} listener={changeColorClick}/>
                            <AppButton buttonId="ai-random-color" buttonText="Random" listener={changeColorClick}/>
                        </div>
                    </div>
                    <button id="start-ai-game" onClick={createGame}>Start game</button>
                    <AppButton buttonId="back" buttonText="Back" path="/"/>
                </div>
                <div className="online-game-details-wrapper">
                    <div id="online-chess-image" className="online-chess-img">
                        <img src="img/chessFigures.png" alt={""}/>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AIPage
