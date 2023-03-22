import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import Colours from '../../constants/Colours';
import { normalize } from '../../utils/normalizer/normalizer';

interface Props {
    label: string;
    onPress: any;
    colour?: string;
}

export const BackArrow = ({ label, onPress, colour }: Props) => {
    return (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <Svg
                style={styles.svg}
                width={normalize(11)}
                height={normalize(20)}
                viewBox="0 0 11 20"
                fill="none"
            >
                <Path
                    d="M9.70061 1.36722L9.70071 1.36711L9.70681 1.3732C10.0944 1.76083 10.0944 2.39913 9.70681 2.78676L3.18681 9.30676C2.80444 9.68913 2.80444 10.3108 3.18681 10.6932L9.70681 17.2132C10.0944 17.6008 10.0944 18.2391 9.70681 18.6268C9.31918 19.0144 8.68089 19.0144 8.29325 18.6268L1.77325 12.1068C0.615622 10.9491 0.615622 9.05083 1.77325 7.8932L8.29325 1.3732C8.49261 1.17385 8.7473 1.07998 9.00003 1.07998C9.26011 1.07998 9.5095 1.18885 9.70061 1.36722Z"
                    fill={colour ? colour : Colours.BLUE}
                    stroke={colour ?? Colours.BLUE}
                    stroke-width={normalize(0.5)}
                />
            </Svg>
            <Text
                style={{
                    ...styles.text,
                    ...{ color: colour ? colour : Colours.BLUE }
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
