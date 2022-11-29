import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colours from '../../assets/constants/Colours';

interface Props {
    onPress: () => void;
}

export const CancelButton = ({ onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        fontWeight: '500',
        color: Colours.RED,
        lineHeight: 24
    }
});
