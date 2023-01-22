import { storiesOf } from '@storybook/react-native';
import { NewDeviceListScreen } from './NewDeviceListScreen';

storiesOf('Screens', module).add('NewDeviceListScreen', () => (
    <NewDeviceListScreen navigation={{ navigate: () => {} }} />
));
