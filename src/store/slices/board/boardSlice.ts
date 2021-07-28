import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {StateStructure} from "../../../types/StateStructure";
import {PossibleMovesService} from "../../../services/PossibleMovesService";
import choosePieceAction from "../../../actions/choosePieceAction";
import movePieceAction from "../../../actions/movePieceAction";
import changePlayerNameAction from "../../../actions/changePlayerNameAction";
import startOnlineGameAction from "../../../actions/startOnlineGameAction";
import onlineMoveAction from "../../../actions/onlineMoveAction";
import updateGameSessionsAction from "../../../actions/updateGameSessionsAction";
import Room from "../../../model/Room";
import startBotGameAction from "../../../actions/startBotGameAction";
import chooseColorForOnlineGameAction from "../../../actions/chooseColorForOnlineGameAction";
import admitLossAction from "../../../actions/admitLossAction";
import drawAction from "../../../actions/drawAction";
import SocketIo from "../../../socket.io.client";
import HandicapPieceCoordinates from "../../../model/HandicapPieceCoordinates";
import startOfflineGameAction from "../../../actions/startOfflineGameAction";
import MoveDbDTO from "../../../model/MoveDbDTO";
import startReplayAction from "../../../actions/startReplayAction";
import onGiveHandicapAction from "../../../actions/onGiveHandicapAction";
import giveHandicapAction from "../../../actions/giveHandicapAction";
import replayMoveAction from "../../../actions/replayMoveAction";
import startReplayCurAction from "../../../actions/startReplayCurAction";
import stopReplayAction from "../../../actions/stopReplayAction";
import changeSpeedAction from "../../../actions/changeSpeedAction";
import {GameStatus} from "../../../model/enums/GameStatus";
import {PlayerColor} from "../../../model/enums/PlayerColor";
import {GameType} from "../../../model/enums/GameType";
import {Constants} from "../../../model/Constants";


const initialBoard: (string[])[] = [
    ["black-rook", "black-knight", "black-bishop", "black-queen", "black-king", "black-bishop", "black-knight", "black-rook"],
    ["black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn"],
    ["white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook"],
];
const initialCastling = {
    isBlackKingMoved: false,
    isWhiteKingMoved: false,
    isBlackLeftRookMoved: false,
    isBlackRightRookMoved: false,
    isWhiteLeftRookMoved: false,
    isWhiteRightRookMoved: false
}
export const initialState: StateStructure["game"] = {
    board: initialBoard,
    activePlayer: PlayerColor.WHITE,
    possibleMoves: PossibleMovesService.getSteps(initialBoard, initialCastling, PlayerColor.WHITE).steps,
    chosenPiece: {
        row: -1,
        col: -1
    },
    status: GameStatus.PENDING,
    timerStatus: GameStatus.PENDING,
    whiteMoves: [],
    blackMoves: [],
    player1Name: Constants.PLAYER1,
    player2Name: Constants.PLAYER2,
    renamedPlayer: "",
    castling: initialCastling,
    type: GameType.OFFLINE,
    curOnlinePlayer: PlayerColor.NO,
    sessions: [],
    winner: "",
    roomId: "",
    replayRoom: null,
    replayTimerSpeed: 1,
    handicapPieces: []
};

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        startOfflineGame(state, action: PayloadAction<{}>) {
            startOfflineGameAction(state, action, initialBoard, initialCastling)
        },
        startReplay(state, action: PayloadAction<{ room: string }>) {
            startReplayAction(state, action, initialBoard)
        },
        startReplayCur(state, action: PayloadAction<{}>) {
            startReplayCurAction(state, action, initialBoard)
        },
        stopReplay(state, action: PayloadAction<{}>) {
            stopReplayAction(state, action, initialBoard)
        },
        replayMove(state, action: PayloadAction<{
            nextMove: MoveDbDTO
        }>) {
            replayMoveAction(state, action)
        },
        changeSpeed(state, action: PayloadAction<{
            speed: number
        }>) {
            changeSpeedAction(state, action)
        },
        startOnlineGame(state, action: PayloadAction<{
            color: PlayerColor,
            room: Room,
            curPlayer: string
        }>) {
            startOnlineGameAction(state, action, initialCastling);
        },
        chooseColorForOnlineGame(state, action: PayloadAction<{
            color: PlayerColor;
        }>) {
            chooseColorForOnlineGameAction(state, action);
        },
        startBotGame(state, action: PayloadAction<{
            color: PlayerColor;
        }>) {
            startBotGameAction(state, action, initialBoard, initialCastling);
        },
        onlineMove(state, action: PayloadAction<{ chosenRow: number, chosenCol: number, row: number, col: number, color: string }>) {
            onlineMoveAction(state, action)
        },
        choosePiece(state, action: PayloadAction<{ row: number; col: number; }>) {
            choosePieceAction(state, action);
        },
        movePiece(state, action: PayloadAction<{
            row: number;
            col: number;
        }>) {
            movePieceAction(state, action)
        },
        startTimer(state, action: PayloadAction<{}>) {
            state.timerStatus = GameStatus.STARTED;
        },
        admitLoss(state, action: PayloadAction<{ anotherPlayer?: boolean }>) {
            admitLossAction(state, action)
        },
        draw(state, action: PayloadAction<{ anotherPlayer?: boolean }>) {
            drawAction(state, action)
        },
        offerDraw(state, action: PayloadAction<{}>) {
            state.status = GameStatus.OFFERED_DRAW;
            SocketIo.emit('offer-draw', {});
        },
        resetBoard(state, action: PayloadAction<{}>) {
            if (state.status !== GameStatus.STARTED){
                state.board = initialBoard;
            }
        },
        changeRenamedPlayer(state, action: PayloadAction<{ player: string }>) {
            state.renamedPlayer = action.payload.player;
        },
        changePlayerName(state, action: PayloadAction<{ newName: string }>) {
            changePlayerNameAction(state, action);
        },
        updateGameSessions(state, action: PayloadAction<{ sessions: Room[] }>) {
            updateGameSessionsAction(state, action);
        },
        giveHandicap(state, action: PayloadAction<{ piece: string }>) {
            giveHandicapAction(state, action)
        },
        onGiveHandicap(state, action: PayloadAction<{ coordinates: HandicapPieceCoordinates }>) {
            onGiveHandicapAction(state, action)
        }
    }
});

export const {
    startOnlineGame,
    startBotGame,
    onlineMove,
    choosePiece,
    movePiece,
    startTimer,
    changeRenamedPlayer,
    changePlayerName,
    updateGameSessions,
    chooseColorForOnlineGame,
    resetBoard,
    startOfflineGame,
    admitLoss,
    draw,
    offerDraw,
    giveHandicap,
    onGiveHandicap,
    startReplay,
    startReplayCur,
    changeSpeed,
    replayMove,
    stopReplay
} = boardSlice.actions;

export default boardSlice.reducer;

