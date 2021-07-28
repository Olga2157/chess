import Row from "../components/GamePage/Row";
import * as React from "react";
import FinishPopup from "../components/GamePage/FinishPopup";
import DrawPopup from "../components/GamePage/DrawPopup";
import OfferDrawPopup from "../components/GamePage/OfferDrawPopup";
import HandicapPopup from "../components/GamePage/HandicapPopup";

const Board = () => {

    let rows : JSX.Element[]= [] ;
    for (let i = 0; i < 8; i++) {
        rows.push(<Row row={i}/>);
    }

    return <div className="board">
        <div className="content">
            <table id="table">
                <tbody>
                {rows}
                </tbody>
            </table>
            <FinishPopup/>
            <OfferDrawPopup/>
            <DrawPopup/>
            <HandicapPopup/>
        </div>
    </div>;
};

export default Board;
