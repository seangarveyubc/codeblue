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

    // utils.get_request(utils.local_healthy_address, deviceId);

    useEffect(() => {
        // set background push notification handler
        messaging().setBackgroundMessageHandler(utils.handleRemoteNotification);

        // set foreground push notification handler
        messaging().onMessage(utils.handleRemoteNotification);
    }, []);

    return <AppNavigator />;
};

// Variable to switch between running CodeBlue App and components Storybook
const STORYBOOK_START = false;

export default STORYBOOK_START ? StorybookUI : App;
