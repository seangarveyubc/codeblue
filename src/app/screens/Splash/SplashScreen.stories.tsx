import { storiesOf } from '@storybook/react-native';
import { SplashScreen } from './SplashScreen';

storiesOf('Screens', module).add('SplashScreen', () => (
    <SplashScreen navigation={{ navigate: () => {} }} />
));
