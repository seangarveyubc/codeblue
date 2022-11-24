import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colours from '../../../../utilities/Colours';
import {
    AlertModal,
    ModalType
} from '../../../components/AlertModal/AlertModal';
import { RoundButton } from '../../../components/AlertModal/RoundButton';
import { SettingsOptionHeading } from '../../../components/SettingsOptionHeading';
import { SettingsOption } from './SettingsOption';

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
                title={'Account Information'}
                iconName={'user'}
            />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('MedicalInfo');
                }}
                title={'Medical Information'}
                iconName={'briefcase-medical'}
            />

            <SettingsOptionHeading title={'Help'} />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('Tutorial');
                }}
                title={'CodeBlue Tutorial Video'}
                iconName={'play'}
            />

            <SettingsOptionHeading title={''} />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('Legal');
                }}
                title={'Legal'}
                iconName={''}
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
