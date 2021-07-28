import {Config} from "../../Config";
import { Constants } from "../../model/Constants";
import RoomDbDTO from "../../model/RoomDbDTO";

export default class RoomIndexedDB {
    public static async putRoom(room: RoomDbDTO): Promise<void> {
        // openess DB and versions comparison
        const open = indexedDB.open(Config.DB_NAME, Config.DB_VERSION);
        const onupgradeneeded = () => {
            const db = open.result;
            const params = {keyPath: Constants.ROOM_ID} as IDBObjectStoreParameters;
            db.createObjectStore(Constants.ROOMS, params);
            db.createObjectStore(Constants.MOVES, {autoIncrement: true});
        };
        open.onupgradeneeded = await onupgradeneeded;
        const onSuccess = () => {
            const db = open.result;
            const tx = db.transaction(Constants.ROOMS, 'readwrite');
            const store = tx.objectStore(Constants.ROOMS);
            store.put(room);
            tx.oncomplete = () => {
                db.close();
            };
        };
        open.onsuccess = await onSuccess;
    }

    public static getRoom(roomId: string): Promise<RoomDbDTO> {
        return new Promise((resolve) => {
            const open = indexedDB.open(Config.DB_NAME, Config.DB_VERSION);
            // openess DB and versions comparison
            open.onupgradeneeded = () => {
                const db = open.result;
                const params = {keyPath: Constants.ROOM_ID} as IDBObjectStoreParameters;
                db.createObjectStore(Constants.ROOMS, params);
                db.createObjectStore(Constants.MOVES, {autoIncrement: true});
            };
            open.onsuccess = () => {
                const db = open.result;
                const tx = db.transaction(Constants.ROOMS, 'readonly');
                const store = tx.objectStore(Constants.ROOMS);
                const user = store.get(roomId);
                user.onsuccess = () => {
                    resolve(user.result);
                };
            };
        });
    }

    public static getRooms(): Promise<RoomDbDTO[]> {
        return new Promise((resolve) => {
           // openess DB and versions comparison
            const open = indexedDB.open(Config.DB_NAME, Config.DB_VERSION);
            open.onupgradeneeded = () => {
                const db = open.result;
                db.createObjectStore(Constants.MOVES, {autoIncrement: true});
                const params = {keyPath: Constants.ROOM_ID} as IDBObjectStoreParameters;
                db.createObjectStore(Constants.ROOMS, params);
            };
            open.onsuccess = () => {
                const db = open.result;
                const tx = db.transaction(Constants.ROOMS, 'readonly');
                const store = tx.objectStore(Constants.ROOMS);
                const allRecords = store.getAll();
                allRecords.onsuccess = () => {
                    resolve(allRecords.result);
                };
            };
        });
    }
}
