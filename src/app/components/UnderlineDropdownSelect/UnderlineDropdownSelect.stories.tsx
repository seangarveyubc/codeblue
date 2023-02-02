import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import { CentredContent } from '../CentredContent/CentredContent';
import { UnderlineDropdownSelect } from './UnderlineDropdownSelect';

const UnderlineDropdownSelectStateful = () => {
    const [value, setValue] = useState('');

    const onValueChange = (newValue: string) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <UnderlineDropdownSelect
            selectedValue={value}
            onValueChange={onValueChange}
        />
    );
};

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('UnderlineDropdownSelect', () => <UnderlineDropdownSelectStateful />);
