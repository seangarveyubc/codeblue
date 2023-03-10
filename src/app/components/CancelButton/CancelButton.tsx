import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colours from '../../constants/Colours';
import { normalize } from '../../normalizer/normalizer';

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
        fontSize: normalize(18),
        fontFamily: 'DMSans-Bold',
        fontWeight: '500',
        color: Colours.RED,
        lineHeight: normalize(24)
    }
});
