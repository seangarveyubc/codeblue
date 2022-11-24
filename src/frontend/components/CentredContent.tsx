import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    children?: any;
    marginTop?: number;
}

export const CentredContent = ({ children, marginTop }: Props) => {
    return <View style={{ ...styles.orientation, marginTop }}>{children}</View>;
};

const styles = StyleSheet.create({
    orientation: {
        alignItems: 'center'
    }
});
