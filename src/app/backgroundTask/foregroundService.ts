import * as React from 'react';
import notifee, { EventType, AndroidColor } from '@notifee/react-native';

export const FOREGROUND_NOTIF_CHANNEL_ID = 'codeblue.foreground.notif';
export async function setNotificationForegroundService() {
    const channelId = await notifee.createChannel({
        name: 'Ringing',
        id: FOREGROUND_NOTIF_CHANNEL_ID
    });

    notifee.registerForegroundService((notification) => {
        return new Promise(() => {
            notifee.onForegroundEvent(async ({ type, detail }) => {
                if (
                    type === EventType.ACTION_PRESS &&
                    detail?.pressAction?.id === 'stop'
                ) {
                    await notifee.stopForegroundService();
                    notifee.cancelNotification(FOREGROUND_NOTIF_CHANNEL_ID);
                }
            });

            notifee.onBackgroundEvent(async ({ type, detail }) => {
                if (
                    type === EventType.ACTION_PRESS &&
                    detail?.pressAction?.id === 'stop'
                ) {
                    await notifee.stopForegroundService();
                    notifee.cancelNotification(FOREGROUND_NOTIF_CHANNEL_ID);
                }
            });

            setInterval(() => {
                console.log('hello');
            }, 5000);
        });
    });

    notifee.displayNotification({
        id: FOREGROUND_NOTIF_CHANNEL_ID,
        title: 'CodeBlue',
        body: 'CodeBlue is running in the background',
        android: {
            channelId,
            asForegroundService: true,
            actions: [
                {
                    title: 'Cancel',
                    pressAction: {
                        id: 'stop'
                    }
                }
            ]
        }
    });
}
