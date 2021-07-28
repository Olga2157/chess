import * as React from "react";
import NotationNumber from "./NotationNumber";

const NotationNumbers: React.FC<{}> = props => {

        let notationNumbers: JSX.Element[] = [];
        for (let i = 8; i > 0; i--) {
            notationNumbers.push(<NotationNumber textValue={i} />);
        }
        return (
            <div className="board-numbers">
                {notationNumbers}
            </div>
        );
}

export default NotationNumbers