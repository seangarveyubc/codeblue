import * as React from 'react';
import { Button, Text, View } from 'react-native';

interface Props {
    navigation: any,
}

export const TutorialScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>Tutorial screen</Text>
            <Button title='next' onPress={() => { navigation.navigate('MainNavigator')}} />
        </View>
    );
};