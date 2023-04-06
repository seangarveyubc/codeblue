import { DeviceData, DeviceList } from '../models/DeviceList';
import { LocalStorageImpl } from './LocalStorageImpl';

export interface LocalAppStorage {
    add: (key: string, value: string | number | boolean) => void;
    addDevice: (value: DeviceData) => void;
    addDeviceList: (value: DeviceList) => void;
    getString: (key: string) => string | undefined;
    getNumber: (key: string) => number | undefined;
    getBoolean: (key: string) => boolean | undefined;
    getDeviceList: () => DeviceList | undefined;
    delete: (key: string) => void;
    deleteDevice: (id: string) => void;
    clearStorage: () => void;
    isEmpty: () => boolean;
}

export class LocalStorage extends LocalStorageImpl {}
