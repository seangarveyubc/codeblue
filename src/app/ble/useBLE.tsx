import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Characteristic, Device } from 'react-native-ble-plx';
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
    const scanForPeripherals = () => {
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
        });
    };

    const connectToDevice = async (device: Device) => {
        try {
            await device.connect();
            console.log('Trying to conncet');
            setConnectedDevice(device);
        } catch (e) {
            console.log('FAILED TO CONNECT', e);
        }
        try {
            await device.discoverAllServicesAndCharacteristics();
            console.log(device);
            bleManager.stopDeviceScan();
            // setHeartRate(10);
        } catch (e) {
            console.log('FAILED TO DISCOVER SERVICES');
        }
        startStreamingData(device);
    };

    const disconnectFromDevice = () => {
        console.log('disconnecting');
        if (connectedDevice) {
            bleManager.cancelDeviceConnection(connectedDevice.id);
            console.log('11');
            setConnectedDevice(null);
            // setHeartRate(0);
        }
    };

    const startStreamingData = async (device: Device) => {
        const serviceUUIDs = device.serviceUUIDs;
        try {
            serviceUUIDs?.forEach((sUUID) => {
                console.log(device);
                try {
                    device.characteristicsForService(sUUID).then((chars) => {
                        console.log(chars);
                        try {
                            chars.forEach((char) => {
                                console.log('services');

                                console.log(sUUID);
                                console.log('chars');
                                console.log(char.uuid);
                                if (char.isNotifiable) {
                                    console.log('CAN notify');
                                    console.log(char.uuid);
                                    monitorCharacteristic(device, char);
                                }
                            });
                        } catch (e) {
                            console.log('here2');
                        }
                    });
                } catch (e) {
                    console.log('hreere');
                }
            });
        } catch (e) {
            console.log('FAILED TO FIND CHARACTERISTICS FOR SERVICES');
        }
    };

    const monitorCharacteristic = (device: Device, charac: Characteristic) => {
        try {
            let count = 0;
            let heartRateArray: Array<number> = [];
            device!.monitorCharacteristicForService(
                charac.serviceUUID,
                charac.uuid,
                (error, characteristic) => {
                    // console.log(characteristic?.value);
                    // console.log(atob(characteristic?.value!));
                    const temp = atob(characteristic?.value!);
                    // console.log(temp);
                    // console.log(111);

                    if (Number(temp)) {
                        console.log(Number(temp));
                        if (count < 5) {
                            setHeartRate(Number(temp));
                            heartRateArray.push(Number(temp));
                            count += 1;
                        }
                    }
                    if (count >= 5) {
                        console.log(heartRateArray);
                        count = 0;
                    }
                }
            );
        } catch (e) {
            console.log('FAILED TO READ MONITOR CHARACTERISTICS');
        }
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
