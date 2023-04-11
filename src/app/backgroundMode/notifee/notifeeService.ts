import notifee, { EventType, EventDetail } from '@notifee/react-native';
import { DAY_IN_MILLIS } from '../../constants/constants';
import {
    backgroundModeStorage,
    cardiacStorage
} from '../../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../../localStorage/models/LocalStorageKeys';
import { BackgroundMode } from '../models/BackgroundMode';
import { BackgroundProcess } from './BackgroundProcess';
import { Vibration } from 'react-native';

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
                handleNotificationPress(type, detail);
                cancelBackgroundTask(type, detail);
                process.removeBackgroundTaskListener();
            });

            notifee.onBackgroundEvent(async ({ type, detail }) => {
                console.log(
                    'User pressed a background action with the id: ',
                    detail.pressAction?.id
                );
                handleNotificationPress(type, detail);
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
    if (type === EventType.ACTION_PRESS && detail?.pressAction?.id === 'stop') {
        await notifee.stopForegroundService();
        notifee.cancelNotification(FOREGROUND_NOTIF_CHANNEL_ID);
    }
};

const handleNotificationPress = async (
    type: EventType,
    detail: EventDetail
) => {
    if (type === EventType.ACTION_PRESS) {
        if (detail?.pressAction?.id === 'call') {
            console.log('call immediately');
            backgroundModeStorage.add(BACKGROUND_MODE, BackgroundMode.CALL_NOW);
        } else if (detail?.pressAction?.id === 'cancel') {
            console.log('cancel call immediately');
            Vibration.cancel();
            backgroundModeStorage.add(
                BACKGROUND_MODE,
                BackgroundMode.MONITOR_HEART
            );
        }
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
