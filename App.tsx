import * as React from 'react';
import { useEffect } from 'react';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import StorybookUI from './storybook';
import { Alert } from 'react-native';
import { useBackgroundMode } from './src/app/backgroundMode/useBackgroundMode';

async function printDeviceFCMToken() {
    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log('TOKEN:', fcmToken);
        } else {
            console.log('Failed', 'No token received');
        }
    };
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        getFcmToken();
        console.log('Authorization status:', authStatus);
    }
}

printDeviceFCMToken();

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
