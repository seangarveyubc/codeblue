import React from 'react';
import { View, Dimensions } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';

import Colours from '../../constants/Colours';
import { SCREEN_WIDTH } from '../../constants/constants';
//import { normalize } from '../../normalizer/normalizer';

interface Props {
    rotation?: number;
}

export const Swirl = ({ rotation }: Props) => {
    return (
        <View>
            <Svg
                width={SCREEN_WIDTH}
                height={300}
                viewBox="0 0 375 275"
                fill="none"
                fillOpacity="0.2"
                rotation={rotation ? rotation : 0}
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
