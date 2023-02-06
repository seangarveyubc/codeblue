import notifee from '@notifee/react-native';
import { useContext, useMemo } from 'react';
import { useLocalStorage } from '../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../localStorage/models/LocalStorageKeys';
import { AppContext } from './context/AppContext';
import { BackgroundMode } from './models/BackgroundMode';
import { NotifeeService } from './NotifeeService';

export const useBackgroundMode = () => {
    const { backgroundState } = useContext(AppContext);
    const { appDataStorage } = useLocalStorage();
    const notifeeService = new NotifeeService();

    let heartFn: any;
    let idleFn: any;
    let callFn: any;

    const setNotificationForegroundService = () => {
        notifee.registerForegroundService((notification) => {
            return new Promise(() => {
                notifee.onForegroundEvent(async ({ type, detail }) => {
                    notifeeService.cancelBackgroundTask(type, detail);
                    listener.remove();
                });

                notifee.onBackgroundEvent(async ({ type, detail }) => {
                    notifeeService.cancelBackgroundTask(type, detail);
                    listener.remove();
                });

                executeBackgroundTask(backgroundState);
                const listener =
                    appDataStorage.storage.addOnValueChangedListener(
                        (changedKey) => {
                            if (changedKey === BACKGROUND_MODE) {
                                const newValue =
                                    appDataStorage.getString(changedKey);
                                console.log(
                                    `"${changedKey}" new value: ${newValue}`
                                );
                                clearExistingIntervals(heartFn, callFn, idleFn);
                                switch (newValue) {
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
                            }
                        }
                    );
            });
        });

        notifeeService.displayNotification();
    };

    const executeBackgroundTask = (mode: BackgroundMode) => {
        console.log('executeBackgroundTask mode', mode);
        switch (mode) {
            case BackgroundMode.MONITOR_HEART: // send data to algorithm
                //clearExistingIntervals(heartFn, callFn, idleFn);
                heartFn = setInterval(() => {
                    console.log('reading heart rate');
                }, 5000);
                break;
            case BackgroundMode.PHONE_CALL:
            case BackgroundMode.TEXT_TO_SPEECH:
                //clearExistingIntervals(heartFn, callFn, idleFn);
                callFn = setInterval(() => {
                    console.log('calling');
                }, 5000);
                break;
            default: // idle - do nothing
                //clearExistingIntervals(heartFn, callFn, idleFn);
                idleFn = setInterval(() => {
                    console.log('idle');
                }, 5000);
                break;
        }
    };

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

    return { setNotificationForegroundService };
};
