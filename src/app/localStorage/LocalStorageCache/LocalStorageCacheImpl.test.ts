import { MMKV } from 'react-native-mmkv';
import { CardiacData, toKey } from '../models/CardiacData';
import { LocalStorageCacheImpl } from './LocalStorageCacheImpl';

const mockCardiacData: CardiacData = {
    frequency: 10,
    deviceId: 'device-id',
    timestamp: new Date(2023, 0, 0, 0, 0, 0, 0),
    expiration: new Date(2023, 0, 0, 0, 0, 0, 0)
};

const mockDateInMillis = 1672473600000;

jest.mock('react-native-mmkv', () => ({
    MMKV: jest.fn()
}));

describe('LocalStorageCacheImpl', () => {
    let cache: LocalStorageCacheImpl;
    let mmkv: jest.Mocked<MMKV>;

    beforeEach(() => {
        const mmkvOriginal = jest.requireMock('react-native-mmkv');
        mmkv = {
            ...mmkvOriginal,
            set: jest.fn(),
            getString: jest.fn(),
            getNumber: jest.fn(),
            getBoolean: jest.fn(),
            contains: jest.fn(),
            delete: jest.fn(),
            clearAll: jest.fn(),
            getAllKeys: jest.fn()
        };
        (MMKV as jest.Mock).mockImplementation(() => mmkv);
        cache = new LocalStorageCacheImpl('test-id');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addCardiacData', () => {
        it('adds a CardiacData object to the cache', () => {
            cache.addCardiacData('key', mockCardiacData);
            expect(mmkv.set).toHaveBeenCalledWith(
                'key',
                JSON.stringify(mockCardiacData)
            );
        });
    });

    describe('getAllCardiacData', () => {
        it('returns all data in the cache', () => {
            mmkv.getAllKeys.mockReturnValue(['key1', 'key2']);
            mmkv.getString.mockReturnValue(JSON.stringify(mockCardiacData));

            const cardiacData = cache.getAllCardiacData();
            expect(mmkv.getAllKeys).toHaveBeenCalled();
            expect(mmkv.getString).toHaveBeenCalledWith('key1');
            expect(mmkv.getString).toHaveBeenCalledWith('key2');
            expect(cardiacData).toEqual([mockCardiacData, mockCardiacData]);
        });
    });

    describe('refresh', () => {
        it('does not delete any data less than 24 hours old', () => {
            mmkv.getAllKeys.mockReturnValue(['key1 expires', 'key2 expires']);
            Date.now = jest.fn().mockReturnValue(1500000000000);
            cache.refresh();
            expect(mmkv.delete).toHaveBeenCalledWith(
                'key1 expires 1500000000000'
            );
            expect(mmkv.delete).toHaveBeenCalledWith(
                'key2 expires 1500000000000'
            );
        });

        it('deletes expired entries', () => {
            mmkv.getAllKeys.mockReturnValue(['key1 expires', 'key2 expires']);
            Date.now = jest.fn().mockReturnValue(1500000000000);
            cache.refresh();
            expect(mmkv.delete).toHaveBeenCalledWith(
                'key1 expires 1500000000000'
            );
            expect(mmkv.delete).toHaveBeenCalledWith(
                'key2 expires 1500000000000'
            );
        });
    });

    describe('toKey', () => {
        it('maps CardiacData to a key', () => {
            const expectedKey = `device-id ${mockDateInMillis}`;
            expect(toKey(mockCardiacData)).toEqual(expectedKey);
        });
    });
});
