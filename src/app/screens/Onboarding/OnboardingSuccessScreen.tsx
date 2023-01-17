import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../../constants/Colours';
import { CheckmarkAnimation } from '../../components/utils/CheckmarkAnimation';

interface Props {
    navigation: any;
}

const DELAY_TIME = 2500;

export const OnboardingSuccessScreen = ({ navigation }: Props) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Tutorial');
        }, DELAY_TIME);
    }, []);

    return (
        <View style={styles.screenContainer}>
            <CheckmarkAnimation />
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
        color: Colours.WHITE,
        marginTop: 16
    }
});
