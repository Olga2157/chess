import * as React from 'react'
import AppButton from '../shared/AppButton';
import {useAppDispatch} from "../../store/store";
import {changeSpeed} from "../../store/slices/board/boardSlice";

const SpeadReplay = () => {

    const dispatch = useAppDispatch();

    const changeSpeedClick = (e: React.FormEvent<EventTarget>) => {
        let target = e.target as HTMLElement
        let speed = target.textContent?.charAt(1);
        document.querySelectorAll(".speed-replay .active-color").forEach((el: Element) => {
            el.classList.remove("active-color");
        })
        target.classList.add("active-color")
        dispatch(changeSpeed({"speed" : Number(speed)}))
    }

    return (
        <div className="speed-replay">
            <p>Select replay</p>
            <AppButton buttonId="x1" buttonText="x1" class={"active-color"} listener={changeSpeedClick}/>
            <AppButton buttonId="x2" buttonText="x2" listener={changeSpeedClick}/>
            <AppButton buttonId="x3" buttonText="x3" listener={changeSpeedClick}/>
            <AppButton buttonId="x4" buttonText="x4" listener={changeSpeedClick}/>
        </div>
    );
}

export default SpeadReplay
