import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Colours from '../../../utilities/Colours';
import { Logo } from '../../components/utils/Logo';
import { Swirl } from '../../components/utils/Swirl';
import HeartRateWidget from '../../components/HeartRateWidget';
import { CentredContent } from '../../components/CentredContent';
import { DeviceWidget } from '../../components/DeviceWidget';
import IconTextInput from '../../components/IconTextInput';

interface Props {
    navigation: any;
}

export const HomeScreen = ({ navigation }: Props) => {
    const [deviceListState, setDeviceListState] = useState(true);
    const [bluetoothState, setBluetoothState] = useState(false);
    const [deviceName1, changeDeviceName1] = useState('PPG1');
    const [deviceName2, changeDeviceName2] = useState('EKG1');
    const toggleChecked = () => setDeviceListState((value) => !value);

    return (
        <View style={styles.container}>
            <View style={styles.swirl}>
                <Swirl rotation={180} />
            </View>
            <View style={styles.container}>
                <View style={styles.title}>
                    <View style={styles.logo}>
                        <Logo width={35} height={35} />
                    </View>
                    <Text style={styles.codeblue}>CodeBlue</Text>
                </View>
                <Text style={styles.name}>Test Name</Text>
                <View style={styles.heartContainer}>
                    <HeartRateWidget heartRate={56} />
                </View>
            </View>
            <View style={styles.devicesContainer}>
                <View style={styles.deviceHeader}>
                    <Text style={styles.yourDevices}>Your Devices</Text>
                    <Text style={styles.edit} onPress={toggleChecked}>
                        {deviceListState ? 'Edit' : 'Save'}
                    </Text>
                </View>
                {!bluetoothState ? (
                    <View style={styles.bluetoothPrompt}>
                        <CentredContent>
                            <Text>
                                CodeBlue requires Bluetooth to monitor heart
                                rate.
                                <Text style={{ color: Colours.BLUE }}>
                                    Turn on Bluetooth.
                                </Text>
                            </Text>
                        </CentredContent>
                    </View>
                ) : null}
                {deviceListState ? (
                    <View
                        style={{ flex: bluetoothState ? 7 : 6, marginTop: 10 }}
                    >
                        <CentredContent>
                            <DeviceWidget
                                name={deviceName1}
                                isConnected={true}
                            />
                            <DeviceWidget
                                name={deviceName2}
                                isConnected={false}
                            />
                        </CentredContent>
                    </View>
                ) : (
                    <View
                        style={{ flex: bluetoothState ? 7 : 6, marginTop: 10 }}
                    >
                        <CentredContent>
                            <IconTextInput
                                text={deviceName1}
                                isConnected={true}
                                onChangeText={(text) => changeDeviceName1(text)}
                            />
                            <IconTextInput
                                text={deviceName2}
                                isConnected={false}
                                onChangeText={(text) => changeDeviceName2(text)}
                            />
                        </CentredContent>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 5
    },
    swirl: {
        position: 'absolute',
        top: -150,
        bottom: 0,
        left: 0,
        right: 0,
        transform: [{ scaleX: -1 }]
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colours.BLACK
    },
    heartContainer: {
        flex: 3
    },
    devicesContainer: {
        flex: 1
    },
    title: {
        flex: 1,
        flexDirection: 'row'
    },
    name: {
        flex: 1,
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontSize: 36,
        paddingTop: 5
    },
    logo: {
        position: 'absolute',
        bottom: 0
    },
    codeblue: {
        flex: 1,
        fontFamily: 'DMSans-Bold',
        fontSize: 28,
        color: Colours.BLUE,
        position: 'absolute',
        bottom: 0,
        left: 50
    },
    yourDevices: {
        flex: 3,
        fontFamily: 'DMSans-Bold',
        fontSize: 24,
        left: 20,
        color: Colours.BLACK,
        position: 'absolute',
        bottom: 0
    },
    edit: {
        flex: 1,
        fontFamily: 'DMSans-Bold',
        fontSize: 18,
        color: Colours.BLUE,
        position: 'absolute',
        bottom: 2,
        right: 20
    },
    deviceHeader: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20
    },
    bluetoothPrompt: {
        flex: 1,
        margin: 10
    }
});
