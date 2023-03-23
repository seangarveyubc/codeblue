import {
    backgroundModeStorage,
    useLocalStorage
} from '../../localStorage/hooks/useLocalStorage';
import {
    BACKGROUND_MODE,
    EP_TIMER,
    HOST_DEVICE_ID
} from '../../localStorage/models/LocalStorageKeys';
import { BackgroundMode } from '../models/BackgroundMode';
import * as utils from '../../../../src/app/utils/AppUtils';

export class BackgroundProcess {
    mode: BackgroundMode;
    listener: any;
    heartFn: any;
    idleFn: any;
    callFn: any;

    constructor() {
        console.log('[BackgroundProcess] created a background process');
        this.mode = getLocalStorageBackgroundMode() ?? BackgroundMode.IDLE;
        this.startBackgroundTaskListener();
        this.executeBackgroundTask(this.mode);
    }

    executeBackgroundTask(mode: BackgroundMode) {
        switch (mode) {
            case BackgroundMode.MONITOR_HEART: {
                // send data to algorithm
                this.heartFn = setInterval(async () => {
                    console.log('reading heart rate');
                    const { appDataStorage } = useLocalStorage();
                    const deviceId =
                        appDataStorage.getString(HOST_DEVICE_ID) ?? '';
                    utils.fetchDetectCA(
                        utils.local_healthy_address,
                        [1, 2, 3],
                        'forehead',
                        deviceId
                    );
                }, 10000);
                break;
            }
            case BackgroundMode.CA_DETECTED: {
                // TODO: handle CA detected while in background mode
                /*if (AppState.currentState === 'background') {
                    // handle countdown in the background
                    for (let i = 1; i <= 30; i++) {
                        setTimeout(() => {
                            // update local storage with time left
                            backgroundModeStorage.add(EP_TIMER, 30 - i);
                            if (i === 30) {
                                this.handleBackgroundCADetected();
                            }
                        }, i * 1000);
                    }
                }*/
                this.callFn = setInterval(() => {
                    console.log('ca detected');
                }, 5000);
                break;
            }
            case BackgroundMode.CALL_ENDED: {
                this.callFn = setInterval(() => {
                    console.log('call ended');
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

    // TODO: handle CA detected while in background mode
    /*handleBackgroundCADetected() {
        TriggerCall();
        // (short circuit dispatch) open to call ended screen after call placed
        backgroundModeStorage.add(BACKGROUND_MODE, BackgroundMode.CALL_ENDED);
    }*/

    startBackgroundTaskListener() {
        this.listener = backgroundModeStorage.storage.addOnValueChangedListener(
            (changedKey) => {
                if (changedKey === BACKGROUND_MODE) {
                    const newMode: BackgroundMode =
                        getLocalStorageBackgroundMode();
                    console.log(
                        `[notifeeService listener] "${changedKey}" new value: ${newMode}`
                    );
                    // set EP timer back to 30s
                    backgroundModeStorage.add(EP_TIMER, 30);
                    this.clearExistingIntervals(
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

    // TODO: delete once real tasks are implemented
    private clearExistingIntervals = (
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
}

export const getLocalStorageBackgroundMode = (): BackgroundMode => {
    return backgroundModeStorage.getString(BACKGROUND_MODE) as BackgroundMode;
};
