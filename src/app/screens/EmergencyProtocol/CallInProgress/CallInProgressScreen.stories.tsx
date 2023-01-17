import { storiesOf } from '@storybook/react-native'
import { CallInProgressScreen } from './CallInProgressScreen'; 

storiesOf('Screens', module)
  .add('CallInProgressScreen', () => (
    <CallInProgressScreen navigation={{navigate: ()=>{}}}/>
  ))