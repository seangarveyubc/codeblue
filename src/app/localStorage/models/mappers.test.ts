import { CardiacData } from './CardiacData';
import { DeviceList } from './DeviceList';
import {
    deserializeDeviceList,
    deserializeMedicationList,
    generateCardiacDataKey,
    serializeLocalStorageObject
} from './mappers';
import { MedicationList } from './MedicationList';

const mockCardiacData: CardiacData = {
    frequency: 10,
    deviceId: 'device-id',
    timestamp: new Date(2023, 0, 0, 0, 0, 0, 0),
    expiration: new Date(2023, 0, 0, 0, 0, 0, 0)
};

const mockMedicationList: MedicationList = {
    medications: ['Atorvastatin', 'Levothyroxine', 'Metformin']
};

const mockDeviceList: DeviceList = {
    devices: [
        { name: 'PPG1', location: 'Right hand' },
        { name: 'PPG2', location: 'Left hand' }
    ]
};

const mockDateInMillis = 1672473600000;
const mockMedicationListString =
    '{"medications":["Atorvastatin","Levothyroxine","Metformin"]}';
const mockDeviceListString =
    '{"devices":[{"name":"PPG1","location":"Right hand"},{"name":"PPG2","location":"Left hand"}]}';

describe('generateCardiacDataKey', () => {
    it('maps CardiacData to a key', () => {
        const expectedKey = `device-id ${mockDateInMillis}`;
        expect(generateCardiacDataKey(mockCardiacData)).toEqual(expectedKey);
    });
});

describe('MedicationList', () => {
    describe('deserializeMedicationList', () => {
        it('converts a valid JSON string to a MedicationList object', () => {
            expect(deserializeMedicationList(mockMedicationListString)).toEqual(
                mockMedicationList
            );
        });

        it('returns undefined if given an invalid JSON string', () => {
            const jsonString =
                '{"invalid":["Atorvastatin", "Levothyroxine", "Metformin"]}';
            expect(deserializeMedicationList(jsonString)).toBeUndefined();
        });
    });
});

describe('serializeLocalStorageObject', () => {
    it('serializes MedicationList to a JSON string', () => {
        expect(serializeLocalStorageObject(mockMedicationList)).toEqual(
            mockMedicationListString
        );
    });

    it('serializes DeviceList to a JSON string', () => {
        expect(serializeLocalStorageObject(mockDeviceList)).toEqual(
            mockDeviceListString
        );
    });
});

describe('DeviceList', () => {
    describe('deserializeDeviceList', () => {
        it('converts a valid JSON string to a DeviceList object', () => {
            expect(deserializeDeviceList(mockDeviceListString)).toEqual(
                mockDeviceList
            );
        });

        it('returns undefined if given an invalid JSON string', () => {
            const jsonString =
                '{"invalid":["Atorvastatin", "Levothyroxine", "Metformin"]}';
            expect(deserializeMedicationList(jsonString)).toBeUndefined();
        });
    });
});
