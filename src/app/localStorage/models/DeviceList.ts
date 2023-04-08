export interface DeviceData {
    name: string;
    id: string;
    location: string;
}

export interface DeviceList {
    devices: DeviceData[];
}
