import { storiesOf } from '@storybook/react-native';
import { OnboardingSuccessScreen } from './OnboardingSuccessScreen';

storiesOf('Screens', module).add('OnboardingSuccessScreen', () => (
    <OnboardingSuccessScreen navigation={{ navigate: () => {} }} />
));
