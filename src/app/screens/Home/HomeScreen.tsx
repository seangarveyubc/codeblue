import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    ListRenderItemInfo
} from 'react-native';

import { HeaderSwirl } from '../../components/HeaderSwirl/HeaderSwirl';
import { HeartRateWidget } from '../../components/HeartRateWidget/HeartRateWidget';
import { CentredContent } from '../../components/CentredContent/CentredContent';
import { DeviceWidget } from '../../components/DeviceWidget/DeviceWidget';
import { IconTextInput } from '../../components/IconTextInput/IconTextInput';
import Colours from '../../constants/Colours';
import { useLocalStorage } from '../../localStorage/hooks/useLocalStorage';
import {
    DeviceKeys,
    PersonalDataKeys
} from '../../localStorage/models/LocalStorageKeys';
import { SCREEN_WIDTH } from '../../constants/constants';
import { AppContext } from '../../backgroundMode/context/AppContext';
import { BackgroundMode } from '../../backgroundMode/models/BackgroundMode';
import { useIsFocused } from '@react-navigation/native';
import { isBackgroundModeDefined } from '../../backgroundMode/notifee/notifeeService';
import { normalize } from '../../utils/normalizer/normalizer';

interface Props {
    navigation: any;
}

export const HomeScreen = ({ navigation }: Props) => {
    const temp: string[] = [];
    const [deviceListState, setDeviceListState] = useState(true);
    const [deviceList, setDeviceList] = useState(temp);
    const [bluetoothState, setBluetoothState] = useState(false);
    const [firstName, changeFirstName] = useState('');
    const [lastName, changeLastName] = useState('');
    const [deviceName1, changeDeviceName1] = useState('PPG1');
    const [deviceName2, changeDeviceName2] = useState('EKG1');
    const { appDataStorage } = useLocalStorage();
    const { dispatch } = useContext(AppContext);
    const isFocused = useIsFocused();

    // initialize the background state to idle for a first time user
    useEffect(() => {
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
        setDeviceList(appDataStorage.getList(DeviceKeys.DEVICE_LIST) ?? []);

        // changeDeviceName1(appDataStorage.getList(DeviceKeys.DEVICE_LIST) ?? '');
    }, [isFocused]);

    const toggleChecked = () => setDeviceListState((value) => !value);

    const renderIconTextInput = useCallback(
        (item: ListRenderItemInfo<string>) => {
            return (
                <View style={{ width: '88%' }}>
                    <IconTextInput
                        text={item.item}
                        isConnected={false}
                        onChangeText={changeDeviceName1}
                    />
                </View>
            );
        },
        []
    );
    const renderDeviceWidget = useCallback(
        (item: ListRenderItemInfo<string>) => {
            return (
                <View style={{ paddingBottom: 15 }}>
                    <DeviceWidget name={item.item} isConnected={true} />
                </View>
            );
        },
        []
    );

    return (
        <View style={styles.container}>
            <>
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
                            flex: bluetoothState ? normalize(7) : normalize(6),
                            marginTop: normalize(10)
                        }}
                    >
                        <CentredContent>
                            <FlatList
                                data={deviceList}
                                renderItem={renderDeviceWidget}
                            />
                            {/* <View style={{ paddingBottom: 15 }}>
                                <DeviceWidget
                                    name={deviceName1}
                                    isConnected={true}
                                />
                            </View>
                            <View style={{ paddingBottom: normalize(15) }}>
                                <DeviceWidget
                                    name={deviceName2}
                                    isConnected={false}
                                />
                            </View> */}
                        </CentredContent>
                    </View>
                ) : (
                    <View
                        style={{
                            flex: bluetoothState ? normalize(7) : normalize(6),
                            marginTop: normalize(10)
                        }}
                    >
                        <CentredContent>
                            <FlatList
                                data={deviceList}
                                renderItem={renderIconTextInput}
                            />
                            {/* <View style={{ width: '88%' }}>
                                <IconTextInput
                                    text={deviceName1}
                                    isConnected={true}
                                    onChangeText={changeDeviceName1}
                                />
                            </View>
                            <View style={{ width: '88%' }}>
                                <IconTextInput
                                    text={deviceName2}
                                    isConnected={false}
                                    onChangeText={changeDeviceName2}
                                />
                            </View> */}
                        </CentredContent>
                    </View>
                )}
            </>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: Colours.WHITE,
        alignItems: 'center',
        height: '100%'
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
        textAlign: 'center',
        marginVertical: normalize(8),
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        fontFamily: 'DMSans-Regular'
    }
});
