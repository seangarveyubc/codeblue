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
import { useLocalStorage } from '../localStorage/hooks/useLocalStorage';

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
    const [heartRate, setHeartRate] = useState<number>(1);
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
            if (device?.name) {
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
            // setHeartRate(10);
            startStreamingData(device);
        } catch (e) {
            console.log('FAILED TO CONNECT', e);
        }
    };

    const disconnectFromDevice = () => {
        if (connectedDevice) {
            bleManager.cancelDeviceConnection(connectedDevice.id);
            setConnectedDevice(null);
            // setHeartRate(0);
        }
    };

    // const onHeartRateUpdate = (
    //     error: BleError | null,
    //     characteristic: Characteristic | null
    // ) => {
    //     console.log('error in update');
    //     console.log(error);
    //     console.log('charac in update');
    //     console.log(characteristic);
    //     if (error) {
    //         console.log(error);
    //         return -1;
    //     } else if (!characteristic?.value) {
    //         console.log('No Data was recieved');
    //         return -1;
    //     }

    //     const rawData = atob(characteristic.value);
    //     console.log(rawData);
    //     console.log(rawData[1].charCodeAt(0));
    //     let innerHeartRate: number = -1;

    //     const firstBitValue: number = Number(rawData) & 0x01;

    //     if (firstBitValue === 0) {
    //         innerHeartRate = rawData[1].charCodeAt(0);
    //     } else {
    //         innerHeartRate =
    //             Number(rawData[1].charCodeAt(0) << 8) +
    //             Number(rawData[2].charCodeAt(2));
    //     }
    //     console.log(rawData);
    //     // setHeartRate(Number(rawData));
    // };

    const startStreamingData = async (device: Device) => {
        const services = await device.services();
        let monitoringChar: Characteristic | null;
        console.log(services);
        services.forEach(async (service) => {
            if (service) {
                console.log(service.id);
                console.log(service.uuid);
                let chars = await service.characteristics();
                chars.forEach((char) => {
                    if (char.isNotifiable) {
                        console.log('111111');
                        monitoringChar = char;
                        // console.log(char);
                        device!.monitorCharacteristicForService(
                            char.serviceUUID,
                            char.uuid,
                            (error, characteristic) => {
                                console.log(characteristic?.value);
                                console.log(atob(characteristic?.value!));
                                const temp = atob(characteristic?.value!);
                                // console.log(Number(characteristic?.value));
                                console.log(Number(temp));
                                if (temp) {
                                    setHeartRate(Number(temp));
                                }
                                // saveHeartRate(Number(temp));
                                console.log('444');
                                console.log(heartRate);
                            }
                        );
                    }
                });
            }
        });
        // const char = await services[11].characteristics();
        // console.log(char);

        // console.log('111111');
        // console.log(temp1.value!);
        // console.log(char[0].serviceUUID);

        // device!.monitorCharacteristicForService(
        //     monitoringChar!.serviceUUID,
        //     monitoringChar!.uuid,
        //     (error, characteristic) => {
        //         console.log(characteristic?.value);
        //         console.log(atob(characteristic?.value!));
        //         const temp = atob(characteristic?.value!);
        //         // console.log(Number(characteristic?.value));
        //         console.log(Number(temp));
        //         setHeartRate(Number(temp));
        //         saveHeartRate(Number(temp));
        //         console.log('444');
        //         console.log(heartRate);
        //     }
        // );
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
