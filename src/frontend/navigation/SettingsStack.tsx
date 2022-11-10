import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AllSettingsScreen } from '../screens/Settings/AllSettings/AllSettingsScreen';
import { AccountInfoScreen } from '../screens/Settings/AccountInfo/AccountInfoScreen';
import { MedicalInfoScreen } from '../screens/Settings/MedicalInfo/MedicalInfoScreen';
import { TutorialScreen } from '../screens/Onboarding/Tutorial/TutorialScreen';

const Stack = createNativeStackNavigator();

export const SettingsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='AllSettings'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='AllSettings' component={AllSettingsScreen} />
            <Stack.Screen name='AccountInfo' component={AccountInfoScreen} />
            <Stack.Screen name='MedicalInfo' component={MedicalInfoScreen} />
            <Stack.Screen name='Tutorial' component={TutorialScreen} />
        </Stack.Navigator>
    );
};