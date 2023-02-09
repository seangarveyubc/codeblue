import React, { useEffect } from 'react';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import StorybookUI from './storybook';
import { Alert } from 'react-native';
import { useBackgroundMode } from './src/app/backgroundMode/useBackgroundMode';

const App = () => {
    const { setNotificationForegroundService } = useBackgroundMode();

    useEffect(() => {
        messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
            console.log(remoteMessage);

            let message_body = remoteMessage.notification.body;
            let message_title = remoteMessage.notification.title;
            let avatar = remoteMessage.notification.android.imageUrl;

            Alert.alert(message_title, message_body);
        });
    }, []);

    useEffect(() => {
        const subscribe = messaging().onMessage(async (remoteMessage: any) => {
            console.log(remoteMessage);

            let message_body = remoteMessage.notification.body;
            let message_title = remoteMessage.notification.title;
            let avatar = remoteMessage.notification.android.imageUrl;

            Alert.alert(message_title, message_body);
        });

        return subscribe;
    }, []);

    setNotificationForegroundService();

    return <AppNavigator />;
};

// Variable to switch between running CodeBlue App and components Storybook
const STORYBOOK_START = false;

export default STORYBOOK_START ? StorybookUI : App;
