import * as React from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Colours from '../../constants/Colours';
import { normalize } from '../../utils/normalizer/normalizer';

interface Props {
    navigation: any;
}

const DELAY_TIME = 2000;

export const AddDeviceScreen = ({ navigation }: Props) => {
    let showLoading: boolean = true;

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('NewDeviceList');
        }, DELAY_TIME);
    }, []);

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Add New Devices</Text>
            <Text style={styles.subtitle}>Scanning for devices...</Text>
            <ActivityIndicator
                style={styles.loader}
                size={normalize(100)}
                color={Colours.BLUE}
                hidesWhenStopped={true}
                animating={showLoading}
            />
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
        marginLeft: normalize(20),
        marginTop: normalize(30),
        color: Colours.BLACK,
        fontSize: normalize(24)
    },
    subtitle: {
        fontFamily: 'DMSans-Regular',
        fontSize: normalize(20),
        color: Colours.BLACK,
        marginTop: normalize(80),
        alignSelf: 'center'
    },
    loader: {
        alignSelf: 'center',
        marginTop: normalize(40)
    }
});
