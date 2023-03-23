import { MMKV } from 'react-native-mmkv';
import { LocalStorageImpl } from './LocalStorageImpl';

jest.mock('react-native-mmkv', () => ({
    MMKV: jest.fn()
}));

describe('LocalStorageImpl', () => {
    let storage: LocalStorageImpl;
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
        storage = new LocalStorageImpl('test-id');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('isEmpty', () => {
        it('should be true if the MMKV instance has no entries', () => {
            mmkv.getAllKeys.mockReturnValue([]);
            expect(storage.isEmpty()).toBeTruthy();
            expect(mmkv.getAllKeys()).toHaveLength(0);
        });

        it('should be false if the MMKV instance has at least one key-value pair', () => {
            const key = 'key';
            const value = 'value';
            storage.add(key, value);
            mmkv.getAllKeys.mockReturnValue([key]);
            expect(storage.isEmpty()).toBeFalsy();
            expect(mmkv.getAllKeys()).toHaveLength(1);
        });
    });

    describe('add', () => {
        it('should call set on the MMKV instance with the correct key and value', () => {
            const key = 'key';
            const value = 'value';
            storage.add(key, value);
            expect(mmkv.set).toHaveBeenCalledWith(key, value);
        });
    });

    describe('addDevice', () => {
        it('todo');
    });

    describe('addDeviceList', () => {
        it('todo');
    });

    describe('getString', () => {
        it('should call getString on the MMKV instance with the correct key and return the value', () => {
            const key = 'key';
            const value = 'value';
            mmkv.getString.mockReturnValue(value);
            expect(storage.getString(key)).toEqual(value);
            expect(mmkv.getString).toHaveBeenCalledWith(key);
        });
    });

    describe('getNumber', () => {
        it('should call getNumber on the MMKV instance with the correct key and return the value', () => {
            const key = 'key';
            const value = 123;
            mmkv.getNumber.mockReturnValue(value);
            expect(storage.getNumber(key)).toEqual(value);
            expect(mmkv.getNumber).toHaveBeenCalledWith(key);
        });
    });

    describe('getBoolean', () => {
        it('should call getBoolean on the MMKV instance with the correct key and return the value', () => {
            const key = 'key';
            const value = true;
            mmkv.getBoolean.mockReturnValue(value);
            expect(storage.getBoolean(key)).toEqual(value);
            expect(mmkv.getBoolean).toHaveBeenCalledWith(key);
        });
    });

    describe('getDeviceList', () => {
        it('todo');
    });

    describe('deleteDevice', () => {
        it('todo');
    });

    describe('delete', () => {
        it('should call delete on the MMKV instance with the correct key if the key exists', () => {
            const key = 'key';
            mmkv.contains.mockReturnValue(true);
            storage.delete(key);
            expect(mmkv.delete).toHaveBeenCalledWith(key);
        });
    });

    describe('clearStorage', () => {
        it('should call clearAll on the MMKV instance and delete everything', () => {
            const key = 'key';
            const value = 'value';
            mmkv.getString.mockReturnValue(value);
            expect(storage.getString(key)).toEqual(value);

            storage.clearStorage();
            expect(mmkv.clearAll).toHaveBeenCalled();

            mmkv.getAllKeys.mockReturnValue([]);
            expect(storage.isEmpty()).toBeTruthy();
        });
    });
});
