import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';

import { CentredContent } from '../CentredContent/CentredContent';
import { RadioButtons } from './RadioButtons';

const RadioButtonsStateful = () => {
    const [value, setValue] = useState('');
    const onValueChange = (newValue: any) => {
        setValue(newValue);
    };

    return <RadioButtons selectedValue={value} onValueChange={onValueChange} />;
};

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('RadioButtons', () => <RadioButtonsStateful />);
