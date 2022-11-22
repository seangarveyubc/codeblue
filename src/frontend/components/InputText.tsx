import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

import Colours from  "../../utilities/Colours";

interface Props {
  placeholder: string;
  width: number;
};

const InputText = ({placeholder, width}: Props) => {
  const [text, onChangeText] = React.useState("");

  return (
    <SafeAreaView
      style={styles.container, {width: width}}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        placeholderTextColor={Colours.BLUE}
        autoCapitalize="words"
        returnKeyType="next"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8
  },
  input: {
    height: 56,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: Colours.BLUE,
    backgroundColor: Colours.LIGHTGREY,
    borderRadius: 8,
    color: Colours.BLUE
  }
});

export default InputText;