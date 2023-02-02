import { storiesOf } from '@storybook/react-native';
import { AddDeviceWidget } from './AddDeviceWidget';

storiesOf('Components', module).add('AddDeviceWidget', () => (
    <AddDeviceWidget name={'name'} />
));
