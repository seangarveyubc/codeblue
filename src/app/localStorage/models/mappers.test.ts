import { CardiacData } from './CardiacData';
import {
    deserializeMedicationData,
    generateCardiacDataKey,
    serializeMedicationData
} from './mappers';
import { MedicationData } from './MedicationData';

const mockCardiacData: CardiacData = {
    frequency: 10,
    deviceId: 'device-id',
    timestamp: new Date(2023, 0, 0, 0, 0, 0, 0),
    expiration: new Date(2023, 0, 0, 0, 0, 0, 0)
};

const mockMedicationData: MedicationData = {
    medications: ['Atorvastatin', 'Levothyroxine', 'Metformin']
};

const mockDateInMillis = 1672473600000;

describe('generateCardiacDataKey', () => {
    it('maps CardiacData to a key', () => {
        const expectedKey = `device-id ${mockDateInMillis}`;
        expect(generateCardiacDataKey(mockCardiacData)).toEqual(expectedKey);
    });
});

describe('MedicationData', () => {
    describe('serializeMedicationData', () => {
        it('serializes MedicationData to a JSON string', () => {
            const expectedString =
                '{"medications":["Atorvastatin","Levothyroxine","Metformin"]}';
            expect(serializeMedicationData(mockMedicationData)).toEqual(
                expectedString
            );
        });
    });

    describe('deserialzieMedicationData', () => {
        it('converts a valid JSON string to a MedicationData object', () => {
            const jsonString =
                '{"medications":["Atorvastatin", "Levothyroxine", "Metformin"]}';
            expect(deserializeMedicationData(jsonString)).toEqual(
                mockMedicationData
            );
        });

        it('returns undefined if given an invalid JSON string', () => {
            const jsonString =
                '{"invalid":["Atorvastatin", "Levothyroxine", "Metformin"]}';
            expect(deserializeMedicationData(jsonString)).toBeUndefined();
        });
    });
});
