import * as React from 'react';
import {
    Button,
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Swirl } from '../components/utils/Swirl';
import { Logo } from '../components/utils/Logo';
import Colours from '../constants/Colours';

interface Props {
    navigation: any;
}

export const SplashScreen = ({ navigation }: Props) => {
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
