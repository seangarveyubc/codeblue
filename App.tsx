import React, { useEffect } from 'react';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import StorybookUI from './storybook';
import { Alert } from 'react-native';
import { TriggerCall } from './src/app/EMSCall/TriggerCall';


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
    useEffect(() => {
        messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
            console.log(remoteMessage);

            let message_body = remoteMessage.notification.body;
            let message_title = remoteMessage.notification.title;

            Alert.alert(message_title, message_body);
            TriggerCall();
        });
    }, []);

    useEffect(() => {
        const subscribe = messaging().onMessage(async (remoteMessage: any) => {
            console.log(remoteMessage);

            let message_body = remoteMessage.notification.body;
            let message_title = remoteMessage.notification.title;

            Alert.alert(message_title, message_body);
            TriggerCall();
        });

        return subscribe;
    }, []);
    
    return <AppNavigator />;
};

// Variable to switch between running CodeBlue App and components Storybook
const STORYBOOK_START = false;

export default STORYBOOK_START ? StorybookUI : App;
