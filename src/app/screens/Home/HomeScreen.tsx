import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import { HeaderSwirl } from '../../components/HeaderSwirl/HeaderSwirl';
import { HeartRateWidget } from '../../components/HeartRateWidget/HeartRateWidget';
import { CentredContent } from '../../components/CentredContent/CentredContent';
import { DeviceWidget } from '../../components/DeviceWidget/DeviceWidget';
import { IconTextInput } from '../../components/IconTextInput/IconTextInput';
import Colours from '../../constants/Colours';
import { useLocalStorage } from '../../localStorage/hooks/useLocalStorage';
import {
    BACKGROUND_MODE,
    PersonalDataKeys
} from '../../localStorage/models/LocalStorageKeys';
import { SCREEN_WIDTH } from '../../constants/constants';
import { useIsFocused } from '@react-navigation/native';
import { AppContext } from '../../backgroundMode/context/AppContext';
import { BackgroundMode } from '../../backgroundMode/models/BackgroundMode';

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
    const isFocused = useIsFocused();
    const { dispatch } = useContext(AppContext);

    // initialize the background state to idle for a first time user
    if (!appDataStorage.getString(BACKGROUND_MODE)) {
        appDataStorage.add(BACKGROUND_MODE, BackgroundMode.IDLE);
    }

    useEffect(() => {
        changeFirstName(
            appDataStorage.getString(PersonalDataKeys.FIRST_NAME) ?? ''
        );
        changeLastName(
            appDataStorage.getString(PersonalDataKeys.LAST_NAME) ?? ''
        );
    }, [isFocused]);

    const toggleChecked = () => setDeviceListState((value) => !value);

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
                <Button
                    title="heart"
                    onPress={() =>
                        dispatch({ type: BackgroundMode.MONITOR_HEART })
                    }
                />
                <Button
                    title="call"
                    onPress={() =>
                        dispatch({ type: BackgroundMode.PHONE_CALL })
                    }
                />
                <Button
                    title="idle"
                    onPress={() => dispatch({ type: BackgroundMode.IDLE })}
                />
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
                                        color: Colours.BLUE
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
                                    isConnected={true}
                                />
                            </View>
                            <View style={{ paddingBottom: 15 }}>
                                <DeviceWidget
                                    name={deviceName2}
                                    isConnected={false}
                                />
                            </View>
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
                            <View style={{ width: '88%' }}>
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
                            </View>
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
        alignSelf: 'center'
    }
});
