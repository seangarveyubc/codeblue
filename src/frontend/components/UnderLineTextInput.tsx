import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colours from "../../utilities/Colours";

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
  placeholder,
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
    flexDirection: "column",
    justifyContent: "space-evenly",
    margin: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colours.GREY,
  },
  input: {
    fontFamily: "DM SANS",
    fontSize: 18,
  },
  title: {
    fontFamily: "DM SANS",
    paddingLeft:4,
    color: Colours.BLUE,
    fontSize: 15,
  },
});

export default UnderlineTextInput;
