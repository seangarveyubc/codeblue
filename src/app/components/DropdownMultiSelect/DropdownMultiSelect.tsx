import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import Colours from '../../constants/Colours';
import { normalize } from '../../utils/normalizer/normalizer';

interface Props {
    data: { label: string; value: number }[];
    placeholder: string;
    width: number;
    selected: any;
    setSelected: any;
}

export const DropdownMultiSelect = ({
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
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                search
                data={data}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                searchPlaceholder="Search..."
                value={selected}
                onChange={(item: any) => {
                    setSelected(item);
                }}
                selectedStyle={styles.selectedStyle}
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
        borderColor: Colours.BLUE,
        borderWidth: normalize(1),
        borderRadius: normalize(8),
        paddingHorizontal: normalize(8)
    },
    label: {
        position: 'absolute',
        color: Colours.BLUE,
        left: normalize(22),
        top: normalize(8),
        zIndex: 999,
        paddingHorizontal: normalize(8),
        fontSize: normalize(14)
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
    },
    selectedStyle: {
        borderRadius: normalize(8),
        backgroundColor: Colours.LIGHTGREY,
        borderColor: Colours.BLUE
    },
    inputSearchStyle: {
        height: normalize(40),
        fontSize: normalize(16),
        color: Colours.BLUE,
        fontFamily: 'DMSans-Regular'
    }
});
