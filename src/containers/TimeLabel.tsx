import * as React from "react";
import {startTimer} from "../store/slices/board/boardSlice";
import store, {useAppDispatch} from "../store/store";
import {GameStatus} from "../model/enums/GameStatus";

export const TimeLabel = () => {

    const dispatch = useAppDispatch();
    const defaultTimerTime = 1000;
    let totalSeconds = 0;
    let timeInterval;

    store.subscribe(() => {
        if (store.getState().game.timerStatus !== GameStatus.STARTED && store.getState().game.status === GameStatus.STARTED) {
            timeInterval = setInterval(incrementTime.bind(this), defaultTimerTime);
            dispatch(startTimer({}))
        } else if (timeInterval && store.getState().game.timerStatus !== GameStatus.STARTED) {
            clearInterval(timeInterval);
            totalSeconds = 0;
        }
    })

    function incrementTime() {
        totalSeconds++;
        const minutesLabel = document.getElementById("minutes");
        const secondsLabel = document.getElementById("seconds");
        if (minutesLabel !== null) {
            const currentMinute = Math.floor(totalSeconds / 60);
            minutesLabel.textContent = String(currentMinute).padStart(2, '0');
        }
        if (secondsLabel !== null) {
            const currentSecond = Number(totalSeconds % 60);
            secondsLabel.textContent = String(currentSecond).padStart(2, '0');
        }
    }

    return (
        <div className="time">
            <p id="round-time">Round time: <b id="minutes">00</b>:<b id="seconds">00</b></p>
        </div>
    );
};
