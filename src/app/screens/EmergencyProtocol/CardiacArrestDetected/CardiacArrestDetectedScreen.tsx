import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Vibration } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colours from '../../../constants/Colours';
import { WideButton } from '../../../components/WideButton/WideButton';
import {
    AlertModal,
    ModalType
} from '../../../components/AlertModal/AlertModal';
import { TriggerCall } from '../../../emsCall/TriggerCall';
import { normalize } from '../../../utils/normalizer/normalizer';
import { SCREEN_HEIGHT } from '../../../constants/constants';
import { AppContext } from '../../../backgroundMode/context/AppContext';
import { BackgroundMode } from '../../../backgroundMode/models/BackgroundMode';
import { backgroundModeStorage } from '../../../localStorage/hooks/useLocalStorage';
import { useContext, useEffect, useState } from 'react';
import { BACKGROUND_MODE } from '../../../localStorage/models/LocalStorageKeys';
import { getLocalStorageBackgroundMode } from '../../../backgroundMode/notifee/BackgroundProcess';

interface Props {
    navigation: any;
}

var timerId: any = null;

export const CardiacArrestDetectedScreen = ({ navigation }: Props) => {
    const { initialBackgroundState, dispatch } = useContext(AppContext);
    const [callModalVisible, setCallModalVisible] = React.useState(false);
    const [cancelModalVisible, setCancelModalVisible] = React.useState(false);

    const [cancelCall, setCancelCall] = useState(
        initialBackgroundState === BackgroundMode.CALL_ENDED
    );
    let listener: any;

    // subsribe to background mode value changes in local storage
    useEffect(() => {
        listener = backgroundModeStorage.storage.addOnValueChangedListener(
            (changedKey) => {
                if (changedKey === BACKGROUND_MODE) {
                    const newMode: BackgroundMode =
                        getLocalStorageBackgroundMode();
                    console.log(
                        `[AppNavigator] background mode changed to ${newMode}`
                    );

                    if (newMode === BackgroundMode.CALL_NOW) {
                        TriggerCall();
                        clearInterval(timerId);
                        dispatch({ type: BackgroundMode.CALL_ENDED });
                    }
                }
            }
        );
    }, [listener]);

    const [time, setTime] = React.useState(30);
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
                    size={normalize(40)}
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
                            fontSize: normalize(64),
                            marginBottom: normalize(0)
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
                    Vibration.cancel();
                    dispatch({ type: BackgroundMode.MONITOR_HEART });
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colours.WHITE,
        padding: normalize(12),
        margin: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: SCREEN_HEIGHT
    },
    icon: {
        padding: normalize(24),
        alignSelf: 'center'
    },
    head: {
        width: '72%'
    },
    title: {
        marginBottom: normalize(15),
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Bold',
        fontSize: normalize(36)
    },
    description: {
        marginBottom: normalize(15),
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Regular',
        fontWeight: '400',
        fontSize: normalize(24)
    },
    cancelDescription: {
        marginBottom: normalize(15),
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'DMSans-Regular',
        fontWeight: '400',
        fontSize: normalize(18)
    },
    red: {
        color: Colours.RED
    }
});
