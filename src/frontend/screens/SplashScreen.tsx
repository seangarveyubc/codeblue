import * as React from 'react';
import { Button, Text, View } from 'react-native';

interface Props {
    navigation: any,
}

export const SplashScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>Splash screen</Text>
            <Button title='Onboarding' onPress={() => { navigation.navigate('Onboarding')}} />
            <Button title='Home' onPress={() => { navigation.navigate('MainNavigator')}} />
            <Button 
                title='Emergency Protocol'
                onPress={() => { navigation.navigate('EmergencyProtocol')}}
            />
        </View>
    );
};
