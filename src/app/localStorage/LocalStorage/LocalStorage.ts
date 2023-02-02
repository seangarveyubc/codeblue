import { LocalStorageImpl } from './LocalStorageImpl';

export interface LocalAppStorage {
    add: (key: string, value: string | number | boolean) => void;
    getString: (key: string) => string | undefined;
    getNumber: (key: string) => number | undefined;
    getBoolean: (key: string) => boolean | undefined;
    delete: (key: string) => void;
    clearStorage: () => void;
    isEmpty: () => boolean;
}

export class LocalStorage extends LocalStorageImpl {}
