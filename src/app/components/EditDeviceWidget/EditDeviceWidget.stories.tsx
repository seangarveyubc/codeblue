import { storiesOf } from '@storybook/react-native';
import { useState } from 'react';
import { DeviceData } from '../../localStorage/models/DeviceList';
import { CentredContent } from '../CentredContent/CentredContent';
import { EditDeviceWidget } from './EditDeviceWidget';

const EditDeviceWidgetStateful = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const initialDeviceData: DeviceData = {
        id: '1',
        name: name,
        location: location
    };
    const updateDeviceInfo = (
        initialDeviceData: DeviceData,
        type: 'location' | 'name',
        newName: string,
        newLocationIndex: number
    ) => {};

    return (
        <EditDeviceWidget
            initialDeviceData={initialDeviceData}
            updateDeviceInfo={updateDeviceInfo}
            deleteDevice={() => {}}
            isConnected={true}
        />
    );
};

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('DropdownSingleSelect', () => <EditDeviceWidgetStateful />);
