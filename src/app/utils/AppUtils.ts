import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { useLocalStorage } from '../localStorage/hooks/useLocalStorage';
import messaging from '@react-native-firebase/messaging';
import { DeviceKeys } from '../localStorage/models/LocalStorageKeys';

export const displayNotification = async (title: string, body: string) => {
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
                id: 'default',
                mainComponent: 'ca-component'
            },
            actions: [
                {
                    title: '<b>Call</b> &#9989;',
                    pressAction: {
                        id: 'ca',
                        mainComponent: 'ca-component'
                    }
                },
                {
                    title: '<p style="color: #f44336;"><b>Cancel</b> &#10060;</p>',
                    pressAction: { id: 'cancel' }
                }
            ],
            autoCancel: false,
            loopSound: true,
            ongoing: true,
            showChronometer: true,
            chronometerDirection: 'down',
            timestamp: Date.now() + 60000 // 5 minutes
        }
    });
};

const { saveDeviceId } = useLocalStorage();

export async function saveDeviceFCMToken() {
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
    }
}

export const local_healthy_address = 'http://10.0.2.2:3000/healthy';
export const local_ca_address = 'http://10.0.2.2:3000/ca';
export const ec2_healthy_address = 'http://54.190.226.175:3000/healthy';
export const ec2_ca_address = 'http://54.190.226.175:3000/ca';

export const get_request = (address: string, device_id: string) => {
    fetch(address, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([device_id])
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        })
        .catch((error) => {
            console.error(error);
        });
};