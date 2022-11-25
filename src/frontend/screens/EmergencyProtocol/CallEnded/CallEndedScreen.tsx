import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colours from '../../../../utilities/Colours';
import { WideButton } from '../../../components/utils/WideButton';

interface Props {
    navigation: any;
}

const windowHeight = Dimensions.get('window').height;

export const CallEndedScreen = ({ navigation }: Props) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.head}>
                    <MaterialIcons
                        style={styles.icon}
                        name="call-end"
                        size={40}
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
                <View style={styles.button}>
                    <WideButton
                        text={'Go back Home'}
                        onPress={() => {
                            navigation.navigate('MainNavigator');
                        }}
                    />
                </View>
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
        margin: 12,
        height: windowHeight * 0.9
    },
    icon: {
        padding: 24,
        alignSelf: 'center'
    },
    head: {
        width: '72%',
        marginBottom: 36
    },
    title: {
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontSize: 36
    },
    description: {
        flex: 1,
        marginBottom: 15,
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Regular',
        fontWeight: '400',
        fontSize: 24,
        padding: 48,
        letterSpacing: 1
    },
    button: {
        alignSelf: 'flex-end',
        marginBottom: 15
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
