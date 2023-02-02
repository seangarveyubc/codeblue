import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import Colours from '../../constants/Colours';

interface Props {
    label: string;
}

export const ForwardArrow = ({ label }: Props) => {
    return (
        <View style={styles.row}>
            <Svg
                style={styles.svg}
                width="10"
                height="18"
                viewBox="0 0 10 18"
                fill="none"
            >
                <Path
                    d="M1 1L9 9L1 17"
                    stroke="black"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </Svg>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2
    },
    svg: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
        marginRight: 12,
        gap: '4px'
    },
    text: {
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        color: Colours.BLUE,
        alignItems: 'center'
    }
});
