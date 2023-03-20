import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Button,
    ScrollView
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
    const [temp, setTemp] = React.useState<string>('');
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
    const connect = async () => {
        const services = await connectedDevice!.services();
        const char = await services[11].characteristics();

        console.log(char[0].serviceUUID);

        connectedDevice!.monitorCharacteristicForService(
            char[0].serviceUUID,
            char[0].uuid,
            (error, characteristic) => {
                console.log(characteristic);
                setTemp(characteristic?.value || '');
            }
        );
    };

    React.useEffect(() => {
        setTimeout(() => {
            openModal();
        }, 1000);
    }, []);
    let devicescount = allDevices.length;

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Add New Devices</Text>

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
                <>
                    <Text>{temp}</Text>
                    <Button onPress={disconnectFromDevice} title="Close" />
                    <Button onPress={connect} title="Read Update" />
                </>
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
