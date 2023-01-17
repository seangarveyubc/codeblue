import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import Colours from '../constants/Colours';

interface Props {
    data: { label: string; value: number }[];
    placeholder: string;
    width: number;
    selected: any;
    setSelected: any;
}

const DropdownSingleSelect = ({
    placeholder,
    width,
    data,
    selected,
    setSelected
}: Props) => {
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
                data={data}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={selected}
                onChange={(item: any) => {
                    setSelected(item.label);
                }}
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
    }
});
