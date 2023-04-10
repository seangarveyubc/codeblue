import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import Colours from '../../constants/Colours';
import { SCREEN_WIDTH } from '../../constants/constants';
import { normalize } from '../../utils/normalizer/normalizer';
import { useLocalStorage } from '../../localStorage/hooks/useLocalStorage';
import { UnderlineTextInput } from '../UnderlineTextInput/UnderlineTextInput';
import { useIsFocused } from '@react-navigation/native';

interface Props {
    name: string;
    item: any;
    connectToPeripheral: (device: Device) => void;
    disconnectDevice: () => void;
    connectedDevice: Device | null;
}

export const AddDeviceWidget = ({
    name,
    item,
    connectToPeripheral,
    disconnectDevice,
    connectedDevice
}: Props) => {
    const [text, onChangetext] = React.useState(name);
    // const [isEditing, onChangeEditing] = React.useState(false);
    // const [isSaved, onChangeSaved] = React.useState(false);
    const [isConnected, setConnected] = React.useState(false);
    const [showLoading, setShowLoading] = React.useState(false);
    const { appDataStorage } = useLocalStorage();
    const isFocused = useIsFocused();

    React.useEffect(() => {
        checkConnected();
    }, [isFocused]);

    const checkConnected = () => {
        if (item.item) {
            item.item.isConnected().then((connected: boolean) => {
                console.log(connected);
                setConnected(connected);
            });
        }
    };
    // TODO: Change handleClick to use connected device to determine state of connection
    const handleClick = async () => {
        if (isConnected) {
            console.log('dis');
            disconnectDevice();
            setConnected(false);
        } else {
            connectToPeripheral(item.item);
            setShowLoading(true);
            setTimeout(() => {
                if (item.item) {
                    item.item.isConnected().then((connected: boolean) => {
                        setConnected(connected);
                        if (connected) {
                            console.log('Adding device to local storage');
                            appDataStorage.addDevice({
                                id: item.item.id,
                                name: item.item.name,
                                location: 'N/A'
                            });
                        }
                    });
                }
                setShowLoading(false);
            }, 2000);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                {
                    /* {!isEditing || isSaved ? (*/
                    <Text>{text}</Text>
                    /*) : (
                    <UnderlineTextInput
                        text={text}
                        onChangeText={onChangetext}
                        title=""
                        placeholder={name}
                    ></UnderlineTextInput>
                )} */
                }
            </View>

            <View style={styles.rightContent}>
                {!showLoading ? (
                    <TouchableOpacity onPress={handleClick}>
                        <View
                            style={{
                                ...styles.statusBar,
                                ...{
                                    backgroundColor: isConnected
                                        ? Colours.GREEN
                                        : Colours.LIGHTBLUE
                                }
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.statusText,
                                    ...{
                                        color: isConnected
                                            ? Colours.WHITE
                                            : Colours.BLACK
                                    }
                                }}
                            >
                                {isConnected ? 'Disconnect' : 'Add Device'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <ActivityIndicator
                        style={styles.loader}
                        size={25}
                        color={Colours.BLUE}
                        hidesWhenStopped={true}
                        animating={showLoading}
                    />
                )}
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
        padding: normalize(14)
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
        fontSize: normalize(18),
        fontFamily: 'DMSans-Regular',
        color: Colours.BLACK
    },
    statusBar: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(8),
        paddingHorizontal: normalize(10)
    },
    statusText: {
        fontSize: normalize(15),
        fontFamily: 'DMSans-Regular'
    },
    loader: {
        alignSelf: 'center',
        marginTop: normalize(0)
    }
});
