import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import { CentredContent } from '../CentredContent/CentredContent';
import { DropdownSingleSelect } from './DropdownSingleSelect';

const DropdownSingleSelectStateful = () => {
    const [value, setValue] = useState('');

    const onValueChange = (newValue: string) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <DropdownSingleSelect
            data={[
                { label: 'key0', value: 0 },
                { label: 'key1', value: 1 },
                { label: 'key2', value: 2 }
            ]}
            placeholder={'placeholder text'}
            width={300}
            selected={value}
            setSelected={onValueChange}
        />
    );
};

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('DropdownSingleSelect', () => <DropdownSingleSelectStateful />);
