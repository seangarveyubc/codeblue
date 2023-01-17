import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colours from '../../../constants/Colours';
import { AddDeviceWidget } from '../../../components/AddDeviceWidget';

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
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 30,
        color: Colours.BLACK,
        fontSize: 24
    }
});
