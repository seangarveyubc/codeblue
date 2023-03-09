export enum BackgroundMode {
    IDLE = 'idle',
    MONITOR_HEART = 'monitor_heart',
    CA_DETECTED = 'ca_detected'
}

export interface BackgroundModeUpdatePayload {
    type: BackgroundMode;
}
