import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colours from '../../constants/Colours';

interface Props {
    heartRate: number;
}

export const HeartRateWidget = ({ heartRate }: Props) => {
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        if (heartRate) {
            setActive(true);
        } else {
            setActive(false);
        }
    });
    // Had to use in-line styling for the heart rate text because of its dependacy on the incoming heart rate value
    return (
        <View style={styles.widget}>
            <View style={styles.text}>
                <Text
                    style={{
                        flex: 0.4,
                        fontSize: 16,
                        color: active ? Colours.BLACK : Colours.GREY
                    }}
                >
                    {'Heart Rate'}
                </Text>
                <View style={styles.bpm}>
                    <Text
                        style={{
                            fontSize: 50,
                            color: active ? Colours.BLACK : Colours.GREY
                        }}
                    >
                        {active ? heartRate : '----'}
                    </Text>
                    <Text
                        style={{
                            marginBottom: 10,
                            fontSize: 20,
                            color: active ? Colours.BLACK : Colours.GREY
                        }}
                    >
                        {'bpm'}
                    </Text>
                </View>
            </View>
            <Image
                source={require('../../assets/heartRate.png')} //Change your icon image here
                style={styles.ImageStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    widget: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 20,
        height: 170,
        borderRadius: 20,
        backgroundColor: Colours.LIGHTBLUE,
        fontFamily: 'DMSans-Regular'
    },
    text: {
        flex: 0.5,
        flexDirection: 'column',
        fontFamily: 'DMSans-Regular'
    },
    bpm: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    ImageStyle: {}
});
