import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colours from '../../constants/Colours';
import { normalize } from '../../normalizer/normalizer';

interface Props {
    value: boolean | undefined;
    onValueChange: any;
}

export const CheckBox = ({ value, onValueChange }: Props) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                ...(value ? styles.selected : styles.notSelected)
            }}
            onPress={onValueChange}
        >
            {value && (
                <Icon name="check" size={normalize(20)} color={Colours.WHITE} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: normalize(30),
        width: normalize(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colours.BLUE,
        borderWidth: normalize(1),
        borderRadius: normalize(8)
    },
    notSelected: {
        backgroundColor: Colours.LIGHTGREY
    },
    selected: {
        backgroundColor: Colours.BLUE
    }
});
