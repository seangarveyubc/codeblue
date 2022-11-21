import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colours from '../../utilities/Colours';
import Icons from 'react-native-vector-icons/AntDesign';
import DDOptions from '../../utilities/DDOptions'

interface Props {
  selectedValue: any,
  onValueChange: any
}

const DropdownSelect = ({ selectedValue, onValueChange }: Props) => {
  return (
    <View style={styles.view}>
        <SelectDropdown 
            defaultButtonText={'Select'}
            data={DDOptions.Medications}
            onSelect={(selectedItem, index) => {
              onValueChange(selectedItem)
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
                return <Icons name={isOpened ? 'up' : 'down'} color={Colours.GREY} size={25} />;
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
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-around',
        margin: 10
    },
    dropdown2BtnStyle: {
      width: '90%',
      height: 50,
      backgroundColor: Colours.WHITE,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colours.GREY,
    },
    dropdown2BtnTxtStyle: {
      color: Colours.BLACK,
      textAlign: 'left',
      fontWeight: '300',
      fontFamily: 'DMSans-Regular', 
    },
    dropdown2DropdownStyle: {
      backgroundColor: Colours.WHITE,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderColor: Colours.GREY
    },
    dropdown2RowStyle: {backgroundColor: Colours.WHITE, borderColor: Colours.LIGHTGREY, borderWidth: 1},
    dropdown2RowTxtStyle: {
      color: Colours.BLACK,
      textAlign: 'left',
      fontFamily: 'DMSans-Regular', 
      fontWeight: '300',
      marginLeft: 20,
      marginRight: 20
    },
})
  
export default DropdownSelect;