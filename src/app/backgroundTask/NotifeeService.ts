import notifee, { EventType, EventDetail } from '@notifee/react-native';
import { BackgroundTaskType } from './BackgroundTaskModels';

export const FOREGROUND_NOTIF_CHANNEL_ID = 'codeblue.foreground.notif';
export async function setNotificationForegroundService(
    mode: BackgroundTaskType
) {
    const channelId = await notifee.createChannel({
        name: 'Ringing',
        id: FOREGROUND_NOTIF_CHANNEL_ID
    });

    notifee.registerForegroundService((notification) => {
        return new Promise(() => {
            notifee.onForegroundEvent(async ({ type, detail }) =>
                cancelBackgroundTask(type, detail)
            );

            notifee.onBackgroundEvent(async ({ type, detail }) =>
                cancelBackgroundTask(type, detail)
            );

            switch (mode) {
                case BackgroundTaskType.MONITOR_HEART: // send data to algorithm
                case BackgroundTaskType.PHONE_CALL:
                case BackgroundTaskType.TEXT_TO_SPEECH:
                default: // idle - do nothing
            }
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

    const cancelBackgroundTask = async (
        type: EventType,
        detail: EventDetail
    ) => {
        if (
            type === EventType.ACTION_PRESS &&
            detail?.pressAction?.id === 'stop'
        ) {
            await notifee.stopForegroundService();
            notifee.cancelNotification(FOREGROUND_NOTIF_CHANNEL_ID);
        }
    };
}
