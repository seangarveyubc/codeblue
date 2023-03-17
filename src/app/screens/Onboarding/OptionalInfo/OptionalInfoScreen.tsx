import * as React from 'react';
import { useState } from 'react';
import {
    Alert,
    Dimensions,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
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
import {
    AlertModal,
    ModalType
} from '../../../components/AlertModal/AlertModal';
import DeviceInfo from 'react-native-device-info';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

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

    const [permissionModalVisible, setPermissionModalVisible] =
        React.useState(false);

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
        const didSave = saveEnteredInfo();
        if (didSave) {
            showPermissionModal();
        }
    };

    const navigateToRequiredInfoScreen = () => {
        navigation.navigate('RequiredInfo');
    };

    const saveEnteredInfo = (): boolean => {
        const birthdayResult = saveUserBirthday(birthday);
        const heightResult = saveUserWeightHeight(
            PersonalDataKeys.HEIGHT,
            userHeight
        );
        const weightResult = saveUserWeightHeight(
            PersonalDataKeys.WEIGHT,
            userWeight
        );
        saveUserSex(userSex);
        saveUserBloodType(userBloodType);
        saveHeartProblem(PersonalDataKeys.HAS_HEART_PROBLEM, hasHeartProblem);
        saveHeartProblem(
            PersonalDataKeys.HAS_FAMILY_HEART_PROBLEM,
            hasFamilyHeartProblem
        );

        const errors = [birthdayResult, heightResult, weightResult]
            .filter((item) => item !== undefined)
            .map((item) => item?.message);

        if (errors.length > 0) {
            const errorMessage = errors.map((err) => '-  ' + err).join('\n');
            Alert.alert('Please fix form errors', errorMessage);
            return false;
        }

        return true;
    };

    const showPermissionModal = () => {
        setPermissionModalVisible(true);
    };

    type VoidCallback = (result: boolean) => void;

    const requestPermissions = async (cb: VoidCallback) => {
        if (Platform.OS === 'android') {
            const apiLevel = await DeviceInfo.getApiLevel();

            if (apiLevel < 31) {
                PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.CALL_PHONE
                ]).then((result) => {
                    if (
                        result['android.permission.ACCESS_FINE_LOCATION'] &&
                        result['android.permission.CALL_PHONE'] === 'granted'
                    ) {
                        cb(true);
                    } else {
                        cb(false);
                    }
                });
            } else {
                const result = await requestMultiple([
                    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                    PERMISSIONS.ANDROID.CALL_PHONE
                ]);

                const isGranted =
                    result['android.permission.BLUETOOTH_CONNECT'] ===
                        PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.BLUETOOTH_SCAN'] ===
                        PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.ACCESS_FINE_LOCATION'] ===
                        PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.CALL_PHONE'] ===
                        PermissionsAndroid.RESULTS.GRANTED;

                cb(isGranted);
            }
        } else {
            cb(true);
        }
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
                <Text style={styles.skipText} onPress={showPermissionModal}>
                    Skip
                </Text>
            </CentredContent>
            {/* Call alert modal */}
            <AlertModal
                modalVisible={permissionModalVisible}
                setModalVisible={setPermissionModalVisible}
                modalType={ModalType.PermissionAlert}
                confirmAction={() => {
                    requestPermissions((isGranted) => {
                        console.log('Entereed da bussy');
                        if (isGranted) {
                            navigateToSuccessScreen();
                        } else {
                            console.log('ERROR YOU IDIOT');
                        }
                    });
                    setPermissionModalVisible(false);
                }}
            />
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
