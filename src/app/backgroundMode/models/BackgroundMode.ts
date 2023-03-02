export enum BackgroundMode {
    IDLE = 'idle',
    MONITOR_HEART = 'monitor_heart',
    PHONE_CALL = 'phone_call',
    TEXT_TO_SPEECH = 'text_to_speech'
}

export interface BackgroundModeUpdatePayload {
    type: BackgroundMode;
}
