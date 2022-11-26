import * as React from 'react';
import Lottie from 'lottie-react-native';

export const CheckmarkAnimation = () => {
    return (
        <Lottie
            source={require('../../assets/images/blue_checkmark.json')}
            style={{ width: 80, height: 80 }}
            autoPlay
            loop={false}
        />
    );
};
