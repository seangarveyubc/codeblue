import React from 'react';
import {
    KeyboardTypeOptions,
    SafeAreaView,
    StyleSheet,
    TextInput
} from 'react-native';

import Colours from '../../constants/Colours';
import { normalize } from '../../utils/normalizer/normalizer';

interface Props {
    placeholder: string;
    width: number;
    text: string;
    keyboardType?: KeyboardTypeOptions;
    onChangeText: any;
}

const InputText = ({
    placeholder,
    width,
    text,
    keyboardType,
    onChangeText
}: Props) => {
    return (
        <SafeAreaView>
            <TextInput
                style={{ ...styles.input, ...{ width: width } }}
                value={text}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colours.BLUE}
                autoCapitalize="words"
                returnKeyType="next"
                keyboardType={keyboardType ?? 'default'}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: normalize(56),
        borderWidth: normalize(1),
        padding: normalize(10),
        marginVertical: normalize(6),
        borderColor: Colours.BLUE,
        backgroundColor: Colours.LIGHTGREY,
        borderRadius: normalize(8),
        color: Colours.BLUE,
        fontFamily: 'DMSans-Regular'
    }
});

export default InputText;
