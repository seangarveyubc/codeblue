import notifee, { EventType, EventDetail } from '@notifee/react-native';

export const FOREGROUND_NOTIF_CHANNEL_ID = 'codeblue.foreground.notification';

const createChannelId = async () => {
    return await notifee.createChannel({
        name: 'Foreground Service',
        id: FOREGROUND_NOTIF_CHANNEL_ID
    });
};

const cancelBackgroundTask = async (type: EventType, detail: EventDetail) => {
    if (type === EventType.ACTION_PRESS && detail?.pressAction?.id === 'stop') {
        await notifee.stopForegroundService();
        notifee.cancelNotification(FOREGROUND_NOTIF_CHANNEL_ID);
    }
};

const displayNotification = async () => {
    const channelId = await createChannelId();
    notifee.displayNotification({
        id: FOREGROUND_NOTIF_CHANNEL_ID,
        title: 'CodeBlue',
        body: 'CodeBlue is running in the background',
        android: {
            channelId: channelId,
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
};

export { createChannelId, cancelBackgroundTask, displayNotification };
