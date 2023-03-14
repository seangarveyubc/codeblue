import * as React from 'react';
import { useEffect, useState } from 'react';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import StorybookUI from './storybook';
import { Alert } from 'react-native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { useLocalStorage } from './src/app/localStorage/hooks/useLocalStorage';
import { DeviceKeys } from './src/app/localStorage/models/LocalStorageKeys';


const displayNotification = async (title:string, body:string) => {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'codeblue',
        name: 'CodeBlue Channel',
        importance: AndroidImportance.HIGH,
    });
  
    // Display a notification
    await notifee.displayNotification({
        title: title,
        body: body,
        android: {
            channelId,
            importance: AndroidImportance.HIGH,
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
                id: 'default',
                mainComponent: 'ca-component',
            },
            actions: [
                {
                    title: '<b>Call</b> &#9989;',
                    pressAction: {
                        id: 'default',
                        mainComponent: 'ca-component',
                    },
                },
                {
                  title: '<p style="color: #f44336;"><b>Cancel</b> &#10060;</p>',
                  pressAction: { id: 'cancel' },
                },
            ],
            autoCancel: false,
            loopSound: true,
            ongoing: true,
            showChronometer: true,
            chronometerDirection: 'down',
            timestamp: Date.now() + 60000, // 5 minutes
        },
    });
};

const {
    saveDeviceId
} = useLocalStorage();

async function printDeviceFCMToken() {
    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log('TOKEN:', fcmToken);
            saveDeviceId(DeviceKeys.DEVICE_LIST, fcmToken);
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
    const { appDataStorage, saveDeviceId } = useLocalStorage();

    // useEffect(() => {
    //     // declare the data fetching function
    //     const fetchData = async () => {
    //         const token = await messaging().getToken();
    //         return token;
    //     }
      
    //     // call the function
    //     fetchData().then((val) => {
    //         console.log(val);
    //         saveDeviceId(DeviceKeys.DEVICE_LIST, val);
    //     });
        
    // }, [])
    
    notifee.onForegroundEvent(({ type, detail }:any) => {
        if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
          console.log('User pressed an action with the id: ', detail.pressAction.id);
        }
    });

    useEffect(() => {
        messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
            console.log(remoteMessage);

            let message_body = remoteMessage.notification.body;
            let message_title = remoteMessage.notification.title;

            displayNotification(message_title, message_body);
        });

        console.log(appDataStorage.getString(DeviceKeys.DEVICE_LIST))
    }, []);

    useEffect(() => {
        const subscribe = messaging().onMessage(async (remoteMessage: any) => {
            console.log(remoteMessage);

            let message_body = remoteMessage.notification.body;
            let message_title = remoteMessage.notification.title;

            Alert.alert(message_title, message_body);
            // navigate to EP screen
        });

        return subscribe;
    }, []);

    return <AppNavigator />;
};

// Variable to switch between running CodeBlue App and components Storybook
const STORYBOOK_START = false;

export default STORYBOOK_START ? StorybookUI : App;
