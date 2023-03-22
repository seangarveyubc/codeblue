import * as React from 'react';
import { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Colours from '../../../constants/Colours';
import { CentredContent } from '../../../components/CentredContent/CentredContent';
import InputText from '../../../components/InputText/InputText';
import { Logo } from '../../../components/Logo/Logo';
import { WideButton } from '../../../components/WideButton/WideButton';
import { useLocalStorage } from '../../../localStorage/hooks/useLocalStorage';
import { PersonalDataKeys } from '../../../localStorage/models/LocalStorageKeys';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/constants';
import { normalize } from '../../../utils/normalizer/normalizer';

interface Props {
    navigation: any;
}

export const RequiredInfoScreen = ({ navigation }: Props) => {
    const { appDataStorage, saveUserName } = useLocalStorage();

    const [firstName, setFirstName] = useState(
        appDataStorage.getString(PersonalDataKeys.FIRST_NAME) ?? ''
    );
    const [lastName, setLastName] = useState(
        appDataStorage.getString(PersonalDataKeys.LAST_NAME) ?? ''
    );

    const handleNavigate = () => {
        saveEnteredInfo();
        navigation.navigate('OptionalInfo');
    };

    const saveEnteredInfo = () => {
        saveUserName(PersonalDataKeys.FIRST_NAME, firstName);
        saveUserName(PersonalDataKeys.LAST_NAME, lastName);
    };

    return (
        <View style={styles.screenContainer}>
            <CentredContent>
                <View style={styles.logoGroup}>
                    <Logo
                        width={SCREEN_WIDTH * 0.3}
                        height={SCREEN_WIDTH * 0.3}
                    />
                    <Text style={styles.titleText}>Let's get started</Text>
                </View>
                <KeyboardAvoidingView
                    behavior="position"
                    style={styles.inputTextGroup}
                >
                    <InputText
                        placeholder="First Name"
                        text={firstName}
                        onChangeText={setFirstName}
                        width={SCREEN_WIDTH * 0.9}
                    />
                    <InputText
                        placeholder="Last Name"
                        text={lastName}
                        onChangeText={setLastName}
                        width={SCREEN_WIDTH * 0.9}
                    />
                </KeyboardAvoidingView>
                <WideButton text="Next" onPress={handleNavigate} />
            </CentredContent>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: Colours.WHITE,
        height: '100%',
        justifyContent: 'center'
    },
    logoGroup: {
        alignItems: 'center'
    },
    titleText: {
        fontFamily: 'DMSans-Bold',
        fontSize: normalize(24),
        color: Colours.BLUE,
        marginTop: normalize(8)
    },
    inputTextGroup: {
        marginTop: SCREEN_HEIGHT * 0.05,
        marginBottom: SCREEN_HEIGHT * 0.1
    }
});
