import DropdownOptions from '../../constants/DropdownOptions';
import { PersonalDataKeys } from '../models/LocalStorageKeys';
import {
    isBirthdayValid,
    isBlank,
    isPositiveNum
} from '../../utils/formatValidators';
import { LocalStorage } from '../LocalStorage/LocalStorage';
import { LocalStorageCache } from '../LocalStorageCache/LocalStorageCache';

export const APP_DATA_STORAGE = 'APP_DATA_STORAGE';
export const CARDIAC_STORAGE = 'CARDIAC_STORAGE';

const appDataStorage = new LocalStorage(APP_DATA_STORAGE);
const cardiacStorage = new LocalStorageCache(CARDIAC_STORAGE);

export const useLocalStorage = () => {
    const isLocalStorageEmpty =
        appDataStorage.isEmpty() && cardiacStorage.isEmpty();

    const saveUserBirthday = (birthday: string) => {
        if (isBlank(birthday) || isBirthdayValid(birthday)) {
            appDataStorage.add(PersonalDataKeys.BIRTHDAY, birthday);
        }
    };

    const saveUserName = (key: string, name: string) => {
        appDataStorage.add(key, name);
    };

    const saveUserWeightHeight = (key: string, num: string) => {
        if (isBlank(num) || isPositiveNum(num)) {
            appDataStorage.add(key, num);
        }
    };

    const saveUserSex = (sex: string) => {
        if (isBlank(sex) || DDOptions.Sex.includes(sex)) {
            appDataStorage.add(PersonalDataKeys.SEX, sex);
        }
    };

    const saveUserBloodType = (bloodType: string) => {
        if (isBlank(bloodType) || DDOptions.BloodTypes.includes(bloodType)) {
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
        cardiacStorage,
        saveUserBirthday,
        saveUserName,
        saveUserWeightHeight,
        saveUserSex,
        saveUserBloodType,
        saveHeartProblem
    };
};
