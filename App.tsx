import * as React from 'react';
import { useEffect, useState } from 'react';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import StorybookUI from './storybook';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType, Event } from '@notifee/react-native';
import { useLocalStorage } from './src/app/localStorage/hooks/useLocalStorage';
import { DeviceKeys } from './src/app/localStorage/models/LocalStorageKeys';
import * as utils from './src/app/utils/AppUtils';


// save FCM device token id into local storage
utils.saveDeviceFCMToken();


const App = () => {
    const { appDataStorage } = useLocalStorage();
    const [deviceId, setDeviceId] = useState(
        appDataStorage.getString(DeviceKeys.DEVICE_LIST) ?? ''
    );

    // console.log(deviceId);
    utils.get_request(utils.local_healthy_address, deviceId);

    notifee.onForegroundEvent(({ type, detail }: Event) => {
        if (type === EventType.ACTION_PRESS && detail.pressAction?.id) {
            console.log(
                'User pressed an action with the id: ',
                detail.pressAction.id
            );
        }
    });

    notifee.onBackgroundEvent(async ({ type, detail }:Event) => {
        // if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'reply') {
        //   await updateChat(detail.notification.data.chatId, detail.input);
        //   await notifee.cancelNotification(detail.notification.id);
        // }
        if (type === EventType.ACTION_PRESS && detail.pressAction?.id) {
            console.log(
                'User pressed an action with the id: ',
                detail.pressAction.id
            );
        }
    });

    // set background push notification handler
    useEffect(() => {
        messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
            console.log(remoteMessage);

            let message_body = remoteMessage.notification.body;
            let message_title = remoteMessage.notification.title;

            utils.displayNotification(message_title, message_body);
        });
    }, []);

    // set foreground push notification handler
    useEffect(() => {
        console.log(deviceId);
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
