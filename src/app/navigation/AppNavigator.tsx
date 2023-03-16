import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import { SplashScreen } from '../screens/Splash/SplashScreen';
import { OnboardingStack } from './OnboardingStack';
import { MainNavigator } from './MainNavigator';
import {
    EmergencyProtocolScreen,
    EmergencyProtocolStack
} from './EmergencyProtocolStack';
import {
    AppContext,
    AppContextProvider
} from '../backgroundMode/context/AppContext';
import { BackgroundMode } from '../backgroundMode/models/BackgroundMode';
import { backgroundModeStorage } from '../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../localStorage/models/LocalStorageKeys';
import { getLocalStorageBackgroundMode } from '../backgroundMode/notifee/BackgroundProcess';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    const { initialBackgroundState, dispatch } = useContext(AppContext);
    const [isEP, setIsEP] = useState(
        initialBackgroundState === BackgroundMode.CA_DETECTED ||
            initialBackgroundState === BackgroundMode.CALL_ENDED
    );
    let listener: any;

    useEffect(() => {
        messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
            console.log(remoteMessage);

            let message_body = remoteMessage.notification.body;
            let message_title = remoteMessage.notification.title;
            let avatar = remoteMessage.notification.android.imageUrl;

            if (message_body === 'CARDIAC ARREST DETECTED! ') {
                dispatch({ type: BackgroundMode.CA_DETECTED });
            }

            Alert.alert(message_title, message_body);
        });
    }, []);

    useEffect(() => {
        const subscribe = messaging().onMessage(async (remoteMessage: any) => {
            console.log(remoteMessage);

            let message_body = remoteMessage.notification.body;
            let message_title = remoteMessage.notification.title;
            let avatar = remoteMessage.notification.android.imageUrl;

            if (message_body === 'CARDIAC ARREST DETECTED! ') {
                dispatch({ type: BackgroundMode.CA_DETECTED });
            }

            Alert.alert(message_title, message_body);
        });

        return subscribe;
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

                    const isEPState =
                        newMode === BackgroundMode.CA_DETECTED ||
                        newMode === BackgroundMode.CALL_ENDED;

                    setIsEP(isEPState);
                    console.log(`isEP is ${isEP}`);
                }
            }
        );
    }, [listener]);

    // TODO: case where app is opened when call is in progress, CA detected while in background mode
    /*const initialEPScreen = useMemo((): EmergencyProtocolScreen => {
        const backgroundState = getLocalStorageBackgroundMode();

        if (backgroundState === BackgroundMode.CA_DETECTED) {
            return 'CardiacArrestDetected';
        } else if (backgroundState === BackgroundMode.CALL_ENDED) {
            return 'CallEnded';
        }

        return 'CallInProgress';
    }, [backgroundModeStorage]);*/

    return (
        <AppContextProvider>
            <NavigationContainer>
                {isEP ? (
                    <EmergencyProtocolStack
                        initialRouteName={'CardiacArrestDetected'}
                    />
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
