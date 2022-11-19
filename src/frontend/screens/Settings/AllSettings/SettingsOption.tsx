import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { ForwardArrow } from '../../../components/utils/ForwardArrow';
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
            <Svg width="20" height="100">
                <Path d="M9.70061 18.6328L9.70071 18.6329L9.70681 18.6268C10.0944 18.2392 10.0944 17.6009 9.70681 17.2132L3.18681 10.6932C2.80444 10.3109 2.80444 9.68917 3.18681 9.3068L9.70681 2.7868C10.0944 2.39917 10.0944 1.76087 9.70681 1.37324C9.31918 0.985612 8.68089 0.985612 8.29325 1.37324L1.77325 7.89324C0.615622 9.05087 0.615622 10.9492 1.77325 12.1068L8.29325 18.6268C8.49261 18.8262 8.7473 18.92 9.00003 18.92C9.26011 18.92 9.5095 18.8111 9.70061 18.6328Z" fill="#2075D9"/>
            </Svg>
            <Text style={styles.text}>{title}</Text>
            <ForwardArrow label={""}/>
            {/* </Button> */}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 100,
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2075D9",
        alignItems: 'center'
        // TODO: add correct colour and font
    }
});
