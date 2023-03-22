import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colours from '../../../constants/Colours';
import { AddDeviceWidget } from '../../../components/AddDeviceWidget/AddDeviceWidget';
import { normalize } from '../../../utils/normalizer/normalizer';

interface Props {
    navigation: any;
}

export const NewDeviceListScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.page}>
            <Text style={styles.title}>Add New Devices</Text>
            <View style={styles.devicelist}>
                <AddDeviceWidget name="default 1"></AddDeviceWidget>
                <AddDeviceWidget name="default 2"></AddDeviceWidget>
                <AddDeviceWidget name="default 3"></AddDeviceWidget>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        height: '100%',
        flexDirection: 'column',
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
    }
});
