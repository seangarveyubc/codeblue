import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import Colours from "../../utilities/Colours";

// data must be an array of objects [{label: '...', value: '...''}, {...}, ...]
interface Props {
    data: any
    placeholder: string
    width: number
}

  const DropdownComponent = ({ data, placeholder, width }: Props) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
      <View style={styles.container}>

        <Dropdown
          style={[styles.dropdown, {width: width}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      padding: 16
    },
    dropdown: {
      height: 56,
      borderColor: Colours.BLUE,
      backgroundColor: Colours.LIGHTGREY,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      color: Colours.BLUE
    },
    placeholderStyle: {
      fontSize: 16,
      fontFamily: 'DMSans-Regular',
      color: Colours.BLUE
    },
    selectedTextStyle: {
      fontSize: 16,
      fontFamily: 'DMSans-Regular',
      color: Colours.BLUE
    }
  });