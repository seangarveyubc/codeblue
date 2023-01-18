import { storiesOf } from '@storybook/react-native';
import { HomeScreen } from './HomeScreen';

storiesOf('Screens', module).add('HomeScreen', () => (
    <HomeScreen navigation={{ navigate: () => {} }} />
));
