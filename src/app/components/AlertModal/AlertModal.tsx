import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colours from '../../assets/constants/Colours';
import { CentredContent } from '../CentredContent/CentredContent';
import { RoundButton } from './RoundButton';
import { CancelButton } from './CancelButton';

export enum ModalType {
    CallAlert,
    CancelAlert,
    ResetAlert
}

const MODAL_TYPE = [
    // CallAlert
    {
        icon: <MaterialIcons name="call" size={100} color={Colours.BLUE} />,
        title: 'Call 911 now',
        description: 'Are you sure you want to call 911?',
        confirmText: 'Yes, call now'
    },
    // CancelAlert
    {
        icon: <MaterialIcons name="call-end" size={100} color={Colours.RED} />,
        title: 'Cancel 911 call',
        description: 'Are you not experiencing cardiac symptoms?',
        confirmText: 'I feel fine, cancel call'
    },
    // ResetAlert
    {
        icon: <Ionicons name="alert-circle" size={100} color={Colours.RED} />,
        title: 'Reset App',
        description:
            'Are you sure you want to clear all data? This action cannot be undone.',
        confirmText: 'Yes, clear data'
    }
];

interface Props {
    modalType: ModalType;
    modalVisible: boolean;
    setModalVisible: any;
    confirmAction: any;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const AlertModal = ({
    modalType,
    modalVisible,
    setModalVisible,
    confirmAction
}: Props) => {
    const onPress = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <CentredContent>
                    <View style={styles.modalView}>
                        <View style={styles.icon}>
                            {MODAL_TYPE[modalType].icon}
                        </View>
                        <Text style={styles.titleText}>
                            {MODAL_TYPE[modalType].title}
                        </Text>
                        <Text style={styles.descriptionText}>
                            {MODAL_TYPE[modalType].description}
                        </Text>
                        <RoundButton
                            text={MODAL_TYPE[modalType].confirmText}
                            onPress={confirmAction}
                        />
                        <CancelButton onPress={onPress} />
                    </View>
                </CentredContent>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalView: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.6,
        margin: 48,
        backgroundColor: Colours.WHITE,
        borderRadius: 16,
        padding: 22,
        alignItems: 'center',
        shadowColor: Colours.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    icon: {
        padding: 24
    },
    titleText: {
        marginBottom: 15,
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontSize: 24
    },
    descriptionText: {
        marginBottom: 15,
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Regular',
        fontWeight: '400',
        fontSize: 16
    }
});
