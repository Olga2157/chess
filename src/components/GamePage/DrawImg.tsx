import * as React from 'react'

const DrawImg: React.FC<{}> = props => {

    const imgSrc = "img/hands.png";

        return (
            <div className="img-wrapper">
                <img src={imgSrc} alt={""}/>
            </div>
        );
}

export default DrawImg
