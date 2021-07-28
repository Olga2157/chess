import * as React from "react";
import {replayMove, stopReplay} from "../store/slices/board/boardSlice";
import store, {useAppDispatch} from "../store/store";
import RoomResult from "../model/RoomResult";
import {GameStatus} from "../model/enums/GameStatus";

export const ReplayTimeLabel = () => {

    const dispatch = useAppDispatch();
    let timerTime = 1000;
    let timerSpeed = 1;
    let totalSeconds = 0;
    let handledRoomMove = 0;
    let timeInterval = setInterval(incrementTime.bind(this), timerTime);
    let replayRoom: RoomResult | null = store.getState().game.replayRoom;

    store.subscribe(() => {
        if (timeInterval && store.getState().game.timerStatus !== GameStatus.STARTED) {
            clearInterval(timeInterval);
            totalSeconds = 0;
        }
        if (timerSpeed !== store.getState().game.replayTimerSpeed) {
            timerSpeed = store.getState().game.replayTimerSpeed;
            clearInterval(timeInterval);
            timeInterval = setInterval(incrementTime.bind(this), timerTime / timerSpeed);
        }
        if (replayRoom === null && store.getState().game.replayRoom !== null) {
            replayRoom = store.getState().game.replayRoom;
        }
    })

    function incrementTime() {
        totalSeconds++;
        const minutesLabel = document.getElementById("minutes");
        const secondsLabel = document.getElementById("seconds");
        let oldValue = Number(minutesLabel?.textContent) * 60 + Number(secondsLabel?.textContent)
        if (oldValue > totalSeconds) {
            return;
        }
        let nextMove = replayRoom?.moves[handledRoomMove]
        let curSteps = document.querySelectorAll(".step")
        if (handledRoomMove < curSteps.length) {
            clearInterval(timeInterval);
            return;
        }
        if (minutesLabel !== null) {
            const currentMinute = Math.floor(totalSeconds / 60);
            minutesLabel.textContent = String(currentMinute).padStart(2, '0');
        }
        if (secondsLabel !== null) {
            const currentSecond = Number(totalSeconds % 60);
            secondsLabel.textContent = String(currentSecond).padStart(2, '0');
        }
        if (nextMove) {
            let timeParts = nextMove?.time.split(":");
            let nextTimeSeconds = Number(timeParts[0]) * 60 + Number(timeParts[1])
            while (nextTimeSeconds <= totalSeconds) {
                dispatch(replayMove({"nextMove": nextMove}))
                handledRoomMove++;
                if (replayRoom?.moves[handledRoomMove]) {
                    nextMove = replayRoom?.moves[handledRoomMove];
                    timeParts = nextMove?.time.split(":");
                    nextTimeSeconds = Number(timeParts[0]) * 60 + Number(timeParts[1])
                } else {
                    return;
                }
            }
        } else {
            clearInterval(timeInterval);
            dispatch(stopReplay)
        }

    }

    return (
        <div className="time">
            <p id="round-time">Round time: <b id="minutes">00</b>:<b id="seconds">00</b></p>
        </div>
    );
};
