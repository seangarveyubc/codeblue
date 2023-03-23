import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colours from '../../../constants/Colours';
import { WideButton } from '../../../components/WideButton/WideButton';
import { normalize } from '../../../utils/normalizer/normalizer';
import { SCREEN_HEIGHT } from '../../../constants/constants';
import { AppContext } from '../../../backgroundMode/context/AppContext';
import { BackgroundMode } from '../../../backgroundMode/models/BackgroundMode';

interface Props {
    navigation: any;
}

export const CallInProgressScreen = ({ navigation }: Props) => {
    const { dispatch } = React.useContext(AppContext);

    return (
        <View style={styles.container}>
            <View>
                <Ionicons
                    style={styles.icon}
                    name="alert-circle"
                    size={normalize(40)}
                    color={Colours.RED}
                />
                <Text style={styles.title}>
                    <Text style={styles.red}>Cardiac arrest</Text> detected
                </Text>
            </View>
            <Text style={styles.description}>911 call in progress</Text>
            {/* temp button used for development purposes */}
            <WideButton
                text={'Go to call ended screen'}
                onPress={() => {
                    dispatch({ type: BackgroundMode.CALL_ENDED });
                    navigation.navigate('CallEnded');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colours.WHITE,
        padding: normalize(12),
        margin: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: SCREEN_HEIGHT * 0.9
    },
    icon: {
        padding: normalize(24),
        alignSelf: 'center'
    },
    head: {
        width: '68%'
    },
    title: {
        marginBottom: normalize(15),
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontSize: normalize(36)
    },
    description: {
        marginBottom: normalize(15),
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontWeight: '400',
        fontSize: normalize(24)
    },
    cancelDescription: {
        marginBottom: normalize(15),
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontWeight: '400',
        fontSize: normalize(18)
    },
    red: {
        color: Colours.RED
    }
});
