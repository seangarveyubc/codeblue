import React, { FC, useCallback, useState } from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import { AddDeviceWidget } from '../components/AddDeviceWidget/AddDeviceWidget';
import { CancelButton } from '../components/CancelButton/CancelButton';
import Colours from '../constants/Colours';

type DeviceListProps = {
    devices: Device[];

    connectToPeripheral: (device: Device) => void;
    connectedDevice: Device | null;

    navigation: any;
};

const DeviceList: FC<DeviceListProps> = (props) => {
    const {
        devices,

        connectToPeripheral,

        navigation,
        connectedDevice
    } = props;

    const renderDeviceListItem = useCallback(
        (item: ListRenderItemInfo<Device>) => {
            return (
                <ScrollView>
                    <AddDeviceWidget
                        name={item.item.name ?? item.item.id}
                        item={item}
                        connectToPeripheral={connectToPeripheral}
                        connectedDevice={connectedDevice}
                    />
                </ScrollView>
            );
        },
        [connectToPeripheral]
    );

    return (
        <FlatList
            contentContainerStyle={modalStyle.modalFlatlistContiner}
            data={devices}
            renderItem={renderDeviceListItem}
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

export default DeviceList;
