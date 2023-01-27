import { Linking } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Tts from 'react-native-tts';

export const TriggerCall = () => {
    RNImmediatePhoneCall.immediatePhoneCall('2504885748');

    // Tts.speak('Hello, world!', {
    //     androidParams: KEY_PARAM_VOLUME: 1
    //     }
    // });
};
