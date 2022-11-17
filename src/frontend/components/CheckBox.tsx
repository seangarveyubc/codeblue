import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    value: boolean,
    onValueChange: () => void,
}

// todo: update with check vector icon
export const CheckBox = ({ value, onValueChange }: Props) => {
    return (
        <TouchableOpacity 
            style={{...styles.container, ...value ? styles.selected : styles.notSelected}}
            onPress={onValueChange}
        >
            {value && <Text style={{color: '#FFFFFF'}}>hi</Text>} 
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#115DA9', // todo: update with constant
        borderWidth: 1,
        borderRadius: 8,
    },
    notSelected: {
        backgroundColor: '#F6F6F6', // todo: update with constant
    },
    selected: {
        backgroundColor: '#115DA9', // todo: update with constant
    },
});