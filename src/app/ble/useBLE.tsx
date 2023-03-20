import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
    BleError,
    BleManager,
    Characteristic,
    Device
} from 'react-native-ble-plx';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

import { atob } from 'react-native-quick-base64';

const HEART_RATE_UUID = '180D';
const HEART_RATE_CHARACTERISTIC = '2A37';

const bleManager = new BleManager();

type VoidCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
    requestPermissions(cb: VoidCallback): Promise<void>;
    scanForPeripherals(): void;
    connectToDevice: (deviceId: Device) => Promise<void>;
    disconnectFromDevice: () => void;
    connectedDevice: Device | null;
    allDevices: Device[];
    heartRate: number;
}

function useBLE(): BluetoothLowEnergyApi {
    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
    const [heartRate, setHeartRate] = useState<number>(0);

    const requestPermissions = async (cb: VoidCallback) => {
        if (Platform.OS === 'android') {
            const apiLevel = await DeviceInfo.getApiLevel();

            if (apiLevel < 31) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'Bluetooth Low Energy requires Location',
                        buttonNeutral: 'Ask Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK'
                    }
                );
                cb(granted === PermissionsAndroid.RESULTS.GRANTED);
            } else {
                const result = await requestMultiple([
                    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                ]);

                const isGranted =
                    result['android.permission.BLUETOOTH_CONNECT'] ===
                        PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.BLUETOOTH_SCAN'] ===
                        PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.ACCESS_FINE_LOCATION'] ===
                        PermissionsAndroid.RESULTS.GRANTED;

                cb(isGranted);
            }
        } else {
            cb(true);
        }
    };

    const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
        devices.findIndex((device) => nextDevice.id === device.id) > -1;

    let devicecounter = 0;
    const scanForPeripherals = () =>
        bleManager.startDeviceScan(null, null, (error, device) => {
            // console.log(device);
            if (error) {
                console.log(error);
            }
            if (device) {
                devicecounter += 1;
                setAllDevices((prevState: Device[]) => {
                    if (!isDuplicteDevice(prevState, device)) {
                        return [...prevState, device];
                    }
                    return prevState;
                });
            }
            if (devicecounter >= 10) {
                bleManager.stopDeviceScan();
            }
        });

    const connectToDevice = async (device: Device) => {
        try {
            await device.connect();
            console.log('Trying to conncet');
            setConnectedDevice(device);

            await device.discoverAllServicesAndCharacteristics();
            console.log(device);
            bleManager.stopDeviceScan();

            startStreamingData(device);
        } catch (e) {
            console.log('FAILED TO CONNECT', e);
        }
    };

    const disconnectFromDevice = () => {
        if (connectedDevice) {
            bleManager.cancelDeviceConnection(connectedDevice.id);
            setConnectedDevice(null);
            setHeartRate(0);
        }
    };

    const onHeartRateUpdate = (
        error: BleError | null,
        characteristic: Characteristic | null
    ) => {
        console.log('error in update');
        console.log(error);
        console.log('charac in update');
        console.log(characteristic);
        if (error) {
            console.log(error);
            return -1;
        } else if (!characteristic?.value) {
            console.log('No Data was recieved');
            return -1;
        }

        const rawData = atob(characteristic.value);
        console.log(rawData);
        console.log(rawData[1].charCodeAt(0));
        let innerHeartRate: number = -1;

        const firstBitValue: number = Number(rawData) & 0x01;

        if (firstBitValue === 0) {
            innerHeartRate = rawData[1].charCodeAt(0);
        } else {
            innerHeartRate =
                Number(rawData[1].charCodeAt(0) << 8) +
                Number(rawData[2].charCodeAt(2));
        }
        console.log(rawData);
        setHeartRate(Number(rawData));
    };

    const startStreamingData = async (device: Device) => {
        const services = await device.services();
        console.log(services);
        const char = await services[11].characteristics();
        console.log(char);

        console.log('111111');
        // console.log(temp1.value!);
        console.log(char[0].serviceUUID);
        // const temp = await device.readCharacteristicForService(
        //     char[0].serviceUUID,
        //     char[0].uuid
        // );
        // console.log(temp.value);
        // console.log('here');
        // temp.monitor((error, characteristic) => {
        //     console.log(error);
        //     console.log(characteristic);
        //     setHeartRate(heartRate + 1);
        //     // onHeartRateUpdate(error, characteristic);
        // });

        // if (device) {
        //     device.monitorCharacteristicForService(
        //         char[0].serviceUUID,
        //         char[0].uuid,
        //         (error, characteristic) => {
        //             console.log(characteristic);
        //             onHeartRateUpdate(error, characteristic);
        //         }
        //     );
        // } else {
        //     console.log('No Device Connected');
        // }
    };

    return {
        scanForPeripherals,
        requestPermissions,
        connectToDevice,
        allDevices,
        connectedDevice,
        disconnectFromDevice,
        heartRate
    };
}

export default useBLE;
