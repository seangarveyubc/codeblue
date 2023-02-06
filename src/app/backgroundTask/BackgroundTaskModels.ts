export enum BackgroundTaskType {
    IDLE = 'idle',
    MONITOR_HEART = 'monitor_heart',
    PHONE_CALL = 'phone_call',
    TEXT_TO_SPEECH = 'text_to_speech'
}

export interface BackgroundTaskUpdatePayload {
    type: BackgroundTaskType;
}
