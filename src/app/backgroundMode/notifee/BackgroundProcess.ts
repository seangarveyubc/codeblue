import { AppState } from 'react-native';
import { backgroundModeStorage } from '../../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../../localStorage/models/LocalStorageKeys';
import { clearExistingIntervals } from './notifeeService';
import { BackgroundMode } from '../models/BackgroundMode';
import { TriggerCall } from '../../EMSCall/TriggerCall';

export class BackgroundProcess {
    mode: BackgroundMode;
    listener: any;
    heartFn: any;
    idleFn: any;
    callFn: any;
    wasCallTriggered: boolean;

    constructor() {
        console.log('[BackgroundProcess] created a background process');
        this.mode =
            (backgroundModeStorage.getString(
                BACKGROUND_MODE
            ) as BackgroundMode) ?? BackgroundMode.IDLE;
        this.wasCallTriggered = false;
        this.startBackgroundTaskListener();
        this.executeBackgroundTask(this.mode);
    }

    executeBackgroundTask(mode: BackgroundMode) {
        switch (mode) {
            case BackgroundMode.MONITOR_HEART: {
                // send data to algorithm
                this.heartFn = setInterval(async () => {
                    console.log('reading heart rate');
                    // TODO: update fetch to send data to algo
                    /*const response = await fetch(
                        `http://34.209.158.8:3000/`,
                        {
                            method: 'GET'
                        }
                    );
                    console.log(response);*/
                }, 10000);
                break;
            }
            case BackgroundMode.CA_DETECTED: {
                // Place call if app is backgrounded
                if (AppState.currentState === 'background') {
                    TriggerCall();
                    // Resume cardiac monitoring after call placed
                    backgroundModeStorage.add(
                        BACKGROUND_MODE,
                        BackgroundMode.MONITOR_HEART
                    );
                }
                this.callFn = setInterval(() => {
                    console.log('ca detected');
                }, 5000);
                break;
            }
            default: {
                // idle - do nothing
                this.idleFn = setInterval(() => {
                    console.log('idle');
                }, 5000);
                break;
            }
        }
    }

    startBackgroundTaskListener() {
        this.listener = backgroundModeStorage.storage.addOnValueChangedListener(
            (changedKey) => {
                if (changedKey === BACKGROUND_MODE) {
                    const newMode: BackgroundMode =
                        backgroundModeStorage.getString(
                            changedKey
                        ) as BackgroundMode;
                    console.log(
                        `[notifeeService listener] "${changedKey}" new value: ${newMode}`
                    );
                    clearExistingIntervals(
                        this.heartFn,
                        this.callFn,
                        this.idleFn
                    );
                    this.executeBackgroundTask(newMode);
                }
            }
        );
    }

    removeBackgroundTaskListener() {
        this.listener.remove();
    }
}
