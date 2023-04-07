import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Alert, Vibration } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import { SplashScreen } from '../screens/Splash/SplashScreen';
import { OnboardingStack } from './OnboardingStack';
import { MainNavigator } from './MainNavigator';
import { EmergencyProtocolStack } from './EmergencyProtocolStack';
import {
    AppContext,
    AppContextProvider
} from '../backgroundMode/context/AppContext';
import { BackgroundMode } from '../backgroundMode/models/BackgroundMode';
import { backgroundModeStorage } from '../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../localStorage/models/LocalStorageKeys';
import { getLocalStorageBackgroundMode } from '../backgroundMode/notifee/BackgroundProcess';
import * as utils from '../utils/AppUtils';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    const { initialBackgroundState } = useContext(AppContext);
    const [isEP, setIsEP] = useState(
        initialBackgroundState === BackgroundMode.CA_DETECTED
    );
    const [callEnded, setCallEnded] = useState(
        initialBackgroundState === BackgroundMode.CALL_ENDED
    );
    let listener: any;

    useEffect(() => {
        // set background push notification handler
        messaging().setBackgroundMessageHandler(
            utils.handleBackgroundNotification
        );

        // set foreground push notification handler
        messaging().onMessage(utils.handleForegroundNotification);
    }, []);

    // subsribe to background mode value changes in local storage
    useEffect(() => {
        listener = backgroundModeStorage.storage.addOnValueChangedListener(
            (changedKey) => {
                if (changedKey === BACKGROUND_MODE) {
                    const newMode: BackgroundMode =
                        getLocalStorageBackgroundMode();
                    console.log(
                        `[AppNavigator] background mode changed to ${newMode}`
                    );

                    setIsEP(newMode === BackgroundMode.CA_DETECTED);
                    setCallEnded(newMode === BackgroundMode.CALL_ENDED);

                    if (newMode === BackgroundMode.CA_DETECTED) {
                        const pattern = [200, 1000];
                        Vibration.vibrate(pattern, true);
                    } else if (newMode === BackgroundMode.CALL_ENDED) {
                        Vibration.cancel();
                    }
                }
            }
        );
    }, [listener]);

    return (
        <AppContextProvider>
            <NavigationContainer>
                {isEP ? (
                    <EmergencyProtocolStack
                        initialRouteName={'CardiacArrestDetected'}
                    />
                ) : callEnded ? (
                    <EmergencyProtocolStack initialRouteName={'CallEnded'} />
                ) : (
                    <Stack.Navigator
                        initialRouteName="SplashScreen"
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen
                            name="SplashScreen"
                            component={SplashScreen}
                        />
                        <Stack.Screen
                            name="Onboarding"
                            component={OnboardingStack}
                        />
                        <Stack.Screen
                            name="MainNavigator"
                            component={MainNavigator}
                        />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </AppContextProvider>
    );
};
