import { DAY_IN_MILLIS } from '../../constants/constants';

export class CardiacData {
    frequency: number;
    deviceId: string;
    timestamp: Date;
    expiration: Date; // data "expires" 24 hours from when it was first saved

    constructor(frequency: number, deviceId: string) {
        this.frequency = frequency; // or bpm
        this.deviceId = deviceId;
        this.timestamp = new Date();
        this.expiration = new Date(this.timestamp.getTime() + DAY_IN_MILLIS);
    }
}
