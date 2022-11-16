import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { SettingsOption } from './SettingsOption';

interface Props {
    navigation: any,
}

export const AllSettingsScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>All settings screen</Text>
            <SettingsOption navigation={navigation} title={"Account Information"} url={'AccountInfo'} />
            <Button title='Medical info' onPress={() => { navigation.navigate('MedicalInfo')}} />
        </View>
    );
};
