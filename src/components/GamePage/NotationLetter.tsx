import * as React from "react";

type AppProps = {
    textValue: string
}
type AppState = {}

class NotationLetter extends React.Component<AppProps, AppState> {

    render() {

        return (
            <div className="board-letter">{this.props.textValue}</div>
        );
    }
}

export default NotationLetter
