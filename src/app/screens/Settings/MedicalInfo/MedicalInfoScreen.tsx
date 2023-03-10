import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../../../constants/Colours';
import { SettingsScreenHeader } from '../../../components/SettingsScreenHeader/SettingsScreenHeader';
import { UserMedicalInfo } from '../../../components/UserMedicalInfo/UserMedicalInfo';
import { useLocalStorage } from '../../../localStorage/hooks/useLocalStorage';
import { PersonalDataKeys } from '../../../localStorage/models/LocalStorageKeys';
import { HeartProblemOptions } from '../../../constants/HeartProblemOptions';
import { normalize } from '../../../normalizer/normalizer';

interface Props {
    navigation: any;
}

const heartProblemToString = (hasProblem: boolean | undefined): string => {
    switch (hasProblem) {
        case true:
            return HeartProblemOptions.YES;
        case false:
            return HeartProblemOptions.NO;
        default:
            return HeartProblemOptions.NOT_PROVIDED;
    }
};

const stringToHeartProblem = (hasProblem: string): boolean | undefined => {
    switch (hasProblem) {
        case HeartProblemOptions.YES:
            return true;
        case HeartProblemOptions.NO:
            return false;
        default:
            return undefined;
    }
};

export const MedicalInfoScreen = ({ navigation }: Props) => {
    const { appDataStorage, saveHeartProblem } = useLocalStorage();

    const [edit, setEdit] = React.useState(false);
    const [personalHistory, setPersonalHistory] = React.useState(
        heartProblemToString(
            appDataStorage.getBoolean(PersonalDataKeys.HAS_HEART_PROBLEM)
        )
    );
    const [familyHistory, setFamilyHistory] = React.useState(
        heartProblemToString(
            appDataStorage.getBoolean(PersonalDataKeys.HAS_FAMILY_HEART_PROBLEM)
        )
    );

    const updateViewOption = () => {
        if (edit) {
            // delete previous selection if user does not provide info
            if (personalHistory === HeartProblemOptions.NOT_PROVIDED) {
                appDataStorage.delete(PersonalDataKeys.HAS_HEART_PROBLEM);
            } else {
                // else update the information
                saveHeartProblem(
                    PersonalDataKeys.HAS_HEART_PROBLEM,
                    stringToHeartProblem(personalHistory)
                );
            }

            if (familyHistory === HeartProblemOptions.NOT_PROVIDED) {
                appDataStorage.delete(
                    PersonalDataKeys.HAS_FAMILY_HEART_PROBLEM
                );
            } else {
                saveHeartProblem(
                    PersonalDataKeys.HAS_FAMILY_HEART_PROBLEM,
                    stringToHeartProblem(familyHistory)
                );
            }
        }
        setEdit(!edit);
    };

    return (
        <View style={styles.container}>
            <SettingsScreenHeader
                navigation={navigation}
                title="Medical Information"
            />
            <View style={styles.subHeading}>
                <Text style={styles.subHeadingText}>{'Medical History'}</Text>
                <Text style={styles.edit} onPress={updateViewOption}>
                    {edit ? 'Save' : 'Edit'}
                </Text>
            </View>

            <UserMedicalInfo
                edit={edit}
                personalHistory={personalHistory}
                familyHistory={familyHistory}
                setPersonalHistory={setPersonalHistory}
                setFamilyHistory={setFamilyHistory}
            />

            <View style={styles.subHeading}>
                <Text style={styles.subHeadingText}>{'Medication'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: '100%', backgroundColor: Colours.WHITE },
    title: {
        fontSize: normalize(28),
        fontFamily: 'DMSans-Bold',
        alignSelf: 'center',
        color: Colours.WHITE
    },
    subHeading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5%',
        marginHorizontal: '3%'
    },
    subHeadingText: {
        fontSize: normalize(20),
        fontFamily: 'DMSans-Bold',
        color: Colours.BLACK
    },
    edit: {
        fontSize: normalize(20),
        fontFamily: 'DMSans-Bold',
        color: Colours.BLUE
    }
});
