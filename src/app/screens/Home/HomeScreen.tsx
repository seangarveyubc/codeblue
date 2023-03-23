import * as React from 'react';
import { useContext, useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import { HeaderSwirl } from '../../components/HeaderSwirl/HeaderSwirl';
import { HeartRateWidget } from '../../components/HeartRateWidget/HeartRateWidget';
import { CentredContent } from '../../components/CentredContent/CentredContent';
import { DeviceWidget } from '../../components/DeviceWidget/DeviceWidget';
import Colours from '../../constants/Colours';
import { useLocalStorage } from '../../localStorage/hooks/useLocalStorage';
import { PersonalDataKeys } from '../../localStorage/models/LocalStorageKeys';
import { SCREEN_WIDTH } from '../../constants/constants';
import { AppContext } from '../../backgroundMode/context/AppContext';
import { BackgroundMode } from '../../backgroundMode/models/BackgroundMode';
import { useIsFocused } from '@react-navigation/native';
import { isBackgroundModeDefined } from '../../backgroundMode/notifee/notifeeService';
import { EditDeviceWidget } from '../../components/EditDeviceWidget/EditDeviceWidget';
import { DeviceData } from '../../localStorage/models/DeviceList';
import { SensorLocations } from '../../constants/SensorLocations';

interface Props {
    navigation: any;
}

export const HomeScreen = ({ navigation }: Props) => {
    const [deviceListState, setDeviceListState] = useState(true);
    const [bluetoothState, setBluetoothState] = useState(false);
    const [firstName, changeFirstName] = useState('');
    const [lastName, changeLastName] = useState('');
    const [deviceName1, changeDeviceName1] = useState('PPG1');
    const [deviceName2, changeDeviceName2] = useState('EKG1');
    const { appDataStorage } = useLocalStorage();
    const { dispatch } = useContext(AppContext);
    const isFocused = useIsFocused();
    const deviceList = useRef(appDataStorage.getDeviceList());

    // initialize the background state to idle for a first time user
    useEffect(() => {
        /*appDataStorage.addDevice({
            id: '1',
            name: 'PPG2',
            location: 'Left Tip of Finger'
        });
        appDataStorage.addDevice({
            id: '2',
            name: 'PPG3',
            location: 'Right Wrist'
        });*/
        console.log('Homescreen device list', deviceList.current?.devices);
        if (!isBackgroundModeDefined) {
            dispatch({ type: BackgroundMode.IDLE });
        }
    }, [isFocused]);

    useEffect(() => {
        changeFirstName(
            appDataStorage.getString(PersonalDataKeys.FIRST_NAME) ?? ''
        );
        changeLastName(
            appDataStorage.getString(PersonalDataKeys.LAST_NAME) ?? ''
        );
    }, [isFocused]);

    const toggleChecked = () => {
        // exiting from edit mode
        if (!deviceListState && deviceList.current) {
            appDataStorage.addDeviceList(deviceList.current);
        }
        setDeviceListState((value) => !value);
    };

    // update local deviceList with information to be saved in local storage
    const handleUpdateDeviceInfo = (
        deviceData: DeviceData,
        updateType: 'location' | 'name',
        newName: string = '',
        newLocationIndex: number = 0
    ) => {
        let deviceListTemp = deviceList.current?.devices;
        const deviceIndex = deviceListTemp?.findIndex(
            (device: DeviceData) => device.id === deviceData.id
        );

        console.log('updateDevice deviceIndex', deviceIndex);
        console.log('deviceListTemp', deviceListTemp);

        if (deviceListTemp && deviceIndex !== undefined && deviceIndex > -1) {
            deviceListTemp[deviceIndex] = {
                id: deviceData.id,
                name: updateType === 'name' ? newName : deviceData.name,
                location:
                    updateType === 'location'
                        ? SensorLocations[newLocationIndex]
                        : deviceData.location
            };
            deviceList.current = { devices: deviceListTemp };
        } else {
            console.log(
                `Unable to update ${updateType} for device with id: ${deviceData.id}`
            );
        }
    };

    // TODO: fix UI not updating after delete
    const deleteSensor = (id: string) => {
        appDataStorage.deleteDevice(id);

        let deviceListTemp: DeviceData[] | undefined =
            deviceList.current?.devices;
        const deviceIndex = deviceListTemp?.findIndex(
            (device: DeviceData) => device.id === id
        );

        if (deviceListTemp && deviceIndex && deviceIndex > -1) {
            deviceListTemp.splice(deviceIndex, 1);
            deviceList.current = { devices: deviceListTemp };
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <HeaderSwirl
                        title={firstName + ' ' + lastName}
                        height={250}
                    />
                </View>
                <View style={styles.heartContainer}>
                    <HeartRateWidget heartRate={56} />
                </View>
                <CentredContent>
                    <View style={styles.deviceHeader}>
                        <Text style={styles.yourDevices}>Your Devices</Text>
                        <Text style={styles.edit} onPress={toggleChecked}>
                            {deviceListState ? 'Edit' : 'Save'}
                        </Text>
                    </View>
                </CentredContent>
                {!bluetoothState ? (
                    <View style={styles.bluetoothPrompt}>
                        <CentredContent>
                            <Text>
                                CodeBlue requires Bluetooth to monitor heart
                                rate.
                                <Text
                                    style={{
                                        color: Colours.BLUE,
                                        fontFamily: 'DMSans-Regular'
                                    }}
                                >
                                    Turn on Bluetooth.
                                </Text>
                            </Text>
                        </CentredContent>
                    </View>
                ) : null}
                {deviceListState ? (
                    <View
                        style={{
                            flex: bluetoothState ? 7 : 6,
                            marginTop: 10
                        }}
                    >
                        <CentredContent>
                            <View style={{ paddingBottom: 15 }}>
                                <DeviceWidget
                                    name={deviceName1}
                                    location={'Forehead'}
                                    isConnected={true}
                                />
                            </View>
                            <View style={{ paddingBottom: 15 }}>
                                <DeviceWidget
                                    name={deviceName2}
                                    location={'Right Tip of Finger'}
                                    isConnected={false}
                                />
                            </View>
                            {deviceList.current?.devices.map(
                                (device: DeviceData) => {
                                    return (
                                        <View style={{ paddingBottom: 15 }}>
                                            <DeviceWidget
                                                name={device.name}
                                                location={device.location}
                                                isConnected={false}
                                            />
                                        </View>
                                    );
                                }
                            )}
                        </CentredContent>
                    </View>
                ) : (
                    <View
                        style={{
                            flex: bluetoothState ? 7 : 6,
                            marginTop: 10
                        }}
                    >
                        <CentredContent>
                            {deviceList.current?.devices.map(
                                (device: DeviceData) => {
                                    return (
                                        <View style={{ paddingBottom: 15 }}>
                                            <EditDeviceWidget
                                                initialDeviceData={device}
                                                updateDeviceInfo={
                                                    handleUpdateDeviceInfo
                                                }
                                                deleteDevice={deleteSensor}
                                                isConnected={true}
                                            />
                                        </View>
                                    );
                                }
                            )}
                        </CentredContent>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: Colours.WHITE,
        alignItems: 'center'
    },
    header: {
        height: '15%'
    },
    heartContainer: {
        paddingTop: 20
    },
    yourDevices: {
        fontFamily: 'DMSans-Bold',
        fontSize: 24,
        color: Colours.BLACK
    },
    edit: {
        fontFamily: 'DMSans-Bold',
        fontSize: 18,
        color: Colours.BLUE
    },
    deviceHeader: {
        width: SCREEN_WIDTH * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bluetoothPrompt: {
        textAlign: 'center',
        marginVertical: 8,
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        fontFamily: 'DMSans-Regular'
    }
});
