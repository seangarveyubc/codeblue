import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { AddDeviceScreen } from '../screens/AddDevice/AddDeviceScreen';
import { SettingsStack } from './SettingsStack';

const NavBar = createBottomTabNavigator();

export const MainNavigator = () => {
    return (
        <NavBar.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <NavBar.Screen name="Home" component={HomeScreen} />
            <NavBar.Screen name="AddDevice" component={AddDeviceScreen} />
            <NavBar.Screen name="Settings" component={SettingsStack} />
        </NavBar.Navigator>
    );
};
