import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions';

import { AddDeviceScreen } from './AddDeviceScreen'; 

storiesOf('Components', module)
  .add('AddDeviceScreen', () => (
    <AddDeviceScreen navigation={{navigate: ()=>{}}}/>
  ))