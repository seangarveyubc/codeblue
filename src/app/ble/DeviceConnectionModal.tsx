import React, { FC, useCallback, useState } from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    Modal,
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    View,
    ScrollView
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import { AddDeviceWidget } from '../components/AddDeviceWidget/AddDeviceWidget';
import { CancelButton } from '../components/CancelButton/CancelButton';
import Colours from '../constants/Colours';

type DeviceModalListItemProps = {
    item: ListRenderItemInfo<Device>;
    connectToPeripheral: (device: Device) => void;
    closeModal: () => void;
};

type DeviceModalProps = {
    devices: Device[];
    visible: boolean;
    connectToPeripheral: (device: Device) => void;
    connectedDevice: Device | null;
    closeModal: () => void;
    navigation: any;
};

const DeviceModal: FC<DeviceModalProps> = (props) => {
    const {
        devices,
        visible,
        connectToPeripheral,
        closeModal,
        navigation,
        connectedDevice
    } = props;

    const renderDeviceModalListItem = useCallback(
        (item: ListRenderItemInfo<Device>) => {
            return (
                <ScrollView>
                    <AddDeviceWidget
                        name={item.item.name ?? item.item.id}
                        item={item}
                        connectToPeripheral={connectToPeripheral}
                        connectedDevice={connectedDevice}
                        closeModal={closeModal}
                    />
                </ScrollView>
            );
        },
        [closeModal, connectToPeripheral]
    );

    return (
        <FlatList
            contentContainerStyle={modalStyle.modalFlatlistContiner}
            data={devices}
            renderItem={renderDeviceModalListItem}
        />
    );
};

const modalStyle = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: Colours.WHITE
    },
    modalFlatlistContiner: {
        justifyContent: 'flex-start'
    },
    modalCellOutline: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 8
    },
    modalTitle: {
        flex: 1,
        backgroundColor: Colours.WHITE
    },
    modalTitleText: {
        marginTop: 40,
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 20,
        textAlign: 'center'
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

export default DeviceModal;
