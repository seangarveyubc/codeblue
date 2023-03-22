import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../../constants/Colours';
import { normalize } from '../../utils/normalizer/normalizer';
import { Logo } from '../Logo/Logo';
import { Swirl } from '../Swirl/Swirl';

interface Props {
    title: string;
}
// Pass in a number <-25 if you want to increase the height and >-25 if you want to decrease
export const HeaderSwirl = ({ title }: Props) => {
    return (
        <View>
            <View style={styles.logo}>
                <Logo width={normalize(20)} height={normalize(20)} />
                <Text style={styles.codeBlue}>CodeBlue</Text>
            </View>
            <Text style={styles.header}>{title}</Text>
            <View
                style={{
                    ...styles.swirl,
                    ...{ bottom: normalize(-25) }
                }}
            >
                <Swirl />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: normalize(30),
        marginHorizontal: normalize(20)
    },
    codeBlue: {
        paddingHorizontal: normalize(5),
        fontFamily: 'DMSans-Bold',
        color: Colours.DARKBLUE,
        fontSize: normalize(16)
    },
    header: {
        margin: normalize(20),
        marginVertical: normalize(10),
        fontFamily: 'DMSans-Bold',
        color: Colours.BLACK,
        fontSize: normalize(28)
    },
    swirl: {
        flex: 1,
        transform: [{ rotateX: '180deg' }]
    }
});
