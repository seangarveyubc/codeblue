import { LocalStorage } from '../LocalStorage/LocalStorage';
import { LocalStorageCache } from '../LocalStorageCache/LocalStorageCache';

export const APP_DATA_STORAGE = 'APP_DATA_STORAGE';
export const CARDIAC_STORAGE = 'CARDIAC_STORAGE';

const appDataStorage = new LocalStorage(APP_DATA_STORAGE);
const cardiacStorage = new LocalStorageCache(CARDIAC_STORAGE);

export const useLocalStorage = () => {
    const isLocalStorageEmpty =
        appDataStorage.isEmpty() && cardiacStorage.isEmpty();
    return { isLocalStorageEmpty, appDataStorage, cardiacStorage };
};
