import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import Colours from '../../constants/Colours';
import { normalize } from '../../normalizer/normalizer';

interface Props {
    label: string;
}

export const ForwardArrow = ({ label }: Props) => {
    return (
        <View style={styles.row}>
            <Svg
                style={styles.svg}
                width={normalize(10)}
                height={normalize(18)}
                viewBox="0 0 10 18"
                fill="none"
            >
                <Path
                    d="M1 1L9 9L1 17"
                    stroke="black"
                    stroke-width={normalize(5)}
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
        padding: normalize(2)
    },
    svg: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: normalize(3),
        marginRight: normalize(12),
        gap: normalize(4)
    },
    text: {
        fontSize: normalize(18),
        fontFamily: 'DMSans-Bold',
        color: Colours.BLUE,
        alignItems: 'center'
    }
});
