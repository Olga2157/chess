import * as React from 'react'

const WinnerImg: React.FC<{}> = props => {

    const imgSrc = "img/winner.png";
    return (
        <div className="img-wrapper winnerImage invisible">
            <img src={imgSrc} alt={""} />
        </div>
    );
}

export default WinnerImg
