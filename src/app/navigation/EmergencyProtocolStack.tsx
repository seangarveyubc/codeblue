import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardiacArrestDetectedScreen } from '../screens/EmergencyProtocol/CardiacArrestDetected/CardiacArrestDetectedScreen';
import { CallEndedScreen } from '../screens/EmergencyProtocol/CallEnded/CallEndedScreen';

const Stack = createNativeStackNavigator();

export type EmergencyProtocolScreen = 'CardiacArrestDetected' | 'CallEnded';

interface Props {
    initialRouteName: EmergencyProtocolScreen;
}

// todo: pass initial route name as a prop
export const EmergencyProtocolStack = ({ initialRouteName }: Props) => {
    return (
        <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="CardiacArrestDetected"
                component={CardiacArrestDetectedScreen}
            />
            <Stack.Screen name="CallEnded" component={CallEndedScreen} />
        </Stack.Navigator>
    );
};
