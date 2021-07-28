import * as React from 'react'
import TableHeading from './TableHeading';
import RoomDbDTO from "../../model/RoomDbDTO";
import GameRow from "./GameRow";
import RoomIndexedDB from "../../services/db/RoomIndexedDB";
import RoomResult from "../../model/RoomResult";
import MoveIndexedDB from "../../services/db/MoveIndexedDB";
import MoveDbDTO from "../../model/MoveDbDTO";
import SortMoveService from "../../services/SortMoveService";

type ReplaysPageProps = {}
type ReplaysState = {}

class ReplaysPage extends React.Component<ReplaysPageProps, ReplaysState> {

    roomsRes: string[] = [];

    constructor(props: ReplaysPageProps) {
        super(props);
        RoomIndexedDB.getRooms().then((roomsFromDB: RoomDbDTO[]) => {
                roomsFromDB.forEach((room: RoomDbDTO) => {
                    MoveIndexedDB.getMoves().then((moves: MoveDbDTO[]) => {
                        moves = SortMoveService.sortMoves(moves, room);
                        if (moves.length > 0) {
                            let serialisedVal = JSON.stringify(new RoomResult(room.roomId, room.status, room.player1, room.player2, moves.length, moves[moves.length - 1].time, moves))
                            this.roomsRes.push(serialisedVal)
                            this.forceUpdate();
                        }
                    })
                })
            }
        )
    }

    render() {
        return (
            <section id="replays-page">
                <div id="all-games">
                    <TableHeading/>
                    {this.roomsRes.map((room: string) => <GameRow room={room} key={room}/>)}
                </div>
            </section>
        );
    }
}

export default ReplaysPage
