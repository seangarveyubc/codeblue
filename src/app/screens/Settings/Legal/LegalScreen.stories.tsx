import { storiesOf } from '@storybook/react-native'
import { LegalScreen } from './LegalScreen'; 

storiesOf('Screens', module)
  .add('LegalScreen', () => (
    <LegalScreen navigation={{navigate: ()=>{}}}/>
  ))