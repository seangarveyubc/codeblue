import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

import Colours from '../../constants/Colours';
import { HeartProblemOptions } from '../../constants/HeartProblemOptions';

interface Props {
    selectedValue: string;
    onValueChange: any;
}

export const RadioButtons = ({ selectedValue, onValueChange }: Props) => {
    return (
        <RadioButton.Group onValueChange={onValueChange} value={selectedValue}>
            <View style={styles.buttonRow}>
                <View style={styles.singleButton}>
                    <RadioButton
                        color={Colours.BLUE}
                        value={HeartProblemOptions.YES}
                    />
                    <Text style={styles.text}>{HeartProblemOptions.YES}</Text>
                </View>
                <View style={styles.singleButton}>
                    <RadioButton
                        color={Colours.BLUE}
                        value={HeartProblemOptions.NO}
                    />
                    <Text style={styles.text}>{HeartProblemOptions.NO}</Text>
                </View>
                <View style={styles.singleButton}>
                    <RadioButton
                        color={Colours.BLUE}
                        value={HeartProblemOptions.NOT_PROVIDED}
                    />
                    <Text style={styles.text}>
                        {HeartProblemOptions.NOT_PROVIDED}
                    </Text>
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
        alignItems: 'center'
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
