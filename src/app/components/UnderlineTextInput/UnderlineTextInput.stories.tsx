import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import { CentredContent } from '../CentredContent/CentredContent';
import { UnderlineTextInput } from './UnderlineTextInput';

const UnderlineTextInputStateful = () => {
    const [value, setValue] = useState('');

    const onValueChange = (newValue: string) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <UnderlineTextInput
            title={'title'}
            placeholder={'placeholder'}
            text={value}
            onChangeText={onValueChange}
        />
    );
};

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('UnderlineTextInput', () => <UnderlineTextInputStateful />);
