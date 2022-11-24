import React from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';

import Colours from '../../utilities/Colours';

interface Props {
    placeholder: string;
    width: number;
    text: string;
    onChangeText: any;
}

const InputText = ({ placeholder, width, text, onChangeText }: Props) => {
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
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 56,
        borderWidth: 1,
        padding: 10,
        marginVertical: 6,
        borderColor: Colours.BLUE,
        backgroundColor: Colours.LIGHTGREY,
        borderRadius: 8,
        color: Colours.BLUE,
        fontFamily: 'DMSans-Regular'
    }
});

export default InputText;
