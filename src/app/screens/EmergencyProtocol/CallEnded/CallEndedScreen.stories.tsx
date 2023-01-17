import { storiesOf } from '@storybook/react-native'
import { CallEndedScreen } from './CallEndedScreen'; 

storiesOf('Screens', module)
  .add('CallEndedScreen', () => (
    <CallEndedScreen navigation={{navigate: ()=>{}}}/>
  ))