import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import Colours from "../../utilities/Colours";

interface Props {
  text:any,
  onChangeText:any
}

const IconTextInput = ({ text, onChangeText }: Props) => {

  return (
    <View style={styles.inputfield}>
        <Image
        source={require('../assets/images/connected.png')} //Change your icon image here
        style={styles.ImageStyle}
        />
        <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="place holder"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputfield:{
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    margin:10,
    height:60,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colours.BLUE,
  },
  input: {
    alignContent: 'center'
  },
  ImageStyle: {
    height:20,
    width:20,
    margin:8,
    resizeMode:'contain'
  }
});

export default IconTextInput; 