import { storiesOf } from '@storybook/react-native';
import { HeartRateWidget } from './HeartRateWidget';

storiesOf('Components', module).add('HeartRateWidget', () => (
    <HeartRateWidget heartRate={60} />
));
