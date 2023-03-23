import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colours from '../../constants/Colours';
import { SCREEN_WIDTH } from '../../constants/constants';
import { normalize } from '../../utils/normalizer/normalizer';
import { UnderlineTextInput } from '../UnderlineTextInput/UnderlineTextInput';

interface Props {
    name: string;
}

export const AddDeviceWidget = ({ name }: Props) => {
    const [text, onChangetext] = React.useState(name);
    const [isEditing, onChangeEditing] = React.useState(false);
    const [isSaved, onChangeSaved] = React.useState(false);

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
                <TouchableOpacity
                    onPress={() =>
                        !isEditing && !isSaved
                            ? onChangeEditing((isEditing) => !isEditing)
                            : isEditing && !isSaved
                            ? onChangeSaved((isSaved) => !isSaved)
                            : onChangeSaved((isSaved) => isSaved)
                    }
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
