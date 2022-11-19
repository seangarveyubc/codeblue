import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { BackArrow } from '../../../components/utils/BackArrow';
import Svg, { Path } from 'react-native-svg';

interface Props {
    navigation: any,
    title: string,
    url: string
}

export const SettingsOption = ({ navigation, title, url }: Props) => {
    return (
        <View style={styles.row}>
            {/* <Button title={title} onClick={() => { navigation.navigate(url)}}> */}
            <Svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                <Path d="M2.66325 22.6875C2.66325 22.6875 0.840332 22.6875 0.840332 20.8646C0.840332 19.0417 2.66325 13.5729 11.7778 13.5729C20.8924 13.5729 22.7153 19.0417 22.7153 20.8646C22.7153 22.6875 20.8924 22.6875 20.8924 22.6875H2.66325ZM11.7778 11.75C13.2282 11.75 14.6192 11.1738 15.6448 10.1482C16.6704 9.12265 17.2466 7.73165 17.2466 6.28125C17.2466 4.83085 16.6704 3.43985 15.6448 2.41426C14.6192 1.38867 13.2282 0.8125 11.7778 0.8125C10.3274 0.8125 8.93643 1.38867 7.91084 2.41426C6.88525 3.43985 6.30908 4.83085 6.30908 6.28125C6.30908 7.73165 6.88525 9.12265 7.91084 10.1482C8.93643 11.1738 10.3274 11.75 11.7778 11.75Z" fill="#115DA9"/>
            </Svg>
            <Text style={styles.text}>{title}</Text>
            <View style={{alignSelf: 'flex-end'}}>
                <BackArrow label={"Back"}/>
            </View>
            {/* </Button> */}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 100
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2075D9",
        alignItems: 'center'
        // TODO: add correct colour and font
    }
});
