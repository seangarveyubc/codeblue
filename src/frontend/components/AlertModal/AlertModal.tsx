import React from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';
import Colours from '../../../utilities/Colours';
import { CentredContent } from '../CentredContent';
import Icon from 'react-native-vector-icons/Ionicons';
import { RoundButton } from './RoundButton';
import { CancelButton } from './CancelButton';

interface Props {
    modalVisible: boolean;
    setModalVisible: any;
    title: string;
    description: string;
    confirmText: string;
    confirmAction: any;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const AlertModal = ({
    modalVisible,
    setModalVisible,
    title,
    description,
    confirmText,
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
                        <Icon
                            style={styles.icon}
                            name="alert-circle"
                            size={100}
                            color={Colours.RED}
                        />
                        <Text style={styles.titleText}>{title}</Text>
                        <Text style={styles.descriptionText}>
                            {description}
                        </Text>
                        <RoundButton
                            text={confirmText}
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
        fontWeight: '700',
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
