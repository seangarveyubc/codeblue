import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colours from '../../../constants/Colours';
import { WideButton } from '../../../components/WideButton/WideButton';
import {
    AlertModal,
    ModalType
} from '../../../components/AlertModal/AlertModal';

interface Props {
    navigation: any;
}

const windowHeight = Dimensions.get('window').height;

export const CardiacArrestDetectedScreen = ({ navigation }: Props) => {
    const [callModalVisible, setCallModalVisible] = React.useState(false);
    const [cancelModalVisible, setCancelModalVisible] = React.useState(false);
    const [time, setTime] = React.useState(30);
    const timerRef = React.useRef(time);

    React.useEffect(() => {
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
            } else {
                setTime(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    const showCallModal = () => {
        setCallModalVisible(true);
    };
    const showCancelModal = () => {
        setCancelModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Ionicons
                    style={styles.icon}
                    name="alert-circle"
                    size={40}
                    color={Colours.RED}
                />
                <Text style={styles.title}>
                    <Text style={styles.red}>Cardiac arrest</Text> detected
                </Text>
                <Text style={styles.description}>
                    If no action is taken, <Text style={styles.red}>911</Text>{' '}
                    will be called in
                </Text>
            </View>
            <View>
                <Text
                    style={{
                        ...styles.title,
                        ...{
                            fontSize: 64,
                            marginBottom: 0
                        }
                    }}
                >
                    {time}
                </Text>
                <Text style={styles.description}>seconds</Text>
            </View>
            <WideButton text="Call 911 now" onPress={showCallModal} />
            <View>
                <Text style={styles.cancelDescription}>False alarm?</Text>
                <WideButton
                    text="Cancel 911 call"
                    textColour={Colours.BLACK}
                    colour={Colours.RED}
                    onPress={showCancelModal}
                />
            </View>
            {/* Call alert modal */}
            <AlertModal
                modalVisible={callModalVisible}
                setModalVisible={setCallModalVisible}
                modalType={ModalType.CallAlert}
                confirmAction={() => {
                    navigation.navigate('CallInProgress');
                }}
            />
            {/* Cancel alert modal */}
            <AlertModal
                modalVisible={cancelModalVisible}
                setModalVisible={setCancelModalVisible}
                modalType={ModalType.CancelAlert}
                confirmAction={() => {
                    navigation.navigate('MainNavigator');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colours.WHITE,
        padding: 12,
        margin: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: windowHeight
    },
    icon: {
        padding: 24,
        alignSelf: 'center'
    },
    head: {
        width: '72%'
    },
    title: {
        marginBottom: 15,
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontSize: 36
    },
    description: {
        marginBottom: 15,
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Regular',
        fontWeight: '400',
        fontSize: 24
    },
    cancelDescription: {
        marginBottom: 15,
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Regular',
        fontWeight: '400',
        fontSize: 18
    },
    red: {
        color: Colours.RED
    }
});
