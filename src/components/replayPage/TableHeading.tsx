import * as React from 'react'

const TableHeading: React.FC<{}> = props => {

    return (
        <div className="game-details-div">
            <p className="black-player-replay">Black player</p>
            <p className="vs">VS</p>
            <p className="white-player-replay">White player</p>
            <p className="status">Status</p>
            <p className="steps">Steps</p>
            <p className="game-time">Time</p>
            <div className="replay-management">
            </div>
        </div>
    );
}

export default TableHeading
