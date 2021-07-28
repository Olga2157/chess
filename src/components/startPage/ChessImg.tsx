import * as React from 'react'

const ChessImg : React.FC<{}> = props => {

    const imgSrc = "img/chess.png";

    return (
      <div className="chess-img">
            <img src={imgSrc} alt={""}/>
        </div>
    );
}

export default ChessImg