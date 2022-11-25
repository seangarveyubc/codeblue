import * as React from 'react';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Colours from '../../../../utilities/Colours';
import { CentredContent } from '../../../components/CentredContent';
import InputText from '../../../components/InputText';
import { BackArrow } from '../../../components/utils/BackArrow';
import { CheckBox } from '../../../components/utils/CheckBox';
import { Logo } from '../../../components/utils/Logo';
import { WideButton } from '../../../components/utils/WideButton';

interface Props {
    navigation: any;
}

const windowWidth = Dimensions.get('window').width;
const VERTICAL_SPACE = windowWidth * 0.07;

export const OptionalInfoScreen = ({ navigation }: Props) => {
    const [birthday, setBirthday] = useState('');
    const [userHeight, setUserHeight] = useState('');
    const [userWeight, setUserWeight] = useState('');
    const [userSex, setUserSex] = useState('');
    const [userBloodType, setUserBloodType] = useState('');

    const [hasHeartProblem, setHasHeartProblem] = useState(false);
    const [hasFamilyHeartProblem, setHasFamilyHeartProblem] = useState(false);

    const handleUpdateHeartProblem = () => {
        setHasHeartProblem(!hasHeartProblem);
    };

    const handleUpdateFamilyHeartProblem = () => {
        setHasFamilyHeartProblem(!hasFamilyHeartProblem);
    };

    const navigateToSuccessScreen = () => {
        navigation.navigate('OnboardingSuccess');
    };

    return (
        <View style={styles.screenContainer}>
            <BackArrow label="Back" />
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
                    <InputText
                        placeholder="Sex"
                        text={userSex}
                        onChangeText={setUserSex}
                        width={windowWidth * 0.43}
                    />
                    <InputText
                        placeholder="Blood Type"
                        text={userBloodType}
                        onChangeText={setUserBloodType}
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
                <WideButton text="Join" onPress={navigateToSuccessScreen} />
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
