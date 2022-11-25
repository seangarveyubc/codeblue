import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import Colours from '../../utilities/Colours';

interface Props {
    data: object[];
    // data must take an array of objects, each containing a 'label' and 'value' property
    placeholder: string;
    width: number;
}

const DropdownSingleSelect = ({ width, placeholder, data }: Props) => {
    const [selected, setSelected] = useState([]);

    return (
        <View
            style={{
                ...styles.container,
                ...{ width: width }
            }}
        >
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={selected}
                onChange={(item) => {
                    setSelected(item);
                }}
                selectedStyle={styles.selectedStyle}
            />
        </View>
    );
};

export default DropdownSingleSelect;

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    dropdown: {
        height: 56,
        backgroundColor: Colours.LIGHTGREY,
        borderColor: Colours.BLUE,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10
    },
    placeholderStyle: {
        fontSize: 16,
        color: Colours.BLUE,
        fontFamily: 'DMSans-Regular'
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
        color: Colours.BLUE
    },
    selectedStyle: {
        borderRadius: 8
    }
});
