import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingStack } from './OnboardingStack';
import { MainNavigator } from './MainNavigator';
import { EmergencyProtocolStack } from './EmergencyProtocolStack';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SplashScreen"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingStack} />
                <Stack.Screen name="MainNavigator" component={MainNavigator} />
                <Stack.Screen
                    name="EmergencyProtocol"
                    component={EmergencyProtocolStack}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
