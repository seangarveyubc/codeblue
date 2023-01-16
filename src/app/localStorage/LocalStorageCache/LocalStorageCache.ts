import { LocalStorage } from '../LocalStorage/LocalStorage';
import { CardiacData } from '../models/CardiacData';
import { LocalStorageCacheImpl } from './LocalStorageCacheImpl';

export interface LocalAppStorageCache extends LocalStorage {
    addCardiacData: (key: string, value: CardiacData) => void;
    // returns all entries in the cache, unordered
    getAllCardiacData: () => CardiacData[];
    // remove all entries that are more than 24 hours old
    refresh: () => void;
}

export class LocalStorageCache extends LocalStorageCacheImpl {}
