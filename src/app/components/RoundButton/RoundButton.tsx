import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colours from '../../constants/Colours';
import { normalize } from '../../normalizer/normalizer';

interface Props {
    text: string;
    textColour?: string; // defaults to blue
    colour?: string; // defaults to white
    onPress: () => void;
}

export const RoundButton = ({ text, textColour, colour, onPress }: Props) => {
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
        width: '85%',
        height: normalize(48),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(48),
        margin: normalize(12)
    },
    text: {
        fontSize: normalize(18),
        fontFamily: 'DMSans-Bold'
    }
});
