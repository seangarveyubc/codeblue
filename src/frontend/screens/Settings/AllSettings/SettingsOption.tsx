import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TouchableRipple } from 'react-native-paper';

import Colours from '../../../../utilities/Colours';
import { ForwardArrow } from '../../../components/utils/ForwardArrow';


interface Props {
    navigation: any,
    title: string,
    url: string
}

export const SettingsOption = ({ navigation, title, url }: Props) => {
    return (
        <TouchableRipple style={styles.container} onPress={() => { navigation.navigate(url)}} rippleColor="rgba(0, 0, 0, .32)">
            <View style={styles.row}>
                <Svg style={styles.svg} width="23" height="23" viewBox="0 0 23 23" fill="none">
                    <Path d="M2.66325 22.6875C2.66325 22.6875 0.840332 22.6875 0.840332 20.8646C0.840332 19.0417 2.66325 13.5729 11.7778 13.5729C20.8924 13.5729 22.7153 19.0417 22.7153 20.8646C22.7153 22.6875 20.8924 22.6875 20.8924 22.6875H2.66325ZM11.7778 11.75C13.2282 11.75 14.6192 11.1738 15.6448 10.1482C16.6704 9.12265 17.2466 7.73165 17.2466 6.28125C17.2466 4.83085 16.6704 3.43985 15.6448 2.41426C14.6192 1.38867 13.2282 0.8125 11.7778 0.8125C10.3274 0.8125 8.93643 1.38867 7.91084 2.41426C6.88525 3.43985 6.30908 4.83085 6.30908 6.28125C6.30908 7.73165 6.88525 9.12265 7.91084 10.1482C8.93643 11.1738 10.3274 11.75 11.7778 11.75Z" fill="#115DA9"/>
                </Svg>
                <Text style={styles.text}>{title}</Text>
                <View style={styles.arrow}>
                    <ForwardArrow label={""}/>
                </View>
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 12,
    },
    svg: {
        margin: 5,
        marginHorizontal: 16
    },
    text: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: Colours.BLACK,
        alignItems: 'center',
        fontFamily: 'DM Sans',
    },
    arrow: {
        alignSelf: 'flex-end'
    }
});
