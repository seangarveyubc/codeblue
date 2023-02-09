import notifee from '@notifee/react-native';
import { useLocalStorage } from '../../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../../localStorage/models/LocalStorageKeys';
import { BackgroundMode } from '../models/BackgroundMode';
import { cancelBackgroundTask, displayNotification } from '../notifeeUtils';

export const useBackgroundMode = () => {
    const { backgroundModeStorage } = useLocalStorage();
    const initialBackgroundState =
        (backgroundModeStorage.getString(BACKGROUND_MODE) as BackgroundMode) ??
        BackgroundMode.IDLE;

    let heartFn: any;
    let idleFn: any;
    let callFn: any;

    const isBackgroundModeDefined = Boolean(
        backgroundModeStorage.getString(BACKGROUND_MODE)
    );

    const setNotificationForegroundService = () => {
        notifee.registerForegroundService((notification) => {
            return new Promise(() => {
                notifee.onForegroundEvent(async ({ type, detail }) => {
                    cancelBackgroundTask(type, detail);
                    listener.remove();
                });

                notifee.onBackgroundEvent(async ({ type, detail }) => {
                    cancelBackgroundTask(type, detail);
                    listener.remove();
                });

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
                                executeBackgroundTask(
                                    newValue as BackgroundMode
                                );
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

    return { isBackgroundModeDefined, setNotificationForegroundService };
};
