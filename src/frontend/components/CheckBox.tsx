import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colours from '../../utilities/Colours';

interface Props {
    value: boolean;
    onValueChange: () => void;
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
            {value && <Icon name="check" size={20} color={Colours.WHITE} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colours.BLUE,
        borderWidth: 1,
        borderRadius: 8
    },
    notSelected: {
        backgroundColor: Colours.LIGHTGREY
    },
    selected: {
        backgroundColor: Colours.BLUE
    }
});
