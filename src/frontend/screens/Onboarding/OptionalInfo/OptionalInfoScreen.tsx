import * as React from 'react';
import { Button, Text } from 'react-native';
import { CentredContent } from '../../../components/CentredContent';

interface Props {
    navigation: any;
}

export const OptionalInfoScreen = ({ navigation }: Props) => {
    return (
        <CentredContent>
            <Text>Onboarding optional info screen</Text>
            <Button
                title="next"
                onPress={() => {
                    navigation.navigate('RequiredInfo');
                }}
            />
        </CentredContent>
    );
};
