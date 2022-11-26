import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddDeviceScreen } from '../screens/AddDevice/AddDeviceScreen';
import { NewDeviceListScreen } from '../screens/AddDevice/NewDeviceList/NewDeviceListScreen';

const Stack = createNativeStackNavigator();

export const AddDeviceStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="AddDevice"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="AddDevice" component={AddDeviceScreen} />
            <Stack.Screen
                name="NewDeviceList"
                component={NewDeviceListScreen}
            />
        </Stack.Navigator>
    );
};
