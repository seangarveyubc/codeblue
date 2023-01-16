import { LocalStorage } from '../LocalStorage/LocalStorage';
import { CardiacData } from '../models/CardiacData';
import { LocalStorageCacheImpl } from './LocalStorageCacheImpl';

export interface LocalAppStorageCache extends LocalStorage {
    addCardiacData: (key: string, value: CardiacData) => void;
    getAllCardiacData: () => CardiacData[];
    refresh: () => void;
}

export class LocalStorageCache extends LocalStorageCacheImpl {}
