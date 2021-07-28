import * as React from 'react'

const WinImg: React.FC<{}> = props => {

  const imgSrc = "img/win.png";

  return (
    <div className="img-wrapper">
      <img src={imgSrc} alt={""} />
    </div>
  );
}

export default WinImg
