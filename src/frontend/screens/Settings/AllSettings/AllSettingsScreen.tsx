import * as React from 'react';
import { Button, Text, View } from 'react-native';

interface Props {
    navigation: any,
}

export const AllSettingsScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>All settings screen</Text>
            <Button title='Account info' onPress={() => { navigation.navigate('AccountInfo')}} />
            <Button title='Medical info' onPress={() => { navigation.navigate('MedicalInfo')}} />
        </View>
    );
};