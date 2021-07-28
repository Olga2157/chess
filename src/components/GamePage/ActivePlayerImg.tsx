import * as React from 'react'

type ActivePlayerImgProps = {
    isActive: boolean
}
type ActivePlayerImgState = {}

class ActivePlayerImg extends React.Component<ActivePlayerImgProps, ActivePlayerImgState> {

    private readonly imgSrc = "img/active.png";

    render() {
        const component = this.props.isActive ? <div className="img-active-wrapper">
            <img src={this.imgSrc} alt={""} />
        </div> : <div className="img-active-wrapper invisible">
            <img src={this.imgSrc} alt={""} />
        </div>
        return component;
    }
}

export default ActivePlayerImg
