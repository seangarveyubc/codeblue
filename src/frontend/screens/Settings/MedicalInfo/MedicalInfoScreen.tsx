import * as React from 'react';
import { Text, View } from 'react-native';

interface Props {
    navigation: any;
}

export const MedicalInfoScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>Medical info screen</Text>
        </View>
    );
};
