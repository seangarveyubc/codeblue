import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colours from '../../constants/Colours';
import Icons from 'react-native-vector-icons/AntDesign';
import DropdownOptions from '../../constants/DropdownOptions';

interface Props {
    selectedValue: any;
    onValueChange: any;
}

export const UnderlineDropdownSelect = ({
    selectedValue,
    onValueChange
}: Props) => {
    return (
        <View style={styles.view}>
            <Text style={styles.title}>Blood Type</Text>
            <SelectDropdown
                defaultButtonText={' '}
                data={DropdownOptions.BloodTypes}
                onSelect={(selectedItem, index) => {
                    onValueChange(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                }}
                renderDropdownIcon={(isOpened) => {
                    return (
                        <Icons
                            name={isOpened ? 'up' : 'down'}
                            color={Colours.GREY}
                            size={25}
                        />
                    );
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
    view: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: 10
    },
    title: {
        color: Colours.BLUE,
        fontWeight: '500',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        textalign: 'left'
    },
    dropdown2BtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: Colours.WHITE,
        borderRadius: 0,
        borderColor: Colours.GREY,
        borderBottomWidth: 1
    },
    dropdown2BtnTxtStyle: {
        color: Colours.BLACK,
        textAlign: 'left',
        fontWeight: '400'
    },
    dropdown2DropdownStyle: {
        backgroundColor: Colours.WHITE,
        borderColor: Colours.GREY
    },
    dropdown2RowStyle: {
        backgroundColor: Colours.WHITE,
        borderColor: Colours.LIGHTGREY,
        borderWidth: 1
    },
    dropdown2RowTxtStyle: {
        color: Colours.BLACK,
        textAlign: 'left',
        fontFamily: 'DMSans-Regular',
        fontWeight: '400',
        marginLeft: 20,
        marginRight: 20
    }
});
