import * as React from 'react';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colours from '../../../../utilities/Colours';
import { SettingsOption } from './SettingsOption';

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
                title={'Account Information'}
            />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('MedicalInfo');
                }}
                title={'Medical Information'}
            />
            <Icon name="briefcase-medical" size={30} color={Colours.DARKBLUE} />
        </View>
    );
};
