import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    Button
} from 'react-native';
import Colours from '../../../constants/Colours';
import { AddDeviceWidget } from '../../../components/AddDeviceWidget/AddDeviceWidget';
import { normalize } from '../../../utils/normalizer/normalizer';
import useBLE from '../../../ble/useBLE';
import { HeartRateWidget } from '../../../components/HeartRateWidget/HeartRateWidget';
import DeviceList from '../../../ble/DeviceConnectionList';

interface Props {
    navigation: any;
}

export const NewDeviceListScreen = ({ navigation }: Props) => {
    const {
        requestPermissions,
        scanForPeripherals,
        allDevices,
        connectToDevice,
        connectedDevice,
        heartRate,
        disconnectFromDevice
    } = useBLE();

    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
    const [showLoading, setShowLoading] = React.useState<boolean>(true);
    const [temp, setTemp] = React.useState<string>('');
    const scanForDevices = () => {
        requestPermissions((isGranted: any) => {
            if (isGranted) {
                scanForPeripherals();
            }
        });
    };

    React.useEffect(() => {
        setTimeout(() => {
            scanForDevices();
            setShowLoading(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Add New Devices</Text>
            {showLoading && (
                <ActivityIndicator
                    style={styles.loader}
                    size={100}
                    color={Colours.BLUE}
                    hidesWhenStopped={true}
                    animating={showLoading}
                />
            )}
            <DeviceList
                connectToPeripheral={connectToDevice}
                disconnectDevice={disconnectFromDevice}
                connectedDevice={connectedDevice}
                devices={allDevices}
                navigation={navigation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: Colours.WHITE
    },
    devicelist: {
        alignItems: 'center'
    },
    title: {
        fontFamily: 'DMSans-Bold',
        marginLeft: normalize(20),
        marginTop: normalize(30),
        marginBottom: normalize(30),
        color: Colours.BLACK,
        fontSize: normalize(24)
    },
    loader: {
        alignSelf: 'center',
        marginTop: 40
    }
});
