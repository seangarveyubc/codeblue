import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardiacArrestScreen } from '../screens/EmergencyProtocol/CardiacArrestDetected/CardiacArrestDetectedScreen';
import { CallInProgressScreen } from '../screens/EmergencyProtocol/CallInProgress/CallInProgressScreen';
import { CallEndedScreen } from '../screens/EmergencyProtocol/CallEnded/CallEndedScreen';

const Stack = createNativeStackNavigator();

export const EmergencyProtocolStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='CardiacArrestDetected'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='CardiacArrestDetected' component={CardiacArrestScreen} />
            <Stack.Screen name='CallInProgress' component={CallInProgressScreen} />
            <Stack.Screen name='CallEnded' component={CallEndedScreen} />
        </Stack.Navigator>
    );
};
