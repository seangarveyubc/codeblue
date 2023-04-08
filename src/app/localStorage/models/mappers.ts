import { CardiacData } from './CardiacData';
import { DeviceList } from './DeviceList';
import { MedicationList } from './MedicationList';

export const generateCardiacDataKey = (data: CardiacData): string => {
    return data.deviceId + ' ' + data.expiration.getTime();
};

// serializes a JavaScript object into a JSON string
export const serializeLocalStorageObject = (
    data: MedicationList | DeviceList
): string => {
    return JSON.stringify(data);
};

// deserializes a JSON string to a valid MedicationList object, else returns undefined
export const deserializeMedicationList = (
    data: string
): MedicationList | undefined => {
    try {
        const medData = JSON.parse(data);
        if (medData.hasOwnProperty('medications')) {
            return {
                medications: medData.medications
            };
        }
    } catch (e: any) {
        console.log(
            'Could not deserialize MedicationList from JSON string',
            data
        );
    }
};

// deserializes a JSON string to a valid DeviceList object, else returns undefined
export const deserializeDeviceList = (data: string): DeviceList | undefined => {
    try {
        const deviceListData = JSON.parse(data);
        if (deviceListData.hasOwnProperty('devices')) {
            return {
                devices: deviceListData.devices
            };
        }
    } catch (e: any) {
        console.log('Could not deserialize DeviceList from JSON string', data);
    }
};
