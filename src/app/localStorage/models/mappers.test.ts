import { CardiacData } from './CardiacData';
import {
    deserializeMedicationList,
    generateCardiacDataKey,
    serializeMedicationList
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

const mockDateInMillis = 1672473600000;

describe('generateCardiacDataKey', () => {
    it('maps CardiacData to a key', () => {
        const expectedKey = `device-id ${mockDateInMillis}`;
        expect(generateCardiacDataKey(mockCardiacData)).toEqual(expectedKey);
    });
});

describe('MedicationList', () => {
    describe('serializeMedicationList', () => {
        it('serializes MedicationList to a JSON string', () => {
            const expectedString =
                '{"medications":["Atorvastatin","Levothyroxine","Metformin"]}';
            expect(serializeMedicationList(mockMedicationList)).toEqual(
                expectedString
            );
        });
    });

    describe('deserialzieMedicationList', () => {
        it('converts a valid JSON string to a MedicationList object', () => {
            const jsonString =
                '{"medications":["Atorvastatin", "Levothyroxine", "Metformin"]}';
            expect(deserializeMedicationList(jsonString)).toEqual(
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
