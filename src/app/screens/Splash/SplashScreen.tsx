import * as React from 'react';
import { useEffect } from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Swirl } from '../../components/Swirl/Swirl';
import { Logo } from '../../components/Logo/Logo';
import Colours from '../../constants/Colours';
import { useLocalStorage } from '../../localStorage/hooks/useLocalStorage';
import { SCREEN_NAV_DELAY_TIME } from '../../constants/constants';

interface Props {
    navigation: any;
}

export const SplashScreen = ({ navigation }: Props) => {
    const { isLocalStorageEmpty } = useLocalStorage();

    useEffect(() => {
        setTimeout(() => {
            //if (isLocalStorageEmpty) {
            navigation.navigate('Onboarding');
            //} else {
            //    navigation.navigate('MainNavigator');
            //}
        }, SCREEN_NAV_DELAY_TIME);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                    navigation.navigate('Onboarding');
                }}
            >
                <View style={styles.spacer} />
                <View style={styles.content}>
                    <Text style={styles.title}>CodeBlue</Text>
                    <Logo height={100} width={100} />
                </View>
                <View style={styles.swirl}>
                    <Swirl />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        flexDirection: 'column',
        backgroundColor: Colours.WHITE
    },
    touchable: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    spacer: {
        flex: 1
    },
    content: {
        flex: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        fontFamily: 'DMSans-Bold',
        textAlign: 'center',
        color: Colours.BLUE
    },
    swirl: {
        flex: 2,
        bottom: -60
    }
});
