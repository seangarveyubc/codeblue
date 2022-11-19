import * as React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colours from '../../utilities/Colours';
import Icons from 'react-native-vector-icons/AntDesign';


const options = ["A", "B"]

const UnderlineDDSelect = () => {
  const [value, setValue] = React.useState("");

  return (
    <View style={styles.view}>
        <Text style={styles.title}>Blood Type</Text>
        <SelectDropdown 
            defaultButtonText={' '}
            data={options}
            onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
            renderDropdownIcon={isOpened => {
                return <Icons name={isOpened ? 'up' : 'down'} color={'#444'} size={25} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            
        />
    </View>
  );
};

const styles = StyleSheet.create({
    view:{
        flexDirection: 'column',
        flexWrap:'wrap',
        justifyContent: 'space-around',
        margin: 10
    },
    title:{
        color: Colours.BLUE,
        fontWeight: "500",
        fontSize: 14,
        textalign: 'left'
    },
    dropdown2BtnStyle: {
      width: '40%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 0,
      borderColor: "#757575",
      borderBottomWidth: 1
    },
    dropdown2BtnTxtStyle: {
      color: '#000',
      textAlign: 'left',
      fontWeight: '400',
    },
    dropdown2DropdownStyle: {
      backgroundColor: '#FFF',
      borderColor: '#757575'
    },
    dropdown2RowStyle: {backgroundColor: '#FFF', borderColor: Colours.LIGHTGREY, borderWidth: 1},
    dropdown2RowTxtStyle: {
      color: '#000',
      textAlign: 'left',
      fontWeight: '400',
      marginLeft: 20,
      marginRight: 20
    },
})
  
export default UnderlineDDSelect;