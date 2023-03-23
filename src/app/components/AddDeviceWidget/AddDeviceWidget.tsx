import * as React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import { Button } from 'react-native-paper';
import Colours from '../../constants/Colours';
import { SCREEN_WIDTH } from '../../constants/constants';
import { normalize } from '../../utils/normalizer/normalizer';
import { useLocalStorage } from '../../localStorage/hooks/useLocalStorage';
import { DeviceKeys } from '../../localStorage/models/LocalStorageKeys';
import { UnderlineTextInput } from '../UnderlineTextInput/UnderlineTextInput';

interface Props {
    name: string;
    item: any;
    connectToPeripheral: (device: Device) => void;
    connectedDevice: Device | null;
}

const windowWidth = Dimensions.get('window').width;

export const AddDeviceWidget = ({
    name,
    item,
    connectToPeripheral,
    connectedDevice
}: Props) => {
    const [text, onChangetext] = React.useState(name);
    const [connected, onChangeConnected] = React.useState(false);
    const [isEditing, onChangeEditing] = React.useState(false);
    const [isSaved, onChangeSaved] = React.useState(false);
    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
    const { appDataStorage, saveDevice } = useLocalStorage();

    // Not handling the edit name, save name feature right now

    const handleClick = async () => {
        connectToPeripheral(item.item);
        saveDevice(item.item.id);
        // if (connected) {
        //     setIsModalVisible(true);

        //     onChangeEditing((isEditing) => !isEditing);
        // } else {
        //     !isEditing && !isSaved
        //         ? onChangeEditing((isEditing) => !isEditing)
        //         : isEditing && !isSaved
        //         ? onChangeSaved((isSaved) => !isSaved)
        //         : onChangeSaved((isSaved) => isSaved);
        // }
    };
    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                {!isEditing || isSaved ? (
                    <Text>{text}</Text>
                ) : (
                    <UnderlineTextInput
                        text={text}
                        onChangeText={onChangetext}
                        title=""
                        placeholder={name}
                    ></UnderlineTextInput>
                )}
            </View>

            <View style={styles.rightContent}>
                <TouchableOpacity onPress={handleClick}>
                    <View
                        style={{
                            ...styles.statusBar,
                            ...{
                                backgroundColor:
                                    isEditing && !isSaved
                                        ? Colours.LIGHTGREEN
                                        : isEditing && isSaved
                                        ? Colours.GREEN
                                        : Colours.LIGHTBLUE
                            }
                        }}
                    >
                        <Text
                            style={{
                                ...styles.statusText,
                                ...{
                                    color:
                                        isEditing && !isSaved
                                            ? Colours.BLACK
                                            : isEditing && isSaved
                                            ? Colours.WHITE
                                            : Colours.BLACK
                                }
                            }}
                        >
                            {isEditing && !isSaved
                                ? 'Save Device'
                                : isEditing && isSaved
                                ? 'Saved'
                                : 'Add Device'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const modalStyle = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    modalFlatlistContiner: {
        flex: 1,
        justifyContent: 'center'
    },
    modalCellOutline: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 8
    },
    modalTitle: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    modalTitleText: {
        marginTop: 40,
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 20,
        textAlign: 'center'
    },
    ctaButton: {
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 8
    },
    ctaButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
});

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
    }
});
