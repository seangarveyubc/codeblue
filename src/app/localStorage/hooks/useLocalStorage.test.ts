import { PersonalDataKeys } from '../models/LocalStorageKeys';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
    const mockMMKV = jest.mock('react-native-mmkv', () => ({
        MMKV: jest.fn()
    }));

    const mockLocalStorage = jest.mock(
        '../LocalStorage/LocalStorageImpl',
        () => ({
            isEmpty: jest.fn(() => true),
            add: jest.fn(),
            storage: mockMMKV
        })
    );

    const mockLocalStorageCache = jest.mock(
        '../LocalStorageCache/LocalStorageCacheImpl',
        () => ({
            isEmpty: jest.fn(() => true),
            add: jest.fn(),
            storage: mockMMKV
        })
    );

    jest.mock('./useLocalStorage', () => ({
        cardiacStorage: mockLocalStorageCache,
        backgroundModeStorage: mockLocalStorage,
        useLocalStorage: {
            appDataStorage: mockLocalStorage,
            saveUserBirthday: jest.fn(),
            saveUserName: jest.fn(),
            saveUserWeightHeight: jest.fn(),
            saveUserSex: jest.fn(),
            saveUserBloodType: jest.fn(),
            saveHeartProblem: jest.fn()
        }
    }));

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('isLocalStorageEmpty', () => {
        it('returns the correct value for the isLocalStorageEmpty method', () => {
            const { isLocalStorageEmpty } = useLocalStorage();
            expect(isLocalStorageEmpty).toEqual(true);
        });
    });

    describe('saveUserBirthday', () => {
        it('should call `add` when saving a valid birthday', () => {
            const { appDataStorage, saveUserBirthday } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserBirthday('01/01/2000');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.BIRTHDAY,
                '01/01/2000'
            );
        });

        it('should call `add` when birthday is blank', () => {
            const { appDataStorage, saveUserBirthday } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserBirthday('');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.BIRTHDAY,
                ''
            );
        });

        it('should not call `add` when birthday is invalid', () => {
            const { appDataStorage, saveUserBirthday } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserBirthday('01-01-2000');
            expect(appDataStorage.add).not.toHaveBeenCalled();
        });
    });

    describe('saveUserName', () => {
        it('should call `add` when saving a valid first name', () => {
            const { appDataStorage, saveUserName } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserName(PersonalDataKeys.FIRST_NAME, 'Bob');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.FIRST_NAME,
                'Bob'
            );
        });

        it('should call `add` when saving a valid last name', () => {
            const { appDataStorage, saveUserName } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserName(PersonalDataKeys.LAST_NAME, 'Bob');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.LAST_NAME,
                'Bob'
            );
        });

        it('should call `add` when name is blank', () => {
            const { appDataStorage, saveUserName } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserName(PersonalDataKeys.FIRST_NAME, '');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.FIRST_NAME,
                ''
            );
        });
    });

    describe('saveUserWeightHeight', () => {
        it('should call `add` when saving a valid weight', () => {
            const { appDataStorage, saveUserWeightHeight } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserWeightHeight(PersonalDataKeys.WEIGHT, '123');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.WEIGHT,
                '123'
            );
        });

        it('should call `add` when saving a valid height', () => {
            const { appDataStorage, saveUserWeightHeight } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserWeightHeight(PersonalDataKeys.HEIGHT, '123');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.HEIGHT,
                '123'
            );
        });

        it('should call `add` when weight or height is blank', () => {
            const { appDataStorage, saveUserWeightHeight } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserWeightHeight(PersonalDataKeys.WEIGHT, '');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.WEIGHT,
                ''
            );
        });

        it('should not call `add` when weight or height is invalid', () => {
            const { appDataStorage, saveUserWeightHeight } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserWeightHeight(PersonalDataKeys.WEIGHT, '-1234');
            expect(appDataStorage.add).not.toHaveBeenCalled();
        });
    });

    describe('saveUserSex', () => {
        it('should call `add` when saving a valid sex', () => {
            const { appDataStorage, saveUserSex } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserSex('Male');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.SEX,
                'Male'
            );
        });

        it('should call `add` when sex is blank', () => {
            const { appDataStorage, saveUserSex } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserSex('');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.SEX,
                ''
            );
        });

        it('should not call `add` when sex is invalid', () => {
            const { appDataStorage, saveUserSex } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserSex('Invalid');
            expect(appDataStorage.add).not.toHaveBeenCalled();
        });
    });

    describe('saveUserBloodType', () => {
        it('should call `add` when saving a valid blood type', () => {
            const { appDataStorage, saveUserBloodType } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserBloodType('A');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.BLOOD_TYPE,
                'A'
            );
        });

        it('should call `add` when blood type is blank', () => {
            const { appDataStorage, saveUserBloodType } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserBloodType('');
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.BLOOD_TYPE,
                ''
            );
        });

        it('should not call `add` when blood type is invalid', () => {
            const { appDataStorage, saveUserBloodType } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveUserBloodType('Invalid');
            expect(appDataStorage.add).not.toHaveBeenCalled();
        });
    });

    describe('saveHeartProblem', () => {
        it('should call `add` when a user heart problem selection is made', () => {
            const { appDataStorage, saveHeartProblem } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveHeartProblem(PersonalDataKeys.HAS_HEART_PROBLEM, true);
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.HAS_HEART_PROBLEM,
                true
            );
        });

        it('should call `add` when a user family heart problem selection is made', () => {
            const { appDataStorage, saveHeartProblem } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveHeartProblem(PersonalDataKeys.HAS_FAMILY_HEART_PROBLEM, false);
            expect(appDataStorage.add).toHaveBeenCalledWith(
                PersonalDataKeys.HAS_FAMILY_HEART_PROBLEM,
                false
            );
        });

        it('should not call `add` when heart problem selection is undefined', () => {
            const { appDataStorage, saveHeartProblem } = useLocalStorage();
            jest.spyOn(appDataStorage, 'add');
            saveHeartProblem(PersonalDataKeys.HAS_HEART_PROBLEM, undefined);
            expect(appDataStorage.add).not.toHaveBeenCalled();
        });
    });
});
