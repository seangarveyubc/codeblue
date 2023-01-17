import { storiesOf } from '@storybook/react-native'
import { CardiacArrestDetectedScreen } from './CardiacArrestDetectedScreen'; 

storiesOf('Screens', module)
  .add('CardiacArrestDetectedScreen', () => (
    <CardiacArrestDetectedScreen navigation={{navigate: ()=>{}}}/>
  ))