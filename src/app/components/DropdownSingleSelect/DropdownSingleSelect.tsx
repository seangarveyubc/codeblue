import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import Colours from '../../constants/Colours';
import { normalize } from '../../normalizer/normalizer';

interface Props {
    data: { label: string; value: number }[];
    placeholder: string;
    width: number;
    selected: any;
    setSelected: any;
}

export const DropdownSingleSelect = ({
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

const styles = StyleSheet.create({
    container: {
        padding: normalize(16)
    },
    dropdown: {
        height: normalize(56),
        backgroundColor: Colours.LIGHTGREY,
        borderColor: Colours.BLUE,
        borderWidth: normalize(1),
        borderRadius: normalize(8),
        padding: normalize(10)
    },
    placeholderStyle: {
        fontSize: normalize(16),
        color: Colours.BLUE,
        fontFamily: 'DMSans-Regular'
    },
    selectedTextStyle: {
        fontSize: normalize(16),
        fontFamily: 'DMSans-Regular',
        color: Colours.BLUE
    }
});
