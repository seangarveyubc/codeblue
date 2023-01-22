import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';

import { CentredContent } from '../CentredContent/CentredContent';
import { CheckBox } from './CheckBox';

const CheckBoxStateful = () => {
    const [checked, setChecked] = useState(false);
    const onValueChange = () => {
        setChecked(!checked);
    };

    return <CheckBox value={checked} onValueChange={onValueChange} />;
};

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('CheckBox', () => <CheckBoxStateful />);
