import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import { SCREEN_WIDTH } from '../../constants/constants';
import { CentredContent } from '../CentredContent/CentredContent';
import { DropdownSelect } from './DropdownSelect';

const DropdownSelectStateful = () => {
    const [value, setValue] = useState('');
    const data = ['Option 1', 'Option 2', 'Option 3'];

    const onValueChange = (newValue: string) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <DropdownSelect
            type="Dropdown Select"
            data={data}
            selectedValue={value}
            onValueChange={onValueChange}
            width={SCREEN_WIDTH * 0.5}
        />
    );
};

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('DropdownSelect', () => <DropdownSelectStateful />);
