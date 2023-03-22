import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colours from '../../constants/Colours';
import Icons from 'react-native-vector-icons/AntDesign';
import { normalize } from '../../utils/normalizer/normalizer';

interface Props {
    selectedIndex: number;
    onIndexChange: any;
    name: string;
    options: string[];
}

export const SingleDropdownSelect = ({
    selectedIndex,
    onIndexChange,
    name,
    options
}: Props) => {
    return (
        <View style={styles.view}>
            <SelectDropdown
                defaultButtonText={name}
                data={options}
                onSelect={(selectedItem, index) => {
                    onIndexChange(index);
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
                            color={Colours.BLUE}
                            size={normalize(25)}
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: normalize(10)
    },
    dropdown2BtnStyle: {
        width: '40%',
        height: normalize(50),
        backgroundColor: Colours.LIGHTGREY,
        borderRadius: normalize(8),
        borderWidth: normalize(1),
        borderColor: Colours.BLUE
    },
    dropdown2BtnTxtStyle: {
        color: Colours.BLUE,
        textAlign: 'left',
        fontWeight: '300',
        fontFamily: 'DMSans-Regular',
        fontSize: normalize(16)
    },
    dropdown2DropdownStyle: {
        backgroundColor: Colours.LIGHTGREY,
        borderBottomLeftRadius: normalize(8),
        borderBottomRightRadius: normalize(8),
        borderTopLeftRadius: normalize(8),
        borderTopRightRadius: normalize(8),
        borderColor: Colours.GREY
    },
    dropdown2RowStyle: {
        backgroundColor: Colours.LIGHTGREY,
        borderColor: Colours.BLUE,
        borderWidth: normalize(1)
    },
    dropdown2RowTxtStyle: {
        color: Colours.BLUE,
        textAlign: 'left',
        fontFamily: 'DMSans-Regular',
        fontWeight: '300',
        marginLeft: normalize(20),
        marginRight: normalize(20)
    }
});
