import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import {
    backgroundModeStorage,
    useLocalStorage
} from '../localStorage/hooks/useLocalStorage';
import messaging from '@react-native-firebase/messaging';
import {
    BACKGROUND_MODE,
    HOST_DEVICE_ID
} from '../localStorage/models/LocalStorageKeys';
import { BackgroundMode } from '../backgroundMode/models/BackgroundMode';

/**
 * Handler for remote push notifications from FCM when app is in the background
 * Displays custom notification in device notification center
 */
export const handleBackgroundNotification = async (remoteMessage: any) => {
    // navigate to EP CA detected screen in the background
    backgroundModeStorage.add(BACKGROUND_MODE, BackgroundMode.CA_DETECTED);

    let message_body = remoteMessage.notification.body;
    let message_title = remoteMessage.notification.title;
    displayCANotification(message_title, message_body);
};

/**
 * Handler for remote push notifications from FCM when app is open in the foreground
 * Leads directly to EP CA detected page
 */
export const handleForegroundNotification = async (remoteMessage: any) => {
    // navigate to EP CA detected screen
    backgroundModeStorage.add(BACKGROUND_MODE, BackgroundMode.CA_DETECTED);
};

/**
 * Constructs and displays custom notification
 */
export const displayCANotification = async (title: string, body: string) => {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'codeblue',
        name: 'CodeBlue Channel',
        importance: AndroidImportance.HIGH
    });

    // Display a notification
    await notifee.displayNotification({
        title: title,
        body: body,
        android: {
            channelId,
            importance: AndroidImportance.HIGH,
            pressAction: {
                id: 'default'
            },
            actions: [
                {
                    title: '<b>Call</b> &#9989;',
                    pressAction: { id: 'call', launchActivity: 'default' }
                },
                {
                    title: '<p style="color: #f44336;"><b>Cancel</b> &#10060;</p>',
                    pressAction: { id: 'cancel', launchActivity: 'default' }
                }
            ],
            autoCancel: true,
            ongoing: true,
            showChronometer: true,
            chronometerDirection: 'down',
            timestamp: Date.now() + 60000, // 5 minutes
            showTimestamp: true
        }
    });
};

/**
 * Fetches FCM device token for the device/ simulator running the app and saves it to local storage
 */
export async function saveDeviceFCMToken() {
    const { appDataStorage } = useLocalStorage();
    const authStatus = await messaging().requestPermission();

    if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log('TOKEN:', fcmToken);
            appDataStorage.add(HOST_DEVICE_ID, fcmToken);
        } else {
            console.log('Failed', 'No token received');
        }
    }
}


const ec2_address = 'http://34.209.155.128:3000';

/**
 * Constructs and sends a post request to specified address. Reqeust body type should match the format specified in `codeblue-server` repo's README
 */
export const fetchDetectDemo = (device_id: string) => {
    fetch(ec2_address + '/heartrate', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            heartrate: 60,
            device_id: device_id
        })
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        })
        .catch((error) => {
            console.error(error);
        });
};
