import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import Colours from '../../../constants/Colours';
import { AddDeviceWidget } from '../../../components/AddDeviceWidget/AddDeviceWidget';
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

    const scanForDevices = () => {
        requestPermissions((isGranted) => {
            if (isGranted) {
                scanForPeripherals();
            }
        });
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const openModal = async () => {
        scanForDevices();
        setIsModalVisible(true);
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heartRateTitleWrapper}>
                {connectedDevice ? (
                    <>
                        <Text style={styles.heartRateTitleText}>
                            Your Heart Rate Is:
                        </Text>
                        <Text style={styles.heartRateText}>
                            {heartRate} bpm
                        </Text>
                    </>
                ) : (
                    <Text style={styles.heartRateTitleText}>
                        Please Connect to a Heart Rate Monitor
                    </Text>
                )}
            </View>

            <TouchableOpacity
                onPress={connectedDevice ? disconnectFromDevice : openModal}
                style={styles.ctaButton}
            >
                <Text style={styles.ctaButtonText}>
                    {connectedDevice ? 'Disconnect' : 'Connect'}
                </Text>
            </TouchableOpacity>
            <DeviceModal
                closeModal={hideModal}
                visible={isModalVisible}
                connectToPeripheral={connectToDevice}
                devices={allDevices}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    heartRateTitleWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heartRateTitleText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 20,
        color: 'black'
    },
    heartRateText: {
        fontSize: 25,
        marginTop: 15
    },
    ctaButton: {
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 8
    },
    ctaButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
});
//     return (
//         <View style={styles.page}>
//             <Text style={styles.title}>Add New Devices</Text>
//             <View style={styles.devicelist}>
//                 <AddDeviceWidget name="default 1"></AddDeviceWidget>
//                 <AddDeviceWidget name="default 2"></AddDeviceWidget>
//                 <AddDeviceWidget name="default 3"></AddDeviceWidget>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     page: {
//         height: '100%',
//         flexDirection: 'column',
//         backgroundColor: Colours.WHITE
//     },
//     devicelist: {
//         alignItems: 'center'
//     },
//     title: {
//         fontFamily: 'DMSans-Bold',
//         marginLeft: 20,
//         marginTop: 30,
//         marginBottom: 30,
//         color: Colours.BLACK,
//         fontSize: 24
//     }
// });
