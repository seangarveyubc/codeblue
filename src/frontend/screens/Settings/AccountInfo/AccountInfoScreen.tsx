import * as React from 'react';
import { Text, View } from 'react-native';

interface Props {
    navigation: any;
}

export const AccountInfoScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>Account info screen</Text>
        </View>
    );
};
