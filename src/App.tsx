import React from 'react';
import './App.css';
import GamePage from './components/GamePage/GamePage';
import StartPage from './components/startPage/StartPage';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Header from './components/shared/Header';
import HeaderGamePage from './components/GamePage/HeaderGamePage';
import Footer from './components/shared/Footer';
import OnlinePage from './components/OnlineGame/OnlinePage';
import AIPage from "./components/AIPage/AIPage";
import HeaderReplayPage from './components/replayPage/HeaderReplayPage';
import ReplaysPage from './components/replayPage/ReplaysPage';
import HeaderReplaysPage from "./components/replayPage/HeaderReplaysPage";
import {PlayerColor} from "./model/enums/PlayerColor";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Header/>
                        <StartPage/>
                        <Footer/>
                    </Route>
                    <Route path="/online">
                        <Header/>
                        <OnlinePage color={PlayerColor.WHITE}/>
                        <Footer/>
                    </Route>
                    <Route path="/ai">
                        <Header/>
                        <AIPage color={PlayerColor.WHITE}/>
                        <Footer/>
                    </Route>
                    <Route path="/game">
                        <HeaderGamePage/>
                        <GamePage/>
                        <Footer/>
                    </Route>
                    <Route path="/replays">
                        <HeaderReplaysPage/>
                        <ReplaysPage/>
                        <Footer/>
                    </Route>
                    <Route path="/replay">
                        <HeaderReplayPage/>
                        <GamePage/>
                        <Footer/>
                    </Route>
                </Switch>
                <Redirect to="/"/>
            </Router>
        );
    }
}

export default App;
