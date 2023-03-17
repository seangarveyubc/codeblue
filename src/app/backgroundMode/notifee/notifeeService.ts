import notifee, { EventType, EventDetail } from '@notifee/react-native';
import { DAY_IN_MILLIS } from '../../constants/constants';
import {
    backgroundModeStorage,
    cardiacStorage
} from '../../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../../localStorage/models/LocalStorageKeys';
import { BackgroundMode } from '../models/BackgroundMode';
import { BackgroundProcess } from './BackgroundProcess';

export const FOREGROUND_NOTIF_CHANNEL_ID = 'codeblue.foreground.notification';

export const isBackgroundModeDefined = Boolean(
    backgroundModeStorage.getString(BACKGROUND_MODE)
);

export const setNotificationForegroundService = () => {
    notifee.registerForegroundService(() => {
        return new Promise(() => {
            console.log('[notifeeService] registered foreground service');
            const process = new BackgroundProcess();

            // refresh the local cardiac data cache
            setInterval(() => {
                cardiacStorage.refresh();
            }, DAY_IN_MILLIS);

            notifee.onForegroundEvent(async ({ type, detail }) => {
                console.log(
                    'User pressed a foreground action with the id: ',
                    detail.pressAction?.id
                );
                cancelBackgroundTask(type, detail);
                process.removeBackgroundTaskListener();
            });

            notifee.onBackgroundEvent(async ({ type, detail }) => {
                console.log(
                    'User pressed a background action with the id: ',
                    detail.pressAction?.id
                );
                cancelBackgroundTask(type, detail);
                process.removeBackgroundTaskListener();
            });
        });
    });

    displayNotification();
};

const createChannelId = async () => {
    return await notifee.createChannel({
        name: 'Foreground Service',
        id: FOREGROUND_NOTIF_CHANNEL_ID
    });
};

const cancelBackgroundTask = async (type: EventType, detail: EventDetail) => {
    console.log(type);
    console.log(detail);
    if (type === EventType.ACTION_PRESS && detail?.pressAction?.id === 'stop') {
        await notifee.stopForegroundService();
        notifee.cancelNotification(FOREGROUND_NOTIF_CHANNEL_ID);
    } else if (type === EventType.ACTION_PRESS && detail?.pressAction?.id === 'ca') {
        console.log('notif call button pressed');
        backgroundModeStorage.add(BACKGROUND_MODE, BackgroundMode.CA_DETECTED);
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
