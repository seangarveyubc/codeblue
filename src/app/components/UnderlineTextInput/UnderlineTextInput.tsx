import React from 'react';
import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View
} from 'react-native';
import Colours from '../../constants/Colours';

interface Props {
    text: string;
    onChangeText: any;
    title: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
}

export const UnderlineTextInput = ({
    text,
    onChangeText,
    title,
    placeholder,
    keyboardType
}: Props) => {
    return (
        <View style={styles.inputfield}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={placeholder}
                placeholderTextColor={Colours.GREY}
                keyboardType={keyboardType ?? 'default'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputfield: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: 50,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colours.GREY
    },
    input: {
        fontFamily: 'DMSans-Regular',
        fontSize: 18
    },
    title: {
        fontFamily: 'DMSans-Regular',
        paddingLeft: 4,
        color: Colours.BLUE,
        fontSize: 15
    }
});
