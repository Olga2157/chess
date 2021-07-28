import {useAppDispatch} from "../store/store";
import Heading from '../components/shared/Heading';
import {changePlayerName, changeRenamedPlayer} from "../store/slices/board/boardSlice";

const RenamePlayer = () => {
    const dispatch = useAppDispatch();

    const changePlayersName = function () {
        const playerName = document.getElementById("player-name") as HTMLInputElement;
        const newName = playerName?.value;
        if (newName) {
            dispatch(changePlayerName({"newName": newName}))
        }
        closePopup();
    }

    const cancel = function () {
        dispatch(changeRenamedPlayer({"player": ""}))
        closePopup();
    }

    function closePopup() {
        const renamePlayerDiv = document.getElementById("renamePlayerDiv");
        renamePlayerDiv?.classList.add("invisible");
        const nameInput = document.getElementById("player-name") as HTMLInputElement;
        nameInput.value = "";
    }

    return <div className="changing-players-name invisible" id="renamePlayerDiv">
        <Heading headingClass="" headingText="Rename Player"/>
        <div className="change-name">
            <input type="text" placeholder="Enter New Name" id="player-name" className="form-input" maxLength={10}/>
            <input id="rename" type="submit" className="form-submit" value="change"
                   onClick={() => changePlayersName()}/>
            <input id="cancel" type="submit" className="form-submit" value="cancel" onClick={() => cancel()}/>
        </div>
    </div>
};

export default RenamePlayer;


