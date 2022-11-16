import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { Arrow } from '../../../components/utils/Arrow';

interface Props {
    navigation: any,
    title: string,
    url: string
}

export const SettingsOption = ({ navigation, title, url }: Props) => {
    return (
        <View>
            {/* <button title={title} onClick={() => { navigation.navigate(url)}}> */}
                <Arrow/>
            {/* </button> */}
        </View>
    );
};
