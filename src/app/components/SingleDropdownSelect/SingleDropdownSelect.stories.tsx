import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import { CentredContent } from '../CentredContent/CentredContent';
import { SingleDropdownSelect } from './SingleDropdownSelect';

const SingleDropdownSelectStateful = () => {
    const [value, setValue] = useState(0);

    const onValueChange = (newValue: number) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <SingleDropdownSelect
            name={'name'}
            options={['key1', 'key2', 'key3']}
            selectedIndex={value}
            onIndexChange={onValueChange}
        />
    );
};

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('SingleDropdownSelect', () => <SingleDropdownSelectStateful />);
