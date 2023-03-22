import { AuthorizationStatus } from '@notifee/react-native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colours from '../../constants/Colours';
import { normalize } from '../../utils/normalizer/normalizer';

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
                        fontSize: normalize(16),
                        fontFamily: 'DMSans-Regular',
                        color: active ? Colours.BLACK : Colours.GREY
                    }}
                >
                    {'Heart Rate'}
                </Text>
                <View style={styles.bpm}>
                    <Text
                        style={{
                            fontSize: normalize(50),
                            fontFamily: 'DMSans-Medium',
                            color: active ? Colours.BLACK : Colours.GREY
                        }}
                    >
                        {active ? heartRate : '----'}
                    </Text>
                    <Text
                        style={{
                            marginBottom: normalize(10),
                            fontSize: normalize(20),
                            fontFamily: 'DMSans-Regular',
                            color: active ? Colours.BLACK : Colours.GREY
                        }}
                    >
                        {'bpm'}
                    </Text>
                </View>
            </View>
            <View style={styles.ImageStyle}>
                <Image
                    source={require('../../assets/heartRate.png')} //Change your icon image here
                    style={{
                        resizeMode: 'contain',
                        height: '100%',
                        width: '100%'
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    widget: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: normalize(20),
        height: normalize(170),
        borderRadius: normalize(20),
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
    ImageStyle: {
        height: '60%',
        width: '40%'
    }
});
