import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../../../utilities/Colours';

interface Props {
    navigation: any;
}

export const OnboardingSuccessScreen = ({ navigation }: Props) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Tutorial');
        }, 2500);
    }, []);

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.welcomeText}>Welcome to CodeBlue!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: Colours.BLUE,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    welcomeText: {
        fontFamily: 'DMSans-Bold',
        fontSize: 20,
        color: Colours.WHITE
    }
});
