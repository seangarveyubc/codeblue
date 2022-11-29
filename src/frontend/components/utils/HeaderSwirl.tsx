import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../../../utilities/Colours';
import { Logo } from './Logo';
import { Swirl } from './Swirl';

interface Props {
    title: string;
    height?: number;
}
// Pass in a number <-25 if you want to increase the height and >-25 if you want to decrease
export const HeaderSwirl = ({ title, height }: Props) => {
    return (
        <View>
            <View style={styles.logo}>
                <Logo width={20} height={20} />
                <Text style={styles.codeBlue}>CodeBlue</Text>
            </View>
            <Text style={styles.header}>{title}</Text>
            <View style={{ ...styles.swirl, ...{ bottom: height ?? -25 } }}>
                <Swirl />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
        marginHorizontal: 20
    },
    codeBlue: {
        paddingHorizontal: 5,
        fontFamily: 'DMSans-Bold',
        color: Colours.DARKBLUE,
        fontSize: 16
    },
    header: {
        margin: 20,
        marginVertical: 10,
        fontFamily: 'DMSans-Bold',
        color: Colours.BLACK,
        fontSize: 28
    },
    swirl: {
        flex: 1,
        transform: [{ rotateX: '180deg' }]
    }
});