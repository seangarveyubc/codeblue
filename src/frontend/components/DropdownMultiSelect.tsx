import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { MultiSelect } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';
import Colours from "../../utilities/Colours";


  interface Props {
    placeholder: string
    width: number
    data: any
  };

const DropdownMultiSelect = ({ placeholder, width , data}) => {
    const [selected, setSelected] = useState([]);

    return (
      <View style={[styles.container, {width: width}]}>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={selected}
          onChange={item => {
            setSelected(item);
          }}
          selectedStyle={styles.selectedStyle}
        />
      </View>
    );
  };

  export default DropdownMultiSelect;

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    dropdown: {
      height: 56,
      borderColor: Colours.BLUE,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
      color: Colours.BLUE
    },
    label: {
      position: 'absolute',
      color: Colours.BLUE,
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
          fontSize: 16,
          color: Colours.BLUE,
          fontFamily: 'DMSans-Regular'
        },
        selectedTextStyle: {
          fontSize: 16,
          fontFamily: 'DMSans-Regular',
          color: Colours.BLUE,
        },
        selectedStyle: {
          borderRadius: 8,
          backgroundColor: Colours.WHITE,
          borderColor: Colours.DARKGREY
        },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: Colours.BLUE,
      fontFamily: 'DMSans-Regular'
    },
  });