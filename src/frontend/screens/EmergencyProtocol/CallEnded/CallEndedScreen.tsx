import * as React from 'react';
import { Button, Text, View } from 'react-native';

interface Props {
    navigation: any;
}

export const CallEndedScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>Call ended screen</Text>
            <Button
                title="home"
                onPress={() => {
                    navigation.navigate('MainNavigator');
                }}
            />
        </View>
    );
};
