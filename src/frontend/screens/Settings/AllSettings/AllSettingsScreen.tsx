import * as React from 'react';
import { Text, View } from 'react-native';

import { OptionType, SettingsOption } from './SettingsOption';

interface Props {
    navigation: any;
}

export const AllSettingsScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>All settings screen</Text>
            <SettingsOption
                onPress={() => {
                    navigation.navigate('AccountInfo');
                }}
                optionType={OptionType.AccountInfo}
            />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('MedicalInfo');
                }}
                optionType={OptionType.MedicalInfo}
            />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('Tutorial');
                }}
                optionType={OptionType.Tutorial}
            />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('Legal');
                }}
                optionType={OptionType.Legal}
            />
        </View>
    );
};
