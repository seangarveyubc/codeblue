import * as React from 'react';
import { Button, Text, View } from 'react-native';

interface Props {
    navigation: any,
}

export const RequiredInfoScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>Onboarding required info screen</Text>
            <Button title='next' onPress={() => { navigation.navigate('OnboardingSuccess')}} />
        </View>
    );
};