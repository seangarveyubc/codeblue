import React from 'react';
import Colours from '../../../utilities/Colours';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
    label: string,
}

export const ForwardArrow = ({ label }: Props) => {
    return (
        <View style={styles.row}>
            <Svg width="10" height="18" viewBox="0 0 10 18" fill="none">
                <Path d="M1 1L9 9L1 17" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 100
    },
    text: {
        fontSize: 12,
        fontWeight: "600",
        color: Colours.BLUE,
        alignItems: 'center'
        // TODO: add font
    }
});
