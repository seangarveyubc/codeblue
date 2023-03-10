import * as React from 'react';
import Lottie from 'lottie-react-native';
import { normalize } from '../../normalizer/normalizer';

export const CheckmarkAnimation = () => {
    return (
        <Lottie
            source={require('../../assets/blue_checkmark.json')}
            style={{ width: normalize(80), height: normalize(80) }}
            autoPlay
            loop={false}
        />
    );
};
