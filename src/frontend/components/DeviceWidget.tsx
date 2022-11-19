import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface Props {
    name: string,
    isConnected: boolean,
}

const width = Dimensions.get('window').width

// todo: update with connected state vector icon
export const DeviceWidget = ({ name, isConnected }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                {/* TODO: Device icon based on state (text placeholder for now), update to color constants */}
                <Text style={{...styles.icon, ...{color: isConnected ? '#000000' : '#757575'}}}>hi</Text>
                <Text style={{...styles.deviceName, ...{color: isConnected ? '#000000' : '#757575'}}}>
                    {name}
                </Text>
            </View>
            <View style={styles.rightContent}>
                <View style={{...styles.statusBar, ...{backgroundColor: isConnected ? '#B6EAA4' : '#757575'}}}>
                    <Text style={{...styles.statusText, ...{color: isConnected ? '#000000' : '#FFFFFF'}}}>
                        {isConnected ? 'Connected' : 'Offline'}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: width * 0.88,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#F6F6F6' // todo: update to constant
    },
    rightContent: {
        alignItems: 'flex-end',
        width: '35%'
    },
    leftContent: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    icon: {
        marginRight: 12,
    },
    deviceName: {
        fontSize: 16,
        fontWeight: 'bold',
        // todo: add font
    },
    statusBar: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    statusText: {
        fontSize: 15,
        // todo: add font
    },
});
