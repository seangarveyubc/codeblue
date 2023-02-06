import {
    BackgroundMode,
    BackgroundModeUpdatePayload
} from '../models/BackgroundMode';

export const backgroundModeReducer = (
    state: BackgroundMode,
    action: BackgroundModeUpdatePayload
): BackgroundMode => {
    switch (action.type) {
        case BackgroundMode.MONITOR_HEART:
            return BackgroundMode.MONITOR_HEART;
        case BackgroundMode.PHONE_CALL:
            return BackgroundMode.PHONE_CALL;
        case BackgroundMode.TEXT_TO_SPEECH:
            return BackgroundMode.TEXT_TO_SPEECH;
        default:
            return BackgroundMode.IDLE;
    }
};
