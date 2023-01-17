import { storiesOf } from '@storybook/react-native'
import { MedicalInfoScreen } from './MedicalInfoScreen'; 

storiesOf('Screens', module)
  .add('MedicalInfoScreen', () => (
    <MedicalInfoScreen navigation={{navigate: ()=>{}}}/>
  ))