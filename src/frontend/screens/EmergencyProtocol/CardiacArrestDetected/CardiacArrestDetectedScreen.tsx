import * as React from 'react';
import { Button, Text, View } from 'react-native';

interface Props {
    navigation: any,
}

export const CardiacArrestScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>Cardiac arrest detected screen</Text>
            <Button title='next' onPress={() => { navigation.navigate('CallInProgress')}} />
        </View>
    );
};