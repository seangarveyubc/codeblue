import { storiesOf } from '@storybook/react-native'
import { AllSettingsScreen } from './AllSettingsScreen'; 

storiesOf('Screens', module)
  .add('AllSettingsScreen', () => (
    <AllSettingsScreen navigation={{navigate: ()=>{}}}/>
  ))