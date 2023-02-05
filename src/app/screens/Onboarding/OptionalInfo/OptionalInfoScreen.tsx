import * as React from 'react';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Colours from '../../../constants/Colours';
import { CentredContent } from '../../../components/CentredContent/CentredContent';
import InputText from '../../../components/InputText/InputText';
import { BackArrow } from '../../../components/BackArrow/BackArrow';
import { CheckBox } from '../../../components/CheckBox/CheckBox';
import { Logo } from '../../../components/Logo/Logo';
import { WideButton } from '../../../components/WideButton/WideButton';
import { useLocalStorage } from '../../../localStorage/hooks/useLocalStorage';
import { PersonalDataKeys } from '../../../localStorage/models/LocalStorageKeys';
import { DropdownSelect } from '../../../components/DropdownSelect/DropdownSelect';
import DropdownOptions from '../../../constants/DropdownOptions';

interface Props {
    navigation: any;
}

const windowWidth = Dimensions.get('window').width;
const VERTICAL_SPACE = windowWidth * 0.07;

export const OptionalInfoScreen = ({ navigation }: Props) => {
    const {
        appDataStorage,
        saveUserBirthday,
        saveUserWeightHeight,
        saveUserSex,
        saveUserBloodType,
        saveHeartProblem
    } = useLocalStorage();

    const [birthday, setBirthday] = useState(
        appDataStorage.getString(PersonalDataKeys.BIRTHDAY) ?? ''
    );
    const [userHeight, setUserHeight] = useState(
        appDataStorage.getString(PersonalDataKeys.HEIGHT) ?? ''
    );
    const [userWeight, setUserWeight] = useState(
        appDataStorage.getString(PersonalDataKeys.WEIGHT) ?? ''
    );
    const [userSex, setUserSex] = useState(
        appDataStorage.getString(PersonalDataKeys.SEX) ?? ''
    );
    const [userBloodType, setUserBloodType] = useState(
        appDataStorage.getString(PersonalDataKeys.BLOOD_TYPE) ?? ''
    );

    const [hasHeartProblem, setHasHeartProblem] = useState(
        appDataStorage.getBoolean(PersonalDataKeys.HAS_HEART_PROBLEM)
    );
    const [hasFamilyHeartProblem, setHasFamilyHeartProblem] = useState(
        appDataStorage.getBoolean(PersonalDataKeys.HAS_FAMILY_HEART_PROBLEM)
    );

    const handleUpdateHeartProblem = () => {
        // for a first time user, initial state of checkbox is undefined
        if (hasHeartProblem === undefined) {
            setHasHeartProblem(true);
        }

        setHasHeartProblem(!hasHeartProblem);
    };

    const handleUpdateFamilyHeartProblem = () => {
        // for a first time user, initial state of checkbox is undefined
        if (hasFamilyHeartProblem === undefined) {
            setHasFamilyHeartProblem(true);
        }

        setHasFamilyHeartProblem(!hasFamilyHeartProblem);
    };

    const navigateToSuccessScreen = () => {
        navigation.navigate('OnboardingSuccess');
    };

    const saveAndNavigateToSuccessScreen = () => {
        saveEnteredInfo();
        navigateToSuccessScreen();
    };

    const navigateToRequiredInfoScreen = () => {
        saveEnteredInfo();
        navigation.navigate('RequiredInfo');
    };

    const saveEnteredInfo = () => {
        saveUserBirthday(birthday);
        saveUserWeightHeight(PersonalDataKeys.HEIGHT, userHeight);
        saveUserWeightHeight(PersonalDataKeys.WEIGHT, userWeight);
        saveUserSex(userSex);
        saveUserBloodType(userBloodType);
        saveHeartProblem(PersonalDataKeys.HAS_HEART_PROBLEM, hasHeartProblem);
        saveHeartProblem(
            PersonalDataKeys.HAS_FAMILY_HEART_PROBLEM,
            hasFamilyHeartProblem
        );
    };

    return (
        <View style={styles.screenContainer}>
            <BackArrow label="Back" onPress={navigateToRequiredInfoScreen} />
            <View style={styles.titleContainer}>
                <Logo width={50} height={50} />
                <Text style={styles.titleText}>Join CodeBlue</Text>
            </View>
            <Text style={styles.subtitleText}>
                Please enter any additional information (Optional)
            </Text>
            <CentredContent>
                <InputText
                    placeholder="Birthday (DD/MM/YYYY)"
                    text={birthday}
                    onChangeText={setBirthday}
                    width={windowWidth * 0.9}
                />
                <View style={styles.inputTextRow}>
                    <InputText
                        placeholder="Height (cm)"
                        text={userHeight}
                        onChangeText={setUserHeight}
                        width={windowWidth * 0.43}
                        keyboardType="numeric"
                    />
                    <InputText
                        placeholder="Weight (kg)"
                        text={userWeight}
                        onChangeText={setUserWeight}
                        width={windowWidth * 0.43}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputTextRow}>
                    <DropdownSelect
                        type="Blood Type"
                        data={DropdownOptions.BloodTypes}
                        selectedValue={userBloodType}
                        onValueChange={setUserBloodType}
                        width={windowWidth * 0.43}
                    />
                    <DropdownSelect
                        type="Sex"
                        data={DropdownOptions.Sex}
                        selectedValue={userSex}
                        onValueChange={setUserSex}
                        width={windowWidth * 0.43}
                    />
                </View>
            </CentredContent>
            <View style={styles.checkBoxRow}>
                <CheckBox
                    value={hasHeartProblem}
                    onValueChange={handleUpdateHeartProblem}
                />
                <Text style={styles.heartProblemsText}>
                    Personal history of heart problems?
                </Text>
            </View>
            <View style={styles.checkBoxRow}>
                <CheckBox
                    value={hasFamilyHeartProblem}
                    onValueChange={handleUpdateFamilyHeartProblem}
                />
                <Text style={styles.heartProblemsText}>
                    Family history of heart problems?
                </Text>
            </View>
            <CentredContent marginTop={VERTICAL_SPACE}>
                <WideButton
                    text="Join"
                    onPress={saveAndNavigateToSuccessScreen}
                />
                <Text style={styles.skipText} onPress={navigateToSuccessScreen}>
                    Skip
                </Text>
            </CentredContent>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        paddingHorizontal: windowWidth * 0.05,
        paddingVertical: VERTICAL_SPACE,
        alignItems: 'flex-start',
        height: '100%',
        backgroundColor: Colours.WHITE
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: VERTICAL_SPACE
    },
    titleText: {
        fontFamily: 'DMSans-Bold',
        fontSize: 24,
        color: Colours.BLUE,
        marginLeft: 12
    },
    subtitleText: {
        fontFamily: 'DMSans-Regular',
        fontSize: 16,
        color: Colours.BLACK,
        marginBottom: VERTICAL_SPACE
    },
    inputTextRow: {
        flexDirection: 'row',
        width: windowWidth * 0.9,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    checkBoxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12
    },
    heartProblemsText: {
        fontFamily: 'DMSans-Regular',
        fontSize: 16,
        color: Colours.BLUE,
        marginLeft: 8
    },
    skipText: {
        fontFamily: 'DMSans-Bold',
        fontSize: 18,
        color: Colours.BLUE,
        marginTop: 20
    }
});
