import * as React from 'react';
import { Button, Text, View } from 'react-native';

interface Props {
    navigation: any,
}

export const OnboardingSuccessScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>Onboarding success screen</Text>
            <Button title='next' onPress={() => { navigation.navigate('Tutorial')}} />
        </View>
    );
};
