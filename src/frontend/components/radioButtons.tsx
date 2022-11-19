import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import Colours from '../../utilities/Colours';

const RadioButtons = () => {
  const [value, setValue] = React.useState("");

  return (
    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View style={styles.buttonRow}>
        <View style={styles.singleButton}>
          <RadioButton color={Colours.BLUE} value="Yes" />
          <Text style={styles.text}>Yes</Text>
        </View>
        <View style={styles.singleButton}>
          <RadioButton color={Colours.BLUE} value="No" />
          <Text style={styles.text}>No</Text>
        </View>
        <View style={styles.singleButton}>
          <RadioButton color={Colours.BLUE} value="Not Provided" />
          <Text style={styles.text}>Not Provided</Text>
        </View>
      </View>
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  buttonRow:{
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  singleButton:{
    flexDirection: 'row',
    flexWrap:'wrap',
    alignContent: 'center',
    alignItems: 'center',
  },

  text:{
    fontFamily: 'DM Sans',
    fontweight: 500,
    fontSize: 18,
    color: Colours.BLACK
  },

});

export default RadioButtons;