import * as React from 'react'

type NoPlayerProps = {
  color: string
}
type NoPlayerState = {
}
class NoPlayer extends React.Component<NoPlayerProps, NoPlayerState> {

  private readonly imgSrc = "img/player.png";

  render() {

    return (
      <div className="no-player">
            <div className="player-short-name" id={`${this.props.color}-player-no`}>
              <img src={this.imgSrc} alt={""}/>
            </div>
          </div>
    );
  }
}

export default NoPlayer
