import { CardiacData } from './CardiacData';
import { DeviceList } from './DeviceList';
import { MedicationList } from './MedicationList';

export const generateCardiacDataKey = (data: CardiacData): string => {
    return data.deviceId + ' ' + data.expiration.getTime();
};

export const serializeLocalStorageObject = (
    data: MedicationList | DeviceList
): string => {
    return JSON.stringify(data);
};

export const deserializeMedicationList = (
    data: string
): MedicationList | undefined => {
    const medData = JSON.parse(data);
    if (medData.hasOwnProperty('medications')) {
        return {
            medications: medData.medications
        };
    }

    console.error(
        'Could not deserialize MedicationList from JSON string',
        data
    );
};

export const deserializeDeviceList = (data: string): DeviceList | undefined => {
    const deviceListData = JSON.parse(data);
    if (deviceListData.hasOwnProperty('devices')) {
        return {
            devices: deviceListData.devices
        };
    }

    console.error('Could not deserialize DeviceList from JSON string', data);
};
