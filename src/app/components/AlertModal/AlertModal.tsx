import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colours from '../../constants/Colours';
import { CentredContent } from '../CentredContent/CentredContent';
import { RoundButton } from '../RoundButton/RoundButton';
import { CancelButton } from '../CancelButton/CancelButton';
import { normalize } from '../../utils/normalizer/normalizer';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/constants';

export enum ModalType {
    CallAlert,
    CancelAlert,
    ResetAlert,
    PermissionAlert
}

const MODAL_TYPE = [
    // CallAlert
    {
        icon: (
            <MaterialIcons
                name="call"
                size={normalize(100)}
                color={Colours.BLUE}
            />
        ),
        title: 'Call 911 now',
        description: 'Are you sure you want to call 911?',
        confirmText: 'Yes, call now'
    },
    // CancelAlert
    {
        icon: (
            <MaterialIcons
                name="call-end"
                size={normalize(100)}
                color={Colours.RED}
            />
        ),
        title: 'Cancel 911 call',
        description: 'Are you not experiencing cardiac symptoms?',
        confirmText: 'I feel fine, cancel call'
    },
    // ResetAlert
    {
        icon: (
            <Ionicons
                name="alert-circle"
                size={normalize(100)}
                color={Colours.RED}
            />
        ),
        title: 'Reset App',
        description:
            'Are you sure you want to clear all data? This action cannot be undone.',
        confirmText: 'Yes, clear data'
    },
    // PermissionAlert
    {
        icon: <Ionicons name="alert-circle" size={100} color={Colours.BLUE} />,
        title: 'Allow Permissions',
        description:
            'In order to use CodeBlue, please allow all following permissions',
        confirmText: 'Allow'
    }
];

interface Props {
    modalType: ModalType;
    modalVisible: boolean;
    setModalVisible: any;
    confirmAction: any;
}

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
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.6,
        margin: normalize(48),
        backgroundColor: Colours.WHITE,
        borderRadius: normalize(16),
        padding: normalize(22),
        alignItems: 'center',
        shadowColor: Colours.BLACK,
        shadowOffset: {
            width: normalize(0),
            height: normalize(2)
        },
        shadowOpacity: 0.25,
        shadowRadius: normalize(4),
        elevation: normalize(5)
    },
    icon: {
        padding: normalize(24)
    },
    titleText: {
        marginBottom: normalize(15),
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontSize: normalize(24)
    },
    descriptionText: {
        marginBottom: normalize(15),
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Regular',
        fontWeight: '400',
        fontSize: normalize(16)
    }
});
