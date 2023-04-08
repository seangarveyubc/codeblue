import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewDeviceListScreen } from '../screens/AddDevice/NewDeviceList/NewDeviceListScreen';

const Stack = createNativeStackNavigator();

export const AddDeviceStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="NewDeviceList"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="NewDeviceList"
                component={NewDeviceListScreen}
            />
        </Stack.Navigator>
    );
};
