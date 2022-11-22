import * as React from 'react';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colours from '../../../../utilities/Colours';
import {
    AlertModal,
    ModalType
} from '../../../components/AlertModal/AlertModal';
import { RoundButton } from '../../../components/AlertModal/RoundButton';
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
        <View>
            <Text>All settings screen</Text>
            <SettingsOption
                onPress={() => {
                    navigation.navigate('AccountInfo');
                }}
                title={'Account Information'}
            />
            <SettingsOption
                onPress={() => {
                    navigation.navigate('MedicalInfo');
                }}
                title={'Medical Information'}
            />
            <Icon name="briefcase-medical" size={30} color={Colours.DARKBLUE} />
            <AlertModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                modalType={ModalType.CancelAlert}
                confirmAction={() => {}}
            />
            <RoundButton text={'Show alert modal'} onPress={onPress} />
        </View>
    );
};
