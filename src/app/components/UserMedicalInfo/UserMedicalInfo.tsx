import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colours from '../../constants/Colours';
import { RadioButtons } from '../RadioButtons/RadioButtons';

interface Props {
    edit: boolean;
    personalHistory: string;
    familyHistory: string;
    setPersonalHistory: any;
    setFamilyHistory: any;
}
export const UserMedicalInfo = ({
    edit,
    personalHistory,
    familyHistory,
    setPersonalHistory,
    setFamilyHistory
}: Props) => {
    // Based on the edit flag, return the corresponding view
    return edit ? (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.item}>
                    <Text style={styles.title}>
                        {'Personal History of Heart Disease'}
                    </Text>
                    <RadioButtons
                        selectedValue={personalHistory}
                        onValueChange={setPersonalHistory}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.item}>
                    <Text style={styles.title}>
                        {'Family History of Heart Disease'}
                    </Text>
                    <RadioButtons
                        selectedValue={familyHistory}
                        onValueChange={setFamilyHistory}
                    />
                </View>
            </View>
        </View>
    ) : (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.item}>
                    <Text style={styles.title}>
                        {'Personal History of Heart Disease'}
                    </Text>
                    <Text style={styles.input}>{personalHistory}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={{ ...styles.item, ...{ width: '100%' } }}>
                    <Text style={styles.title}>
                        {'Family History of Heart Disease'}
                    </Text>
                    <Text style={styles.input}>{familyHistory}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: '5%'
    },
    row: {
        marginVertical: 10
    },
    item: {
        paddingHorizontal: '3%'
    },
    input: {
        paddingLeft: 4,
        fontFamily: 'DMSans-Regular',
        color: Colours.BLACK,
        fontSize: 18,
        width: '100%',
        paddingTop: 4
    },
    title: {
        fontFamily: 'DMSans-Regular',
        paddingLeft: 4,
        color: Colours.BLUE,
        fontSize: 15
    }
});
