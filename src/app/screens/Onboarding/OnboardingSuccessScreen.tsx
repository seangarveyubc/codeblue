import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../../constants/Colours';
import { CheckmarkAnimation } from '../../components/CheckmarkAnimation/CheckmarkAnimation';
import { SCREEN_NAV_DELAY_TIME } from '../../constants/constants';
import { useIsFocused } from '@react-navigation/native';

interface Props {
    navigation: any;
}

export const OnboardingSuccessScreen = ({ navigation }: Props) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Tutorial');
        }, SCREEN_NAV_DELAY_TIME);
    }, [isFocused]);

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
