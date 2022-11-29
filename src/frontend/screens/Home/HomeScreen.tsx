import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';

import Colours from '../../../utilities/Colours';
import { Logo } from '../../components/utils/Logo';
import { HeaderSwirl } from '../../components/utils/HeaderSwirl';
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
    <KeyboardAvoidingView
        behavior='padding'
        style={{ flex: 1 }}
        >
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <HeaderSwirl title="Test Name" />
                    <View style={styles.heartContainer}>
                        <HeartRateWidget heartRate={56} />
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
                                    <View style={{paddingBottom: 15}}>
                                        <DeviceWidget
                                            name={deviceName1}
                                            isConnected={true}
                                        />
                                    </View>
                                    <View style={{paddingBottom: 15}}>
                                        <DeviceWidget
                                            name={deviceName2}
                                            isConnected={false}
                                        />
                                    </View>
                                </CentredContent>
                            </View>
                        ) : (
                            <View
                                style={{ flex: bluetoothState ? 7 : 6, marginTop: 10 }}
                            >
                                <CentredContent>
                                    <View style={{width:'88%'}}>
                                        <IconTextInput
                                            text={deviceName1}
                                            isConnected={true}
                                            onChangeText={(text) => changeDeviceName1(text)}
                                        />
                                    </View>
                                    <View style={{width:'88%'}}>
                                        <IconTextInput
                                            text={deviceName2}
                                            isConnected={false}
                                            onChangeText={(text) => changeDeviceName2(text)}
                                        />
                                    </View>
                                </CentredContent>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    </KeyboardAvoidingView>
    );};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: Colours.WHITE,
        padding: 0
    },
    inner: {
        padding: 0,
        flex: 1,
        justifyContent: "flex-end",
    },
    header: {
        fontSize: 36,
        marginBottom: 48,
    },
    input: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36,
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12,
    },
    heartContainer: {
        paddingTop: 20
    },
    devicesContainer: {
        flex: 2
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
