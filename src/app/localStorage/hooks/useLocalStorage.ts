import DropdownOptions from '../../constants/DropdownOptions';
import { DeviceKeys, PersonalDataKeys } from '../models/LocalStorageKeys';
import {
    isBirthdayValid,
    isBlank,
    isPositiveNum
} from '../../utils/formatValidators';
import { LocalStorage } from '../LocalStorage/LocalStorage';
import { LocalStorageCache } from '../LocalStorageCache/LocalStorageCache';
import { FormError } from '../../utils/FormError';

export const APP_DATA_STORAGE = 'APP_DATA_STORAGE';
export const CARDIAC_STORAGE = 'CARDIAC_STORAGE';
export const BACKGROUND_MODE_STORAGE = 'BACKGROUND_MODE_STORAGE';

const appDataStorage = new LocalStorage(APP_DATA_STORAGE);
export const cardiacStorage = new LocalStorageCache(CARDIAC_STORAGE);
export const backgroundModeStorage = new LocalStorage(BACKGROUND_MODE_STORAGE);

export const useLocalStorage = () => {
    const isLocalStorageEmpty =
        appDataStorage.isEmpty() && cardiacStorage.isEmpty();

    const saveUserBirthday = (birthday: string): undefined | FormError => {
        if (isBlank(birthday) || isBirthdayValid(birthday)) {
            appDataStorage.add(PersonalDataKeys.BIRTHDAY, birthday);
        } else {
            return new FormError(
                PersonalDataKeys.BIRTHDAY,
                'Please enter your birthday in DD/MM/YYYY format'
            );
        }
    };

    const saveUserName = (key: string, name: string) => {
        appDataStorage.add(key, name);
    };

    const saveUserWeightHeight = (
        key: string,
        num: string
    ): undefined | FormError => {
        if (isBlank(num) || isPositiveNum(num)) {
            appDataStorage.add(key, num);
        } else {
            if (key === PersonalDataKeys.HEIGHT) {
                return new FormError(
                    PersonalDataKeys.HEIGHT,
                    'Please enter a positive number for height'
                );
            }
            return new FormError(
                PersonalDataKeys.WEIGHT,
                'Please enter a positive number for weight'
            );
        }
    };

    const saveUserSex = (sex: string) => {
        if (isBlank(sex) || DropdownOptions.Sex.includes(sex)) {
            appDataStorage.add(PersonalDataKeys.SEX, sex);
        }
    };

    const saveUserBloodType = (bloodType: string) => {
        if (
            isBlank(bloodType) ||
            DropdownOptions.BloodTypes.includes(bloodType)
        ) {
            appDataStorage.add(PersonalDataKeys.BLOOD_TYPE, bloodType);
        }
    };

    const saveHeartProblem = (
        key: string,
        heartProblem: boolean | undefined
    ) => {
        if (heartProblem !== undefined) {
            appDataStorage.add(key, heartProblem);
        }
    };

    return {
        isLocalStorageEmpty,
        appDataStorage,
        saveUserBirthday,
        saveUserName,
        saveUserWeightHeight,
        saveUserSex,
        saveUserBloodType,
        saveHeartProblem
    };
};
