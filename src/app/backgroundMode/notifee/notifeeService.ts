import notifee, { EventType, EventDetail } from '@notifee/react-native';
import { DAY_IN_MILLIS } from '../../constants/constants';
import {
    backgroundModeStorage,
    cardiacStorage
} from '../../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../../localStorage/models/LocalStorageKeys';
import { BackgroundMode } from '../models/BackgroundMode';

export const FOREGROUND_NOTIF_CHANNEL_ID = 'codeblue.foreground.notification';

export const isBackgroundModeDefined = Boolean(
    backgroundModeStorage.getString(BACKGROUND_MODE)
);

export const setNotificationForegroundService = () => {
    const initialBackgroundState =
        (backgroundModeStorage.getString(BACKGROUND_MODE) as BackgroundMode) ??
        BackgroundMode.IDLE;

    let heartFn: any;
    let idleFn: any;
    let callFn: any;

    notifee.registerForegroundService((notification) => {
        return new Promise(() => {
            console.log('registered foreground service');

            notifee.onForegroundEvent(async ({ type, detail }) => {
                cancelBackgroundTask(type, detail);
                listener.remove();
            });

            notifee.onBackgroundEvent(async ({ type, detail }) => {
                cancelBackgroundTask(type, detail);
                listener.remove();
            });

            setInterval(() => {
                cardiacStorage.refresh();
            }, DAY_IN_MILLIS);

            // TODO: replace with actual background tasks
            const executeBackgroundTask = (mode: BackgroundMode) => {
                console.log('executeBackgroundTask mode', mode);
                switch (mode) {
                    case BackgroundMode.MONITOR_HEART: // send data to algorithm
                        heartFn = setInterval(() => {
                            console.log('reading heart rate');
                        }, 5000);
                        break;
                    case BackgroundMode.PHONE_CALL:
                    case BackgroundMode.TEXT_TO_SPEECH:
                        callFn = setInterval(() => {
                            console.log('calling');
                        }, 5000);
                        break;
                    default: // idle - do nothing
                        idleFn = setInterval(() => {
                            console.log('idle');
                        }, 5000);
                        break;
                }
            };

            const listener =
                backgroundModeStorage.storage.addOnValueChangedListener(
                    (changedKey) => {
                        if (changedKey === BACKGROUND_MODE) {
                            const newValue =
                                backgroundModeStorage.getString(changedKey);
                            console.log(
                                `"${changedKey}" new value: ${newValue}`
                            );
                            clearExistingIntervals(heartFn, callFn, idleFn);
                            executeBackgroundTask(newValue as BackgroundMode);
                        }
                    }
                );
            executeBackgroundTask(initialBackgroundState);
        });
    });

    displayNotification();
};

// TODO: delete once real tasks are implemented
const clearExistingIntervals = (heartFn: any, callFn: any, idleFn: any) => {
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
