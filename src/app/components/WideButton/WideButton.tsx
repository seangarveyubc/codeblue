import * as React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colours from '../../constants/Colours';
import { SCREEN_WIDTH } from '../../constants/constants';
import { normalize } from '../../utils/normalizer/normalizer';

interface Props {
    text: string;
    textColour?: string; // defaults to blue
    colour?: string; // defaults to white
    onPress: () => void;
}

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
        height: normalize(45),
        width: SCREEN_WIDTH * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(8)
    },
    text: {
        fontSize: normalize(17),
        fontFamily: 'DMSans-Bold'
    }
});
