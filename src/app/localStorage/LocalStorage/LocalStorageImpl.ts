import { MMKV } from 'react-native-mmkv';
import { DeviceData, DeviceList } from '../models/DeviceList';
import { DeviceKeys } from '../models/LocalStorageKeys';
import {
    deserializeDeviceList,
    serializeLocalStorageObject
} from '../models/mappers';
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

    // bulk save device list action
    addDeviceList(value: DeviceList) {
        this.storage.set(
            DeviceKeys.DEVICE_LIST,
            serializeLocalStorageObject(value)
        );
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

    getDeviceList() {
        return deserializeDeviceList(
            this.storage.getString(DeviceKeys.DEVICE_LIST) ?? ''
        );
    }

    // possible improvement: throw error if key does not exist
    delete(key: string) {
        if (!this.storage.contains(key)) {
            console.log(`${key} does not exist in storage with id ${this.id}`);
        }

        this.storage.delete(key);
    }

    addDevice(value: DeviceData) {
        let deviceList = this.getDeviceList();

        if (!deviceList) {
            // adding a device for the first time
            this.add(
                DeviceKeys.DEVICE_LIST,
                serializeLocalStorageObject({ devices: [value] })
            );
        } else {
            let devices = deviceList.devices;
            const deviceIndex = devices?.findIndex(
                (device: DeviceData) => device.id === value.id
            );

            if (deviceIndex != -1) {
                console.log('already added');
            } else {
                devices.push(value);
                this.add(
                    DeviceKeys.DEVICE_LIST,
                    serializeLocalStorageObject({ devices: devices })
                );
            }
        }
    }

    deleteDevice(id: string) {
        const deviceList = this.getDeviceList();

        if (!deviceList) {
            console.log(`Could not delete device with id ${id}`);
        } else {
            let devices = deviceList.devices;
            const deleteIndex = devices.findIndex(
                (device: DeviceData) => device.id === id
            );

            if (deleteIndex > -1) {
                devices.splice(deleteIndex, 1);
            }

            this.add(
                DeviceKeys.DEVICE_LIST,
                serializeLocalStorageObject({ devices: devices })
            );
        }
    }

    clearStorage() {
        this.storage.clearAll();
    }

    isEmpty(): boolean {
        return this.storage.getAllKeys().length === 0;
    }
}
