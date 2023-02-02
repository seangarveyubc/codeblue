import * as React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colours from '../../constants/Colours';

interface Props {
    text: string;
    textColour?: string; // defaults to blue
    colour?: string; // defaults to white
    disabled?: boolean; // defaults to false
    onPress: () => void;
}

const windowWidth = Dimensions.get('window').width;

export const WideButton = ({
    text,
    textColour,
    colour,
    disabled,
    onPress
}: Props) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                ...{ backgroundColor: colour ?? Colours.BLUE }
            }}
            onPress={onPress}
            disabled={disabled ?? false}
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
        width: windowWidth * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    text: {
        fontSize: 17,
        fontFamily: 'DMSans-Bold'
    }
});
