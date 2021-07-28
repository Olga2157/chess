import * as React from 'react'
import NotationLetter from "./NotationLetter";

const NotationLetters: React.FC<{}> = props => {

    let notationLetters: JSX.Element[] = [];
    for (let i = 0; i < 8; i++) {
        notationLetters.push(<NotationLetter textValue={String.fromCharCode("A".charCodeAt(0) + i)} />);
    }
    return (
        <div className="board-letters">
            {notationLetters}
        </div>
    );
}

export default NotationLetters
