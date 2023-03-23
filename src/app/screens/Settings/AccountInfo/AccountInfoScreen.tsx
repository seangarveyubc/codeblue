import * as React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colours from '../../../constants/Colours';
import { SettingsScreenHeader } from '../../../components/SettingsScreenHeader/SettingsScreenHeader';
import { UserAccountInfo } from '../../../components/UserAccountInfo/UserAccountInfo';
import { useLocalStorage } from '../../../localStorage/hooks/useLocalStorage';
import { PersonalDataKeys } from '../../../localStorage/models/LocalStorageKeys';
import { normalize } from '../../../utils/normalizer/normalizer';

interface Props {
    navigation: any;
}

export const AccountInfoScreen = ({ navigation }: Props) => {
    const {
        appDataStorage,
        saveUserName,
        saveUserBirthday,
        saveUserWeightHeight,
        saveUserSex,
        saveUserBloodType
    } = useLocalStorage();

    const [edit, setEdit] = React.useState(false);
    const [firstName, setFirstName] = React.useState(
        appDataStorage.getString(PersonalDataKeys.FIRST_NAME) ?? ''
    );
    const [lastName, setLastName] = React.useState(
        appDataStorage.getString(PersonalDataKeys.LAST_NAME) ?? ''
    );
    const [birthday, setBirthday] = React.useState(
        appDataStorage.getString(PersonalDataKeys.BIRTHDAY) ?? ''
    );
    const [height, setHeight] = React.useState(
        appDataStorage.getString(PersonalDataKeys.HEIGHT) ?? ''
    );
    const [weight, setWeight] = React.useState(
        appDataStorage.getString(PersonalDataKeys.WEIGHT) ?? ''
    );
    const [bloodType, setBloodType] = React.useState(
        appDataStorage.getString(PersonalDataKeys.BLOOD_TYPE) ?? ''
    );
    const [sex, setSex] = React.useState(
        appDataStorage.getString(PersonalDataKeys.SEX) ?? ''
    );

    const updateViewOption = () => {
        if (edit) {
            // save any updates
            saveUserName(PersonalDataKeys.FIRST_NAME, firstName);
            saveUserName(PersonalDataKeys.LAST_NAME, lastName);
            const birthdayResult = saveUserBirthday(birthday);
            const heightResult = saveUserWeightHeight(
                PersonalDataKeys.HEIGHT,
                height
            );
            const weightResult = saveUserWeightHeight(
                PersonalDataKeys.WEIGHT,
                weight
            );
            saveUserBloodType(bloodType);
            saveUserSex(sex);

            const errors = [birthdayResult, heightResult, weightResult]
                .filter((item) => item !== undefined)
                .map((item) => item?.message);

            if (errors.length > 0) {
                const errorMessage = errors
                    .map((err) => '-  ' + err)
                    .join('\n');
                Alert.alert('Please fix form errors', errorMessage);
            } else {
                setEdit(!edit);
            }
        } else {
            setEdit(!edit);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <SettingsScreenHeader
                navigation={navigation}
                title="Account Information"
            />
            <View style={styles.subHeading}>
                <Text style={styles.subHeadingText}>{'Basic Information'}</Text>
                <Text style={styles.edit} onPress={updateViewOption}>
                    {edit ? 'Save' : 'Edit'}
                </Text>
            </View>

            <UserAccountInfo
                edit={edit}
                firstName={firstName}
                lastName={lastName}
                birthday={birthday}
                height={height}
                weight={weight}
                bloodType={bloodType}
                sex={sex}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setBirthday={setBirthday}
                setHeight={setHeight}
                setWeight={setWeight}
                setBloodType={setBloodType}
                setSex={setSex}
            />
        </ScrollView>
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
