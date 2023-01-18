import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Colours from '../../constants/Colours';

interface Props {
    title: string;
}

export const SettingsOptionHeading = ({ title }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderColor: Colours.LIGHTGREY
    },
    row: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: 40,
        paddingVertical: 2,
        marginHorizontal: 20
    },
    text: {
        fontSize: 13,
        color: Colours.BLACK,
        alignItems: 'center',
        fontFamily: 'DMSans-Bold'
    }
});
