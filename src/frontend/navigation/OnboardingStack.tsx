import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OptionalInfoScreen } from '../screens/Onboarding/OptionalInfo/OptionalInfoScreen';
import { RequiredInfoScreen } from '../screens/Onboarding/RequiredInfo/RequiredInfoScreen';
import { OnboardingSuccessScreen } from '../screens/Onboarding/OnboardingSuccessScreen';
import { TutorialScreen } from '../screens/Onboarding/Tutorial/TutorialScreen';

const Stack = createNativeStackNavigator();

export const OnboardingStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='OptionalInfo'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='OptionalInfo' component={OptionalInfoScreen} />
            <Stack.Screen name='RequiredInfo' component={RequiredInfoScreen} />
            <Stack.Screen name='OnboardingSuccess' component={OnboardingSuccessScreen} />
            <Stack.Screen name='Tutorial' component={TutorialScreen} />
        </Stack.Navigator>
    );
};