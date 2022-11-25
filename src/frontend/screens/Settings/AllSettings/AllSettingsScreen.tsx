import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../../../../utilities/Colours';
import {
    AlertModal,
    ModalType
} from '../../../components/AlertModal/AlertModal';
import { SettingsOptionHeading } from '../../../components/SettingsOptionHeading';

import { OptionType, SettingsOption } from './SettingsOption';

interface Props {
    navigation: any;
}

export const AllSettingsScreen = ({ navigation }: Props) => {
    const [modalVisible, setModalVisible] = React.useState(false);

    const onPress = () => {
        setModalVisible(true);
    };
    return (
        <View style={styles.container}>
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
                confirmAction={() => {}}
            />
            <Text style={styles.resetText} onPress={onPress}>
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
    resetText: {
        margin: 20,
        fontSize: 20,
        color: Colours.RED,
        alignSelf: 'center',
        fontFamily: 'DMSans-Bold'
    }
});
