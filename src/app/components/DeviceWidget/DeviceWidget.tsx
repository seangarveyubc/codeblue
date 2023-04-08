import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colours from '../../constants/Colours';
import { normalize } from '../../utils/normalizer/normalizer';

interface Props {
    name: string;
    location?: string;
    isConnected: boolean;
}

const windowWidth = Dimensions.get('window').width;

export const DeviceWidget = ({ name, location, isConnected }: Props) => {
    const statusIcon = isConnected ? (
        <Icon name="broadcast" size={normalize(25)} color={Colours.BLACK} />
    ) : (
        <Icon name="broadcast-off" size={normalize(25)} color={Colours.GREY} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                {statusIcon}
                <View style={styles.deviceInfo}>
                    <Text
                        style={{
                            ...styles.deviceName,
                            ...{
                                color: isConnected
                                    ? Colours.BLACK
                                    : Colours.GREY,
                                fontFamily: 'DMSans-Bold'
                            }
                        }}
                    >
                        {name}
                    </Text>
                    <Text style={styles.location}>
                        <Text style={{ fontFamily: 'DMSans-Bold' }}>
                            Placement:
                        </Text>{' '}
                        {location ?? ''}
                    </Text>
                </View>
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
        height: normalize(75),
        width: windowWidth * 0.88,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: normalize(14),
        borderRadius: normalize(12),
        backgroundColor: Colours.LIGHTGREY
    },
    rightContent: {
        alignItems: 'flex-end',
        width: '35%',
        height: '70%'
    },
    leftContent: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    deviceName: {
        fontSize: normalize(16)
    },
    deviceInfo: {
        marginLeft: normalize(10),
        alignItems: 'flex-start',
        width: '80%'
    },
    location: {
        fontSize: normalize(14),
        fontFamily: 'DMSans-Regular',
        color: Colours.GREY
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
        fontFamily: 'DMSans-Bold'
    }
});
