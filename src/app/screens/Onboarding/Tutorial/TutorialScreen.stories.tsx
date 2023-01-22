import { storiesOf } from '@storybook/react-native';
import { TutorialScreen } from './TutorialScreen';

storiesOf('Screens', module).add('TutorialScreen', () => (
    <TutorialScreen navigation={{ navigate: () => {} }} />
));
