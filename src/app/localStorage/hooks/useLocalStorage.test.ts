import { useLocalStorage } from './useLocalStorage';

jest.mock('./localstorage', () => ({
    useLocalStorage: jest.fn(() => ({
        isLocalStorageEmpty: jest.fn(() => true),
        appDataStorage: {
            isEmpty: jest.fn(() => true)
        },
        cardiacStorage: {
            isEmpty: jest.fn(() => true)
        }
    }))
}));

describe('useLocalStorage', () => {
    it('returns the correct value for the isLocalStorageEmpty method', () => {
        const { isLocalStorageEmpty } = useLocalStorage();
        expect(isLocalStorageEmpty()).toEqual(true);
    });
});
