import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colours from '../../../constants/Colours';
import {
    AlertModal,
    ModalType
} from '../../../components/AlertModal/AlertModal';
import { SettingsOptionHeading } from '../../../components/SettingsOptionHeading/SettingsOptionHeading';
import { HeaderSwirl } from '../../../components/HeaderSwirl/HeaderSwirl';

import {
    OptionType,
    SettingsOption
} from '../../../components/SettingsOption/SettingsOption';
import { useLocalStorage } from '../../../localStorage/hooks/useLocalStorage';
import { normalize } from '../../../normalizer/normalizer';

interface Props {
    navigation: any;
}

export const AllSettingsScreen = ({ navigation }: Props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const { appDataStorage } = useLocalStorage();

    const onPressResetApp = () => {
        setModalVisible(true);
    };

    const deleteAllAppData = () => {
        appDataStorage.clearStorage();
        // cardiacStorage.clearStorage();
        navigation.navigate('SplashScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderSwirl title={'Settings'} />
            </View>
            <SettingsOptionHeading title={'My Account'} />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('AccountInfo');
                }}
                optionType={OptionType.AccountInfo}
            />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('MedicalInfo');
                }}
                optionType={OptionType.MedicalInfo}
            />
            <SettingsOptionHeading title={'Help'} />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('Tutorial');
                }}
                optionType={OptionType.Tutorial}
            />
            <SettingsOptionHeading title={''} />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('Legal');
                }}
                optionType={OptionType.Legal}
            />
            <AlertModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                modalType={ModalType.ResetAlert}
                confirmAction={deleteAllAppData}
            />
            <Text style={styles.resetText} onPress={onPressResetApp}>
                {'Reset App'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colours.WHITE
    },
    header: { marginBottom: normalize(20) },
    resetText: {
        margin: normalize(20),
        fontSize: normalize(20),
        color: Colours.RED,
        alignSelf: 'center',
        fontFamily: 'DMSans-Bold'
    }
});
