import { storiesOf } from '@storybook/react-native'
import { RequiredInfoScreen } from './RequiredInfoScreen'; 

storiesOf('Screens', module)
  .add('RequiredInfoScreen', () => (
    <RequiredInfoScreen navigation={{navigate: ()=>{}}}/>
  ))