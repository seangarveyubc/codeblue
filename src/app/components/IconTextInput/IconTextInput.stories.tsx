import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import { CentredContent } from '../CentredContent/CentredContent';
import { IconTextInput } from './IconTextInput';

const IconTextInputStateful = () => {
    const [value, setValue] = useState('');

    const onValueChange = (newValue: string) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <IconTextInput
            text={value}
            onChangeText={onValueChange}
            isConnected={true}
        />
    );
};

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('IconTextInput', () => <IconTextInputStateful />);
