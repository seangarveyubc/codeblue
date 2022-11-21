import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

import Colours from '../../../utilities/Colours';

interface Props {
    selectedValue: any;
    onValueChange: any;
}

const RadioButtons = ({ selectedValue, onValueChange }: Props) => {
    return (
        <RadioButton.Group onValueChange={onValueChange} value={selectedValue}>
            <View style={styles.buttonRow}>
                <View style={styles.singleButton}>
                    <RadioButton color={Colours.BLUE} value="Yes" />
                    <Text style={styles.text}>Yes</Text>
                </View>
                <View style={styles.singleButton}>
                    <RadioButton color={Colours.BLUE} value="No" />
                    <Text style={styles.text}>No</Text>
                </View>
                <View style={styles.singleButton}>
                    <RadioButton color={Colours.BLUE} value="Not Provided" />
                    <Text style={styles.text}>Not Provided</Text>
                </View>
            </View>
        </RadioButton.Group>
    );
};

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    singleButton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontFamily: 'DMSans-Regular',
        fontweight: 500,
        fontSize: 18,
        color: Colours.BLACK
    }
});

export default RadioButtons;
