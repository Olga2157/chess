import * as React from 'react'
import {PlayerFullName} from '../../containers/PlayerFullName';
import RenamePlayer from '../../containers/RenamePlayer';
import AppButton from '../shared/AppButton';
import Loader from './Loader';
import SocketIo from "../../socket.io.client";
import {
    admitLoss,
    chooseColorForOnlineGame, draw, onGiveHandicap,
    startOnlineGame,
    updateGameSessions,
    resetBoard
} from "../../store/slices/board/boardSlice";
import Room from "../../model/Room";
import store, {RootState, useAppDispatch} from "../../store/store";
import {GameSessions} from "./GameSessions";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import Heading from '../shared/Heading';
import HandicapPieceCoordinates from "../../model/HandicapPieceCoordinates";
import {GameStatus} from "../../model/enums/GameStatus";
import {PlayerColor} from "../../model/enums/PlayerColor";

type OnlinePageProps = { color: string; }

const OnlinePage = (properties: OnlinePageProps) => {

    const {curOnlinePlayer} = useSelector((state: RootState) => state.game);
    const {player2Name} = useSelector((state: RootState) => state.game);
    const {status} = useSelector((state: RootState) => state.game);
    const dispatch = useAppDispatch();
    const history = useHistory();
    let curPlayer = curOnlinePlayer;
    let gameStatus = GameStatus.NO

    dispatch(resetBoard({}))

    store.subscribe(() => {
        if (store.getState().game.curOnlinePlayer !== curPlayer) {
            curPlayer = store.getState().game.curOnlinePlayer
        }
        if (store.getState().game.status !== gameStatus) {
            gameStatus = store.getState().game.status;
        }
    })

    function addJoinListener() {
        SocketIo.on("join-game", (room: Room) => {
            history.push('/game');

            let player2Color: PlayerColor = room.player2?.color === PlayerColor.WHITE ? PlayerColor.WHITE : PlayerColor.BLACK
            dispatch(startOnlineGame({
                "curPlayer": curPlayer,
                "color": curPlayer !== PlayerColor.NO ? curPlayer : player2Color,
                "room": room
            }))
        })
    }

    const admitLossListener = () => {
        if (status !== GameStatus.FINISHED) {
            let finishPopup = document.getElementById("finish-popup") as HTMLElement;
            finishPopup.classList.remove("invisible")
            dispatch(admitLoss({"anotherPlayer": false}));
        }
    }

    const offerDrawListener = () => {
        if (gameStatus === GameStatus.PENDING) {
            let offerDrawPopup = document.getElementById("offer-draw-popup") as HTMLElement;
            offerDrawPopup.classList.remove("invisible")
        }
    }

    const drawListener = () => {
        dispatch(draw({}))
    }

    const giveHandicapListener = (coordinates: HandicapPieceCoordinates) => {
        dispatch(onGiveHandicap({"coordinates": coordinates}))
    }

    SocketIo.on('admit-loss', admitLossListener);
    SocketIo.on('draw-event', drawListener);
    SocketIo.on('offer-draw', offerDrawListener);
    SocketIo.on('give-handicap', giveHandicapListener);


    const searchGames = () => {
        let onlineChessImg = document.getElementById("online-chess-image");
        onlineChessImg?.classList.add("invisible")
        let waitingPlayer = document.getElementById("waiting-player");
        waitingPlayer?.classList.add("invisible")
        let gameSessions = document.getElementById("game-sessions-id")
        gameSessions?.classList.remove("invisible")
        SocketIo.emit('get-rooms', {});
        SocketIo.on("all-rooms", (rooms: Room[]) => {
            dispatch(updateGameSessions({"sessions": rooms}))
        })
        addJoinListener();
    }

    const createGame = () => {
        let chosenColorButton = document.querySelector("#choose-color-div .active-color") as HTMLButtonElement
        let color: PlayerColor;
        let chosenColor = chosenColorButton.id.split("-")[0];
        if (chosenColor !== PlayerColor.WHITE && chosenColor !== PlayerColor.BLACK) {
            color = Math.random() < 0.5 ? PlayerColor.WHITE : PlayerColor.BLACK;
        } else {
            color = chosenColor;
        }
        let gameSeesions = document.getElementById("game-sessions-id");
        gameSeesions?.classList.add("invisible")
        SocketIo.emit('create-game', {
            "userName": player2Name,
            "color": color,
            "roomId": ""
        });
        dispatch(chooseColorForOnlineGame({
            "color": color
        }))
        addJoinListener();
    }

    const createGameClick = () => {
        let chooseColorDiv = document.getElementById("choose-color-div") as HTMLElement;
        if (chooseColorDiv.classList.contains("invisible")) {
            chooseColorDiv.classList.remove("invisible")
            document.querySelectorAll("#choose-color-div .active-color").forEach((el: Element) => {
                el.classList.remove("active-color");
            })
            let blackColorButton = document.getElementById("black-color") as HTMLButtonElement;
            blackColorButton.classList.add("active-color");
        } else {
            chooseColorDiv.classList.add("invisible")
        }
        let searchGameButton = document.getElementById("search-game") as HTMLElement;
        searchGameButton.setAttribute("disabled", "true");
        let backButton = document.getElementById("back") as HTMLElement;
        backButton.setAttribute("disabled", "true");
    }

    const cancelClick = () => {
        let searchGameButton = document.getElementById("search-game") as HTMLElement;
        searchGameButton.removeAttribute("disabled");
        let backButton = document.getElementById("back") as HTMLElement;
        backButton.removeAttribute("disabled");
        let waitingPlayer = document.getElementById("waiting-player");
        waitingPlayer?.classList.add("invisible")
        document.querySelectorAll(".change-color button").forEach((el: Element) => {
            el.removeAttribute("disabled");
        })
        let startButton = document.getElementById("start-online-game") as HTMLElement;
        startButton.removeAttribute("disabled");
        let onlineChessImageDiv = document.getElementById("online-chess-image");
        let chooseColorDiv = document.getElementById("choose-color-div") as HTMLElement;
        chooseColorDiv.classList.add("invisible");
        onlineChessImageDiv?.classList.remove("invisible")
        SocketIo.emit('cancel-game', {});
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
                    
                    <AppButton buttonId="create-game" listener={createGameClick} buttonText="Create Game"/>
                    
                    <div className="changing-color invisible" id="choose-color-div">
                        <Heading headingClass="" headingText="Choose color"/>
                        <div className="change-color">
                            <AppButton buttonId="black-color" buttonText={PlayerColor.BLACK}
                                       listener={changeColorClick}/>
                            <AppButton buttonId="white-color" buttonText={PlayerColor.WHITE}
                                       listener={changeColorClick}/>
                            <AppButton buttonId="random-color" buttonText="Random" listener={changeColorClick}/>
                            <input id="start-online-game" type="submit" className="form-submit" value="start"
                                   onClick={createGame}/>
                            <input id="cancel-chosing-color" type="submit" className="form-submit" value="cancel"
                                   onClick={cancelClick}/>
                        </div>
                    </div>
                    <button id="search-game" onClick={searchGames}>Join</button>
                    <AppButton buttonId="back" buttonText="Back" path="/"/>
                </div>

                <div className="online-game-details-wrapper">
                    <div id="online-chess-image" className="online-chess-img">
                        <img src="img/chessFigures.png" alt={""}/>
                        
                    </div>
                    <div id="waiting-player" className="invisible">
                        <Loader/>
                        <Heading headingClass="" headingText="Waiting for another player"/>
                    </div>

                    <GameSessions/>
                </div>
            </div>

        </section>
    );
}

export default OnlinePage