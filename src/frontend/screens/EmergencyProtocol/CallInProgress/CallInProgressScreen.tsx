import * as React from 'react';
import { Button, Text, View } from 'react-native';

interface Props {
    navigation: any;
}

export const CallInProgressScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>Call in progress screen</Text>
            <Button
                title="next"
                onPress={() => {
                    navigation.navigate('CallEnded');
                }}
            />
        </View>
    );
};
