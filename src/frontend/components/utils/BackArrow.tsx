import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import Colours from '../../../utilities/Colours';

interface Props {
    label: string;
}

export const BackArrow = ({ label }: Props) => {
    return (
        <View style={styles.row}>
            <Svg
                style={styles.svg}
                width="11"
                height="20"
                viewBox="0 0 11 20"
                fill="none"
            >
                <Path
                    d="M9.70061 1.36722L9.70071 1.36711L9.70681 1.3732C10.0944 1.76083 10.0944 2.39913 9.70681 2.78676L3.18681 9.30676C2.80444 9.68913 2.80444 10.3108 3.18681 10.6932L9.70681 17.2132C10.0944 17.6008 10.0944 18.2391 9.70681 18.6268C9.31918 19.0144 8.68089 19.0144 8.29325 18.6268L1.77325 12.1068C0.615622 10.9491 0.615622 9.05083 1.77325 7.8932L8.29325 1.3732C8.49261 1.17385 8.7473 1.07998 9.00003 1.07998C9.26011 1.07998 9.5095 1.18885 9.70061 1.36722Z"
                    fill="#2075D9"
                    stroke="#2075D9"
                    stroke-width="0.5"
                />
            </Svg>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
