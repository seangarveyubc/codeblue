import { storiesOf } from '@storybook/react-native';
import { OptionalInfoScreen } from './OptionalInfoScreen';

storiesOf('Screens', module).add('OptionalInfoScreen', () => (
    <OptionalInfoScreen navigation={{ navigate: () => {} }} />
));
