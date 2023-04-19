import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { EMS_PHONE_NUMBER } from '../../../env_vars';

export const TriggerCall = () => {
    RNImmediatePhoneCall.immediatePhoneCall(EMS_PHONE_NUMBER);
};
