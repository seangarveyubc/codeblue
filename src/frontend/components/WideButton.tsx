import * as React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colours from '../../utilities/Colours';

interface Props {
    text: string;
    textColour?: string; // defaults to blue
    colour?: string; // defaults to white
    onPress: () => void;
}

const width = Dimensions.get('window').width;

export const WideButton = ({ text, textColour, colour, onPress }: Props) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                ...{ backgroundColor: colour ?? Colours.BLUE }
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    ...styles.text,
                    ...{ color: textColour ?? Colours.WHITE }
                }}
            >
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
        borderRadius: 8
    },
    text: {
        fontSize: 17,
        fontFamily: 'DMSans-Bold'
    }
});
