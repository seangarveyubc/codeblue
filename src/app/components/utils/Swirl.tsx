import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';

import Colours from '../../assets/constants/Colours';

export const Swirl = () => {
    return (
        <View>
            <Svg
                width={Dimensions.get('window').width}
                height={300}
                viewBox="0 0 375 275"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                fillOpacity="0.2"
            >
                <Path
                    d="M444 112.888C444 112.888 372.925 163.644 185.228 52.1143C-2.46898 -59.4152 -32 42.7651 -32 42.7651L-2.46899 366H372.925L444 112.888Z"
                    fill="#007CFF"
                    fill-opacity="0.2"
                />
                <G transform="translate(0, 50)">
                    <Path
                        d="M-71 85.5001C-71 85.5001 0 123.5 187.5 39.9996C375 -43.5004 404.5 33.0001 404.5 33.0001L375 275H0L-71 85.5001Z"
                        fill="#007CFF"
                        fill-opacity="0.2"
                    />
                </G>
            </Svg>
        </View>
    );
};
