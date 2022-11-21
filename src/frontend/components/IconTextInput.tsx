import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import Colours from "../../utilities/Colours";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

interface Props {
  text: string;
  onChangeText: any;
  iconName: string;
}

const IconTextInput = ({ text, onChangeText, iconName }: Props) => {
  return (
    <View style={styles.inputfield}>
      <Icon style={styles.icon} name={iconName} size={25} color={Colours.BLACK} />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="placeholder"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputfield: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    margin: 10,
    height: 60,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colours.BLUE,
  },
  input: {
    alignContent: "center",
    fontFamily: "DMSans-Regular"
  },
  icon: {
    margin: 5,
  },
});

export default IconTextInput;
