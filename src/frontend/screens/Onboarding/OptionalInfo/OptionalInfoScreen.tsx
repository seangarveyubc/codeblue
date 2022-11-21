import * as React from 'react';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { CentredContent } from '../../../components/CentredContent';
import { CheckBox } from '../../../components/CheckBox';

interface Props {
    navigation: any;
}

export const OptionalInfoScreen = ({ navigation }: Props) => {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <CentredContent>
            <Text>Onboarding optional info screen</Text>
            <Button
                title='next'
                onPress={() => {
                    navigation.navigate('RequiredInfo');
                }}
            />
        </CentredContent>
    );
};
