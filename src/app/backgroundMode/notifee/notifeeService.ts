import notifee, { EventType, EventDetail } from '@notifee/react-native';
import { DAY_IN_MILLIS } from '../../constants/constants';
import {
    backgroundModeStorage,
    cardiacStorage
} from '../../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../../localStorage/models/LocalStorageKeys';
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
                cancelBackgroundTask(type, detail);
                process.removeBackgroundTaskListener();
            });

            notifee.onBackgroundEvent(async ({ type, detail }) => {
                cancelBackgroundTask(type, detail);
                process.removeBackgroundTaskListener();
            });
        });
    });

    displayNotification();
};

// TODO: delete once real tasks are implemented
export const clearExistingIntervals = (
    heartFn: any,
    callFn: any,
    idleFn: any
) => {
    if (heartFn) {
        clearInterval(heartFn);
        heartFn = undefined;
    }

    if (callFn) {
        clearInterval(callFn);
        callFn = undefined;
    }

    if (idleFn) {
        clearInterval(idleFn);
        idleFn = undefined;
    }
};

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
