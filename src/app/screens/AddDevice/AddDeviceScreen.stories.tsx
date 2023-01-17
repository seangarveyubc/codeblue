import { storiesOf } from '@storybook/react-native'
import { AddDeviceScreen } from './AddDeviceScreen'; 

storiesOf('Screens', module)
  .add('AddDeviceScreen', () => (
    <AddDeviceScreen navigation={{navigate: ()=>{}}}/>
  ))