import { CardiacData } from './CardiacData';
import { MedicationData } from './MedicationData';

export const generateCardiacDataKey = (data: CardiacData): string => {
    return data.deviceId + ' ' + data.expiration.getTime();
};

export const serializeMedicationData = (data: MedicationData): string => {
    return JSON.stringify(data);
};

export const deserializeMedicationData = (
    data: string
): MedicationData | undefined => {
    const medData = JSON.parse(data);
    if (medData.hasOwnProperty('medications')) {
        return {
            medications: medData.medications
        };
    }

    console.error(
        'Could not deserialize MedicationData from JSON string',
        data
    );
};
