import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colours from '../../constants/Colours';
import { SCREEN_WIDTH } from '../../constants/constants';
import { normalize } from '../../normalizer/normalizer';

interface Props {
    name: string;
    isConnected: boolean;
}

export const DeviceWidget = ({ name, isConnected }: Props) => {
    const statusIcon = isConnected ? (
        <Icon name="broadcast" size={normalize(25)} color={Colours.BLACK} />
    ) : (
        <Icon name="broadcast-off" size={normalize(25)} color={Colours.GREY} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                {statusIcon}
                <Text
                    style={{
                        ...styles.deviceName,
                        ...{
                            color: isConnected ? Colours.BLACK : Colours.GREY,
                            fontFamily: isConnected
                                ? 'DMSans-Bold'
                                : 'DMSans-Regular'
                        }
                    }}
                >
                    {name}
                </Text>
            </View>
            <View style={styles.rightContent}>
                <View
                    style={{
                        ...styles.statusBar,
                        ...{
                            backgroundColor: isConnected
                                ? Colours.LIGHTGREEN
                                : Colours.GREY
                        }
                    }}
                >
                    <Text
                        style={{
                            ...styles.statusText,
                            ...{
                                color: isConnected
                                    ? Colours.BLACK
                                    : Colours.WHITE
                            }
                        }}
                    >
                        {isConnected ? 'Connected' : 'Offline'}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: normalize(60),
        width: SCREEN_WIDTH * 0.88,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: normalize(14),
        borderRadius: normalize(12),
        backgroundColor: Colours.LIGHTGREY
    },
    rightContent: {
        alignItems: 'flex-end',
        width: '35%'
    },
    leftContent: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    deviceName: {
        marginLeft: normalize(10),
        fontSize: normalize(16)
    },
    statusBar: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(8)
    },
    statusText: {
        fontSize: normalize(15),
        fontFamily: 'DMSans-Regular'
    }
});
