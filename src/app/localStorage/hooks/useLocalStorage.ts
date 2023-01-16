import { LocalStorage } from '../LocalStorage/LocalStorage';
import { LocalStorageCache } from '../LocalStorageCache/LocalStorageCache';

export const APP_DATA_STORAGE = 'test1';
export const CARDIAC_STORAGE = 'test2';

const appDataStorage = new LocalStorage(APP_DATA_STORAGE);
const cardiacStorage = new LocalStorageCache(CARDIAC_STORAGE);

export const useLocalStorage = () => {
    const isLocalStorageEmpty = (): boolean => {
        return appDataStorage.isEmpty() && cardiacStorage.isEmpty();
    };

    return { isLocalStorageEmpty, appDataStorage, cardiacStorage };
};
