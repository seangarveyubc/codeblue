import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colours from '../../../../utilities/Colours'

interface Props {
    navigation: any;
}

export const NewDeviceListScreen = ({ navigation }: Props) => {
    return (
    <View style={styles.page}>
        <Text style={styles.title}>Add New Devices</Text>
    </View>
);
};

const styles = StyleSheet.create({
    page: {
        height: '100%',
        flexDirection: 'column',
        backgroundColor: Colours.WHITE
    },
    title: {
        fontFamily: 'DMSans-Bold',
        marginLeft: 20,
        marginTop: 30,
        color: Colours.BLACK,
        fontSize: 24
    },
});