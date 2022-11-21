import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

function CodeBlueIcon(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/CodeBlueLogo.png")}
        style={styles.ImageStyle}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 75
  },
  ImageStyle: {
    width: 75,
    height: 75
    resizeMode: "contain";
  }
});

export default CodeBlueIcon;
