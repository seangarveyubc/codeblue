export enum BackgroundMode {
    IDLE = 'idle',
    MONITOR_HEART = 'monitor_heart',
    CA_DETECTED = 'ca_detected',
    CALL_ENDED = 'call_ended',
    CALL_NOW = 'call_now'
}

export interface BackgroundModeUpdatePayload {
    type: BackgroundMode;
}
