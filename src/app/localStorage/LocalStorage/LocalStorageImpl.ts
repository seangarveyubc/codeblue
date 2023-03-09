import { MMKV } from 'react-native-mmkv';
import { DeviceList } from '../models/DeviceList';
import { DeviceKeys } from '../models/LocalStorageKeys';
import { LocalAppStorage } from './LocalStorage';

export class LocalStorageImpl implements LocalAppStorage {
    private id: string;
    storage: MMKV;

    constructor(id: string) {
        this.id = id;
        this.storage = new MMKV({
            id,
            encryptionKey: 'secret-key'
        });
    }

    add(key: string, value: string | number | boolean) {
        this.storage.set(key, value);
    }

    addDevice(key: string, value: string) {
        let devices = this.storage.getString(DeviceKeys.DEVICE_LIST);
        this.storage.set(DeviceKeys.DEVICE_LIST, devices + ',' + value);
    }

    getString(key: string): string | undefined {
        return this.storage.getString(key);
    }

    getNumber(key: string): number | undefined {
        return this.storage.getNumber(key);
    }

    getBoolean(key: string): boolean | undefined {
        return this.storage.getBoolean(key);
    }

    getList(key: string): string[] | undefined {
        let listString = this.storage.getString(DeviceKeys.DEVICE_LIST);
        var listDevices = listString?.split(',')
        console.log(listDevices);
        return listDevices
    }

    // possible improvement: throw error if key does not exist
    delete(key: string) {
        if (!this.storage.contains(key)) {
            console.log(`${key} does not exist in storage with id ${this.id}`);
        }

        this.storage.delete(key);
    }

    clearStorage() {
        this.storage.clearAll();
    }

    isEmpty(): boolean {
        return this.storage.getAllKeys().length === 0;
    }
}
