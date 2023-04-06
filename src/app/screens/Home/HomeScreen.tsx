import React, {
    useContext,
    useState,
    useCallback,
    useEffect,
    useRef
} from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ListRenderItemInfo
} from 'react-native';
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
import { normalize } from '../../utils/normalizer/normalizer';
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
    const { appDataStorage } = useLocalStorage();
    const { dispatch } = useContext(AppContext);
    const isFocused = useIsFocused();
    const deviceList = useRef(appDataStorage.getDeviceList());

    // initialize the background state to idle for a first time user
    useEffect(() => {
        /*appDataStorage.addDevice({
            id: Math.random().toString(),
            name: 'PPG2',
            location: 'Left Tip of Finger'
        });
        appDataStorage.addDevice({
            id: Math.random().toString(),
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

    const renderEditDeviceWidget = useCallback(
        (device: ListRenderItemInfo<DeviceData>) => {
            return (
                <View style={{ paddingBottom: 15 }}>
                    <EditDeviceWidget
                        initialDeviceData={device.item}
                        updateDeviceInfo={handleUpdateDeviceInfo}
                        deleteDevice={deleteSensor}
                        isConnected={true}
                    />
                </View>
            );
        },
        []
    );
    const renderDeviceWidget = useCallback(
        (device: ListRenderItemInfo<DeviceData>) => {
            return (
                <View style={{ paddingBottom: 15 }}>
                    <DeviceWidget
                        name={device.item.name}
                        location={device.item.location}
                        isConnected={false}
                    />
                </View>
            );
        },
        []
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderSwirl title={firstName + ' ' + lastName} />
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
            {!bluetoothState && (
                <View style={styles.bluetoothPrompt}>
                    <Text style={{ fontFamily: 'DMSans-Regular' }}>
                        CodeBlue requires Bluetooth to monitor heart rate.{' '}
                        <Text
                            style={{
                                color: Colours.BLUE
                            }}
                        >
                            Turn on Bluetooth.
                        </Text>
                    </Text>
                </View>
            )}
            {deviceListState ? (
                <View
                    style={{
                        flex: bluetoothState ? 7 : 6,
                        marginTop: 10
                    }}
                >
                    <CentredContent>
                        <FlatList
                            data={deviceList.current?.devices}
                            keyExtractor={(item) => item.id}
                            renderItem={renderDeviceWidget}
                        />
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
                        <FlatList
                            data={deviceList.current?.devices}
                            keyExtractor={(item) => item.id}
                            renderItem={renderEditDeviceWidget}
                        />
                    </CentredContent>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: Colours.WHITE,
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    header: {
        height: '15%'
    },
    heartContainer: {
        paddingTop: normalize(20),
        width: '100%'
    },
    yourDevices: {
        fontFamily: 'DMSans-Bold',
        fontSize: normalize(24),
        color: Colours.BLACK
    },
    edit: {
        fontFamily: 'DMSans-Bold',
        fontSize: normalize(18),
        color: Colours.BLUE
    },
    deviceHeader: {
        width: SCREEN_WIDTH * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bluetoothPrompt: {
        marginVertical: normalize(8),
        width: SCREEN_WIDTH * 0.9,
        fontFamily: 'DMSans-Regular'
    }
});
