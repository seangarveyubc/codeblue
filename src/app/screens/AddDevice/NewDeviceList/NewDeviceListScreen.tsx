import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Button
} from 'react-native';
import Colours from '../../../constants/Colours';
import { AddDeviceWidget } from '../../../components/AddDeviceWidget/AddDeviceWidget';
import { normalize } from '../../../utils/normalizer/normalizer';
import useBLE from '../../../ble/useBLE';
import DeviceModal from '../../../ble/DeviceConnectionModal';

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
    const scanForDevices = () => {
        requestPermissions((isGranted) => {
            if (isGranted) {
                scanForPeripherals();
            }
        });
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setShowLoading(false);
    };

    const openModal = async () => {
        scanForDevices();
        setIsModalVisible(true);
        setShowLoading(false);
    };

    React.useEffect(() => {
        // openModal();
        setTimeout(() => {
            openModal();
            // navigation.navigate('NewDeviceList');
        }, 1000);
    }, []);
    let devicescount = allDevices.length;

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Add New Devices</Text>
            {/* <View style={styles.devicelist}>
                <AddDeviceWidget name="default 1"></AddDeviceWidget>
                <AddDeviceWidget name="default 2"></AddDeviceWidget>
                <AddDeviceWidget name="default 3"></AddDeviceWidget>
            </View> */}
            {/* <Text style={styles.title}>Add New Devices</Text> */}
            {/* <Text style={styles.subtitle}>Scanning for devices...</Text> */}
            {showLoading ? (
                <ActivityIndicator
                    style={styles.loader}
                    size={100}
                    color={Colours.BLUE}
                    hidesWhenStopped={true}
                    animating={showLoading}
                />
            ) : (
                <></>
            )}
            {connectedDevice ? (
                <Text>connected</Text>
            ) : (
                <DeviceModal
                    closeModal={hideModal}
                    visible={isModalVisible}
                    connectToPeripheral={connectToDevice}
                    connectedDevice={connectedDevice}
                    devices={allDevices}
                    navigation={navigation}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        height: '100%',
        // flexDirection: 'column',
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
