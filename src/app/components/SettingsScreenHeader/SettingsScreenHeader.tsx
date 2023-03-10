import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Colours from '../../constants/Colours';
import { SCREEN_WIDTH } from '../../constants/constants';
import { normalize } from '../../normalizer/normalizer';
import { BackArrow } from '../BackArrow/BackArrow';

interface Props {
    title: string;
    navigation: any;
}

export const SettingsScreenHeader = ({ navigation, title }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.semicircle}>
                <View style={styles.header}>
                    <BackArrow
                        onPress={() => navigation.goBack()}
                        label={'Back'}
                        colour={Colours.WHITE}
                    />
                    <Text style={styles.text}>{title}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        overflow: 'hidden',
        height: SCREEN_WIDTH / 3
    },
    semicircle: {
        borderRadius: SCREEN_WIDTH,
        width: SCREEN_WIDTH * 2.2,
        height: SCREEN_WIDTH * 2,
        marginLeft: -(SCREEN_WIDTH / 1.66),
        position: 'absolute',
        bottom: normalize(0),
        backgroundColor: Colours.DARKBLUE
    },
    header: {
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: SCREEN_WIDTH / 3,
        width: SCREEN_WIDTH / 1.1,
        position: 'absolute',
        bottom: normalize(0),
        paddingTop: '5%',
        paddingBottom: '10%',
        flexDirection: 'column'
    },
    text: {
        fontSize: normalize(28),
        fontFamily: 'DMSans-Bold',
        alignSelf: 'center',
        color: Colours.WHITE
    }
});
