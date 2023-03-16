import { AppRegistry } from 'react-native';
import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colours from '../../../constants/Colours';
import { WideButton } from '../../../components/WideButton/WideButton';
import {
    AlertModal,
    ModalType
} from '../../../components/AlertModal/AlertModal';
import { TriggerCall } from '../../../EMSCall/TriggerCall';
import { AppContext } from '../../../backgroundMode/context/AppContext';
import { BackgroundMode } from '../../../backgroundMode/models/BackgroundMode';
import { backgroundModeStorage } from '../../../localStorage/hooks/useLocalStorage';
import { EP_TIMER } from '../../../localStorage/models/LocalStorageKeys';

interface Props {
    navigation: any;
}

const windowHeight = Dimensions.get('window').height;
var timerId: any = null;

export const CardiacArrestDetectedScreen = ({ navigation }: Props) => {
    const { dispatch } = React.useContext(AppContext);
    const [callModalVisible, setCallModalVisible] = React.useState(false);
    const [cancelModalVisible, setCancelModalVisible] = React.useState(false);

    // initialize the timer to the current value in local storage
    const [time, setTime] = React.useState(
        backgroundModeStorage.getNumber(EP_TIMER) ?? 30
    );
    const timerRef = React.useRef(time);

    React.useEffect(() => {
        timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                TriggerCall();
                clearInterval(timerId);
                navigation.navigate('CallEnded');
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

    const placeEMSCall = () => {
        TriggerCall();
        setCallModalVisible(false);
        clearInterval(timerId);
        navigation.navigate('CallEnded');
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
            <WideButton
                text="Call 911 now"
                onPress={() => {
                    showCallModal();
                }}
            />
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
                confirmAction={placeEMSCall}
            />
            {/* Cancel alert modal */}
            <AlertModal
                modalVisible={cancelModalVisible}
                setModalVisible={setCancelModalVisible}
                modalType={ModalType.CancelAlert}
                confirmAction={() => {
                    dispatch({ type: BackgroundMode.MONITOR_HEART });
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

AppRegistry.registerComponent(
    'ca-component',
    () => CardiacArrestDetectedScreen
);
