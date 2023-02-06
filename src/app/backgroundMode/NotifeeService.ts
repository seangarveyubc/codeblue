import notifee, { EventType, EventDetail } from '@notifee/react-native';

export const FOREGROUND_NOTIF_CHANNEL_ID = 'codeblue.foreground.notification';

export class NotifeeService {
    private async createChannelId() {
        return await notifee.createChannel({
            name: 'Foreground Service',
            id: FOREGROUND_NOTIF_CHANNEL_ID
        });
    }

    async cancelBackgroundTask(type: EventType, detail: EventDetail) {
        if (
            type === EventType.ACTION_PRESS &&
            detail?.pressAction?.id === 'stop'
        ) {
            await notifee.stopForegroundService();
            notifee.cancelNotification(FOREGROUND_NOTIF_CHANNEL_ID);
        }
    }

    async displayNotification() {
        const channelId = await this.createChannelId();
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
    }
}
