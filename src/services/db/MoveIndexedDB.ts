import MoveDbDTO from "../../model/MoveDbDTO";
import {Config} from "../../Config";

export default class MoveIndexedDB {
    public static async putMove(move: MoveDbDTO): Promise<void> {
        const open = indexedDB.open(Config.DB_NAME, Config.DB_VERSION);
        // openess DB and versions comparison
        const onUpgrade = () => {
            const db = open.result;
            db.createObjectStore('moves', {autoIncrement: true});
            const params = {keyPath: 'roomId'} as IDBObjectStoreParameters;
            db.createObjectStore('rooms', params);
        };
        open.onupgradeneeded = await onUpgrade;
        const onSuccess = () => {
            const db = open.result;
            const tx = db.transaction('moves', 'readwrite');
            const store = tx.objectStore('moves');
            store.put(move);
            tx.oncomplete = () => {
                db.close();
            };
        };
        open.onsuccess = await onSuccess;
    }

    public static getMoves(): Promise<MoveDbDTO[]> {
        return new Promise((resolve) => {
            // openess DB and versions comparison
            const open = indexedDB.open(Config.DB_NAME, Config.DB_VERSION);
            open.onupgradeneeded = () => {
                const db = open.result;
                db.createObjectStore('moves', {autoIncrement: true});
                const params = {keyPath: 'roomId'} as IDBObjectStoreParameters;
                db.createObjectStore('rooms', params);
            };
            open.onsuccess = () => {
                const db = open.result;
                const tx = db.transaction('moves', 'readonly');
                const store = tx.objectStore('moves');
                const allRecords = store.getAll();
                allRecords.onsuccess = () => {
                    resolve(allRecords.result);
                };
            };
        });
    }

}
