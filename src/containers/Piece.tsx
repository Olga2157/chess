import * as React from "react";

type AppProps = {
    pieceColor: string,
    pieceName: string
};
export const Piece = (props : AppProps) => {

  return (
      <div className="piece-wrapper">
        <img src={`../img/piece/${props.pieceColor}/${props.pieceName}.png`} alt={""}/>
      </div>
  );
};
