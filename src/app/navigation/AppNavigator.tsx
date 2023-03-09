import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    const { initialBackgroundState } = useContext(AppContext);
    const [isEP, setIsEP] = useState(
        initialBackgroundState === BackgroundMode.CA_DETECTED
    );
    let listener: any;

    // subsribe to background mode value changes in local storage
    useEffect(() => {
        listener = backgroundModeStorage.storage.addOnValueChangedListener(
            (changedKey) => {
                if (changedKey === BACKGROUND_MODE) {
                    const newMode: BackgroundMode =
                        backgroundModeStorage.getString(
                            changedKey
                        ) as BackgroundMode;
                    console.log(
                        `[AppNavigator] background mode changed to ${newMode}`
                    );

                    if (newMode === BackgroundMode.CA_DETECTED) {
                        setIsEP(true);
                    } else {
                        setIsEP(false);
                    }
                    console.log(`isEP is ${isEP}`);
                }
            }
        );
    }, [listener]);

    return (
        <AppContextProvider>
            <NavigationContainer>
                {isEP ? (
                    <EmergencyProtocolStack />
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
