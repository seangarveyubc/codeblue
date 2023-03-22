import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colours from '../../constants/Colours';
import Icons from 'react-native-vector-icons/AntDesign';
import { normalize } from '../../utils/normalizer/normalizer';

interface Props {
    type: string;
    data: string[];
    selectedValue: any;
    onValueChange: any;
    width: number;
}

export const DropdownSelect = ({
    type,
    data,
    selectedValue,
    onValueChange,
    width
}: Props) => {
    return (
        <View style={styles.view}>
            <SelectDropdown
                defaultButtonText={type}
                data={data}
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
<<<<<<< HEAD
                            color={Colours.DARKBLUE}
                            size={normalize(25)}
=======
                            color={Colours.BLUE}
                            size={25}
>>>>>>> main
                        />
                    );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
                buttonStyle={{ width, ...styles.dropdown2BtnStyle }}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginVertical: normalize(6)
    },
    dropdown2BtnStyle: {
        height: normalize(50),
        backgroundColor: Colours.LIGHTGREY,
<<<<<<< HEAD
        borderRadius: normalize(8),
        borderWidth: normalize(1),
        borderColor: Colours.DARKBLUE
=======
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colours.BLUE
>>>>>>> main
    },
    dropdown2BtnTxtStyle: {
        color: Colours.BLUE,
        textAlign: 'left',
        fontFamily: 'DMSans-Regular',
        fontSize: normalize(14)
    },
    dropdown2DropdownStyle: {
        backgroundColor: Colours.LIGHTGREY,
<<<<<<< HEAD
        borderBottomLeftRadius: normalize(8),
        borderBottomRightRadius: normalize(8),
        borderTopLeftRadius: normalize(8),
        borderTopRightRadius: normalize(8),
        borderColor: Colours.DARKBLUE
    },
    dropdown2RowStyle: {
        backgroundColor: Colours.LIGHTGREY,
        borderColor: Colours.DARKBLUE,
        borderWidth: normalize(1)
=======
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderColor: Colours.BLUE
    },
    dropdown2RowStyle: {
        backgroundColor: Colours.LIGHTGREY,
        borderColor: Colours.BLUE,
        borderWidth: 1
>>>>>>> main
    },
    dropdown2RowTxtStyle: {
        color: Colours.BLUE,
        textAlign: 'left',
        fontFamily: 'DMSans-Regular',
        padding: normalize(10)
    }
});
