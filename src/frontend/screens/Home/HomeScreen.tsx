import * as React from 'react';
import { Text, View } from 'react-native';

interface Props {
    navigation: any,
}

export const HomeScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>Home screen</Text>
        </View>
    );
};
