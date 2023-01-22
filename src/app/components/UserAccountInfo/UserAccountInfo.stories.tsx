import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import { UserAccountInfo } from './UserAccountInfo';

const UserAccountInfoStateful = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [sex, setSex] = useState('');

    const onFirstNameChange = (data: any) => {
        setFirstName(data);
    };
    const onLastNameChange = (data: any) => {
        setLastName(data);
    };
    const onBirthdayChange = (data: any) => {
        setBirthday(data);
    };
    const onHeightChange = (data: any) => {
        setHeight(data);
    };
    const onWeightChange = (data: any) => {
        setWeight(data);
    };
    const onBloodTypeChange = (data: any) => {
        setBloodType(data);
    };
    const onSexChange = (data: any) => {
        setSex(data);
    };

    return (
        <UserAccountInfo
            edit={true}
            firstName={firstName}
            lastName={lastName}
            birthday={birthday}
            height={height}
            weight={weight}
            bloodType={bloodType}
            sex={sex}
            setFirstName={onFirstNameChange}
            setLastName={onLastNameChange}
            setBirthday={onBirthdayChange}
            setHeight={onHeightChange}
            setWeight={onWeightChange}
            setBloodType={onBloodTypeChange}
            setSex={onSexChange}
        />
    );
};
storiesOf('Components', module).add('UserAccountInfo', () => (
    <UserAccountInfoStateful />
));
