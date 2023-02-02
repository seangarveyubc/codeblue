import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Colours from '../../constants/Colours';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    text: string;
    onChangeText: any;
    isConnected: boolean;
}

export const IconTextInput = ({ text, onChangeText, isConnected }: Props) => {
    return (
        <View style={styles.inputfield}>
            <Icon
                style={styles.icon}
                name={isConnected ? 'broadcast' : 'broadcast-off'}
                size={25}
                color={Colours.BLACK}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="placeholder"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputfield: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        margin: 10,
        height: 60,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colours.BLUE
    },
    input: {
        alignContent: 'center',
        fontFamily: 'DMSans-Regular'
    },
    icon: {
        margin: 5
    }
});
