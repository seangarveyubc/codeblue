import { storiesOf } from '@storybook/react-native';
import { CentredContent } from '../CentredContent/CentredContent';
import { DeviceWidget } from './DeviceWidget';

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('DeviceWidget', () => (
        <DeviceWidget name={'device name'} isConnected={true} />
    ));
