import * as React from "react";
import Square from "../../containers/Square";

type AppProps = {
    row: number
}
type AppState = {}

class Row extends React.Component<AppProps, AppState> {

    render() {
        let squares: JSX.Element[] = [];
        if (this.props.row % 2 === 0) {
            for (let i = 0; i < 8; i++) {
                squares.push(<Square classColor={i % 2 === 0 ? "w" : "b"} row={this.props.row} col={i} />);
            }
            return (
                <tr>
                    {squares}
                </tr>
            );
        } else {
            for (let i = 0; i < 8; i++) {
                squares.push(<Square classColor={i % 2 === 0 ? "b" : "w"} row={this.props.row} col={i} />);
            }
            return (
                <tr>
                    {squares}
                </tr>
            );
        }
    }
}

export default Row
