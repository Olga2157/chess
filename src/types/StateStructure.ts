import {Castling} from "./Castling";
import {PieceMove} from "./PieceMove";
import Room from "../model/Room";
import RoomResult from "../model/RoomResult";
import HandicapPieceCoordinates from "../model/HandicapPieceCoordinates";
import {GameStatus} from "../model/enums/GameStatus";
import {GameType} from "../model/enums/GameType";
import {PlayerColor} from "../model/enums/PlayerColor";

export interface StateStructure {
    game: {
        board: (string[])[]
        activePlayer: PlayerColor;
        possibleMoves: number[][][][];
        chosenPiece: {
            row: number,
            col: number
        };
        status: GameStatus;
        timerStatus: GameStatus;
        blackMoves: PieceMove[];
        whiteMoves: PieceMove[];
        player1Name: string;
        player2Name: string;
        renamedPlayer: string;
        castling: Castling;
        type: GameType;
        curOnlinePlayer: PlayerColor;
        sessions: Room[];
        winner: string;
        roomId: string;
        replayRoom: RoomResult | null,
        replayTimerSpeed: number,
        handicapPieces: HandicapPieceCoordinates[]
    };
}
