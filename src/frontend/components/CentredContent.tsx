import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    children?: any;
}

export const CentredContent = ({ children }: Props) => {
    return <View style={styles.orientation}>{children}</View>;
};

const styles = StyleSheet.create({
    orientation: {
        alignItems: 'center'
    }
});
