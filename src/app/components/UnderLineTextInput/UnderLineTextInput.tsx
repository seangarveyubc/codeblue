import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Colours from '../../constants/Colours';

interface Props {
    text: string;
    onChangeText: any;
    title: string;
    placeholder: string;
}

const UnderlineTextInput = ({
    text,
    onChangeText,
    title,
    placeholder
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

export default UnderlineTextInput;
