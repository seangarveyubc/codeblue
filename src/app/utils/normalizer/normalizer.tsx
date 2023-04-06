import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Use iPhone6 as base size which is 375 x 667
const baseWidth = 412;
const baseHeight = 732;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const normalize = (size: number) => {
    return Math.ceil(size * scale);
};
