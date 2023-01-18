import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import { UserMedicalInfo } from './UserMedicalInfo';

const UserMedicalInfoStateful = () => {
    const [personalHistory, setPersonalHistory] = useState('');
    const [familyHistory, setFamilyHistory] = useState('');

    const onPersonalHistoryChange = (newPersonalHistory: any) => {
        setPersonalHistory(newPersonalHistory);
    };
    const onFamilyHistoryChange = (newFamilyHistory: any) => {
        setFamilyHistory(newFamilyHistory);
    };

    return (
        <UserMedicalInfo
            edit={false}
            personalHistory={personalHistory}
            familyHistory={familyHistory}
            setPersonalHistory={onPersonalHistoryChange}
            setFamilyHistory={onFamilyHistoryChange}
        />
    );
};
storiesOf('Components', module).add('UserMedicalInfo', () => (
    <UserMedicalInfoStateful />
));
