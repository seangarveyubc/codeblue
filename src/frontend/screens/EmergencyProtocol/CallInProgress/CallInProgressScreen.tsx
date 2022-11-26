import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colours from '../../../../utilities/Colours';
import { WideButton } from '../../../components/utils/WideButton';

interface Props {
    navigation: any;
}

const windowHeight = Dimensions.get('window').height;

export const CallInProgressScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <View>
                <Ionicons
                    style={styles.icon}
                    name="alert-circle"
                    size={40}
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
                    navigation.navigate('CallEnded');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colours.WHITE,
        padding: 12,
        margin: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: windowHeight * 0.9
    },
    icon: {
        padding: 24,
        alignSelf: 'center'
    },
    head: {
        width: '68%'
    },
    title: {
        marginBottom: 15,
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontSize: 36
    },
    description: {
        marginBottom: 15,
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontWeight: '400',
        fontSize: 24
    },
    cancelDescription: {
        marginBottom: 15,
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontWeight: '400',
        fontSize: 18
    },
    red: {
        color: Colours.RED
    }
});
