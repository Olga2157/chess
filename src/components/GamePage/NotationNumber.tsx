import * as React from "react";

type AppProps = {
    textValue: number
}
type AppState = {}

class NotationNumber extends React.Component<AppProps, AppState> {

    render() {

        return (
            <div className="board-number">{this.props.textValue}</div>
        );
    }
}

export default NotationNumber
