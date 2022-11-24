import * as React from 'react';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Colours from '../../../../utilities/Colours';
import { CentredContent } from '../../../components/CentredContent';
import InputText from '../../../components/InputText';
import { Logo } from '../../../components/utils/Logo';
import { WideButton } from '../../../components/utils/WideButton';

interface Props {
    navigation: any;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const RequiredInfoScreen = ({ navigation }: Props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleNavigate = () => {
        navigation.navigate('OptionalInfo');
    };

    return (
        <View style={styles.screenContainer}>
            <CentredContent>
                <View style={styles.logoGroup}>
                    <Logo
                        width={windowWidth * 0.3}
                        height={windowWidth * 0.3}
                    />
                    <Text style={styles.titleText}>Let's get started</Text>
                </View>
                <View style={styles.inputTextGroup}>
                    <InputText
                        placeholder="First Name"
                        text={firstName}
                        onChangeText={setFirstName}
                        width={windowWidth * 0.9}
                    />
                    <InputText
                        placeholder="Last Name"
                        text={lastName}
                        onChangeText={setLastName}
                        width={windowWidth * 0.9}
                    />
                </View>
                <WideButton text="Next" onPress={handleNavigate} />
            </CentredContent>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: Colours.WHITE,
        height: '100%'
    },
    logoGroup: {
        marginTop: windowHeight * 0.2,
        alignItems: 'center'
    },
    titleText: {
        fontFamily: 'DMSans-Bold',
        fontSize: 24,
        color: Colours.BLUE,
        marginTop: 8
    },
    inputTextGroup: {
        marginTop: windowHeight * 0.05,
        marginBottom: windowHeight * 0.1
    }
});
