import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Colors from "../../../utilities/Colours"

interface Props {
    text: string;
    onChangeText: any;
    placeholder: string;
}

const InputText = ({
    text,
    onChangeText,
    placeholder
}: Props) => {
    return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.BLUE}
        autoCapitalize="words"
        style={styles.placeholder}
        value={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 340,
    height: 56
  },
  placeholder: {
    padding: 10,
    fontFamily: "DMSans-Regular",
    height: 56,
    width: 340,
    backgroundColor: Colors.LIGHTGREY,
    borderWidth: 1,
    borderColor: Colors.BLUE,
    borderRadius: 8
  }
});

export default InputText;