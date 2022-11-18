import * as React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    text: string,
    textColour?: string, // todo: update with constant, defaults to black
    colour?: string, // todo: update with constant, defaults to blue
    onPress: () => void,
}

const width = Dimensions.get('window').width

// todo: update with check vector icon
export const WideButton = ({ text, textColour, colour, onPress }: Props) => {
    return (
        <TouchableOpacity 
            style={{...styles.container, ...{backgroundColor: colour ?? '#2075D9'}}}
            onPress={onPress}
        >
            <Text style={{...styles.text, ...{color: textColour ?? '#FFFFFF'}}}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        // todo: add font style
    }
});