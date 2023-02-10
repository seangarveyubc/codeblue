import * as React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import Colours from '../../constants/Colours';
import UnderLineTextInput from '../UnderLineTextInput/UnderLineTextInput';

interface Props {
    name: string;
    item: any;
    connectToPeripheral: (device: Device) => void;
    closeModal: () => void;
}

const windowWidth = Dimensions.get('window').width;

export const AddDeviceWidget = ({
    name,
    item,
    connectToPeripheral,
    closeModal
}: Props) => {
    const [text, onChangetext] = React.useState(name);
    const [isEditing, onChangeEditing] = React.useState(false);
    const [isSaved, onChangeSaved] = React.useState(false);

    const connectAndCloseModal = React.useCallback(() => {
        connectToPeripheral(item.item);
        // closeModal();
    }, [closeModal, connectToPeripheral, item.item]);
    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                {!isEditing || isSaved ? (
                    <Text>{text}</Text>
                ) : (
                    <UnderLineTextInput
                        text={text}
                        onChangeText={onChangetext}
                        title=""
                        placeholder={name}
                    ></UnderLineTextInput>
                )}
            </View>

            <View style={styles.rightContent}>
                <TouchableOpacity
                    onPress={() => {
                        connectAndCloseModal();
                        !isEditing && !isSaved
                            ? onChangeEditing((isEditing) => !isEditing)
                            : isEditing && !isSaved
                            ? onChangeSaved((isSaved) => !isSaved)
                            : onChangeSaved((isSaved) => isSaved);
                    }}
                >
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

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: windowWidth * 0.88,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 14
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
        marginLeft: 10,
        fontSize: 18,
        fontFamily: 'DMSans-Regular',
        color: Colours.BLACK
    },
    statusBar: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 10
    },
    statusText: {
        fontSize: 15,
        fontFamily: 'DMSans-Regular'
    }
});

/// On clicking the button, have loading indicator and if successful than move to editing stage, once saved can click others
