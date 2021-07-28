import * as React from 'react'
import AppButton from '../shared/AppButton';
import Logo from '../shared/Logo';
import SpeadReplay from './SpeadReplay';
import {ReplayTimeLabel} from "../../containers/ReplayTimeLabel";
import {useAppDispatch} from "../../store/store";
import {useHistory} from "react-router-dom";
import {stopReplay} from "../../store/slices/board/boardSlice";

export const HeaderReplayPage = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const endReplayClick = () => {
        dispatch(stopReplay)
        history.push('/replays');
    }

    const backToLobbyClick = () => {
        dispatch(stopReplay)
        history.push('/');
    }

    return (
        <header>
            <Logo/>
            <nav className="navigation-buttons">
                <ReplayTimeLabel/>
                <SpeadReplay/>
                <AppButton buttonId="end-replay" buttonText="END REPLAY" listener={endReplayClick}/>
                <AppButton buttonId="back-to-lobby" buttonText="TO LOBBY" listener={backToLobbyClick}/>
            </nav>
        </header>
    );
}

export default HeaderReplayPage
