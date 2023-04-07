import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colours from '../../../constants/Colours';
import { WideButton } from '../../../components/WideButton/WideButton';
import { normalize } from '../../../utils/normalizer/normalizer';
import { SCREEN_HEIGHT } from '../../../constants/constants';
import { AppContext } from '../../../backgroundMode/context/AppContext';
import { BackgroundMode } from '../../../backgroundMode/models/BackgroundMode';

interface Props {
    navigation: any;
}

export const CallEndedScreen = ({ navigation }: Props) => {
    const { dispatch } = useContext(AppContext);

    Vibration.cancel();

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.head}>
                    <MaterialIcons
                        style={styles.icon}
                        name="call-end"
                        size={normalize(40)}
                        color={Colours.RED}
                    />
                    <Text style={styles.title}>
                        <Text style={styles.red}>911 call</Text> ended
                    </Text>
                </View>
                <Text style={styles.description}>
                    <Text style={styles.blue}>CodeBlue</Text> detected a{' '}
                    <Text style={styles.bold}>cardiac arrest</Text> and placed a
                    911 call
                </Text>
            </View>
            <Text style={styles.description}>
                <Text style={styles.blue}>CodeBlue</Text> detected a{' '}
                <Text style={styles.bold}>cardiac arrest</Text> and placed a 911
                call
            </Text>
            <View style={styles.button}>
                <WideButton
                    text={'Go back Home'}
                    onPress={() => {
                        dispatch({ type: BackgroundMode.MONITOR_HEART });
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colours.WHITE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: normalize(24),
        height: SCREEN_HEIGHT * 0.8
    },
    icon: {
        padding: normalize(24),
        alignSelf: 'center'
    },
    head: {
        width: '72%',
        paddingBottom: normalize(36)
    },
    title: {
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontSize: normalize(36)
    },
    description: {
        flex: 1,
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Regular',
        fontWeight: '400',
        fontSize: normalize(24),
        letterSpacing: normalize(1)
    },
    button: {
        flex: 2,
        alignSelf: 'center',
        marginBottom: normalize(24)
    },
    red: {
        color: Colours.RED
    },
    blue: {
        color: Colours.BLUE
    },
    bold: {
        fontWeight: '600'
    }
});
