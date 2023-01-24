import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import { HeaderSwirl } from '../../components/HeaderSwirl/HeaderSwirl';
import { HeartRateWidget } from '../../components/HeartRateWidget/HeartRateWidget';
import { CentredContent } from '../../components/CentredContent/CentredContent';
import { DeviceWidget } from '../../components/DeviceWidget/DeviceWidget';
import IconTextInput from '../../components/IconTextInput/IconTextInput';
import Colours from '../../constants/Colours';
import { Link } from '@react-navigation/native';

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
            <ScrollView>
                <View style={styles.header}>
                    <HeaderSwirl title="Test Name" height={250} />
                </View>

                <SafeAreaView>
                    <View style={styles.inner}>
                        <View style={styles.devicesContainer}>
                            <View style={styles.deviceHeader}>
                                <Text style={styles.yourDevices}>
                                    Your Devices
                                </Text>
                                <Text
                                    style={styles.edit}
                                    onPress={toggleChecked}
                                >
                                    {deviceListState ? 'Edit' : 'Save'}
                                </Text>
                            </View>
                            {!bluetoothState ? (
                                <View style={styles.bluetoothPrompt}>
                                    <CentredContent>
                                        <Text
                                            style={styles.bluetoothDescription}
                                        >
                                            CodeBlue requires Bluetooth to
                                            monitor cardiovascular data.
                                            <Link
                                                to={{ screen: 'Settings' }}
                                                style={styles.bluetoothLink}
                                            >
                                                <Text>Turn on Bluetooth.</Text>
                                            </Link>
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
                                                location={'hand'}
                                            />
                                        </View>
                                        <View style={{ paddingBottom: 15 }}>
                                            <DeviceWidget
                                                name={deviceName2}
                                                isConnected={false}
                                                location={'foot'}
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
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

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
        justifyContent: 'flex-end'
    },
    header: { height: '15%' },
    devicesContainer: {
        paddingTop: 44,
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
    },
    bluetoothDescription: {
        marginHorizontal: 2
    },
    bluetoothLink: {
        color: Colours.BLUE
    }
});
