import * as Http from 'http'
import * as Express from 'express';
import * as ScoketIO from 'socket.io';
import User from "./model/User";
import GameUpdate from "./model/GameUpdate";
import Room from "./model/Room";
import HandicapPieceCoordinates from "./model/HandicapPieceCoordinates";


export class ChessServer {
    public static readonly PORT: number = 8080;

    private app: Express.Application;
    private server: Http.Server;
    private socketServer: ScoketIO.Server;
    private port: string | number;
    private rooms: Room[];

    constructor() {
        this.app = Express();
        this.port = process.env.PORT || ChessServer.PORT;
        this.server = Http.createServer(this.app);
        this.socketServer = ScoketIO(this.server);
        this.rooms = [];
        this.run();
    }

    private run(): void {

        this.server.listen(this.port, () => {
        });

        this.socketServer.on('connect', (socket: ScoketIO.Socket) => {
            let roomId = '';
            socket.on('disconnect', () => {
                this.cleanRoom(roomId, socket);
            });
            socket.on('create-game', (user: User) => {
                roomId = "id" + Math.random().toString(16).slice(2)
                this.rooms.push({
                    roomId: roomId,
                    player1: user,
                    player2: null
                })
                socket.join(roomId);
                this.socketServer.emit("all-rooms", this.rooms);
            });
            socket.on('join-game', (room: Room) => {
                this.rooms.forEach(foundRoom => {
                    if (foundRoom.roomId === room.roomId) {
                        foundRoom.player2 = room.player2
                    }
                })
                socket.join(room.roomId);
                roomId = room.roomId;
                emitter(roomId, "join-game", room)
                this.cleanRoom(roomId, socket);
            });
            socket.on('cancel-game', () => {
                this.cleanRoom(roomId, socket);
                socket.leave(roomId);
            });
            socket.on('game-update', (gameUpdate: GameUpdate) => {
                emitter(roomId, "game-update", gameUpdate)
            });
            socket.on('admit-loss', () => {
                emitter(roomId, "admit-loss", {})
            });
            socket.on('draw-event', () => {
                emitter(roomId, "draw-event", {})
            });
            socket.on('offer-draw', () => {
                emitter(roomId, "offer-draw", {})
            });
            socket.on('get-rooms', () => {
                this.socketServer.emit("all-rooms", this.rooms);
            })
            socket.on('give-handicap', (coordinates: HandicapPieceCoordinates) => {
                this.socketServer.emit("give-handicap", coordinates);
            })
            const emitter = (roomId: string, channel: string, payload: any, othersOnly?: boolean) => {
                if (othersOnly) {
                    socket.to(roomId).emit(channel, payload);
                } else {
                    this.socketServer.in(roomId).emit(channel, payload);
                }
            };
        });
    }

    private cleanRoom(roomId: string, socket: SocketIO.Socket) {
        let foundRoom: Room = this.rooms[0];
        this.rooms.forEach((room: Room) => {
            if (room.roomId === roomId) {
                foundRoom = room;
            }
        })
        let index = this.rooms.indexOf(foundRoom);
        if (index !== -1) {
            this.rooms.splice(index, 1);
        }
        this.socketServer.emit("all-rooms", this.rooms);
    }

    public getApp(): Express.Application {
        return this.app;
    }
}
