import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

import { Colours } from  "../../../utilities/Colours"

interface Props {
  placeholder: string;
};

const InputText = ({placeholder}: Props) => {
  const [text, onChangeText] = React.useState("");

  return (
    <SafeAreaView
      style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: Colours.LIGHTGREY
  },
  input: {
    height: 56,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: Colours.BLUE,
    borderRadius: 8,
    color: Colours.BLUE,
    fontFamily: 'DMSans-Regular',
    fontWeight: '300'
  },
});

export default InputText;