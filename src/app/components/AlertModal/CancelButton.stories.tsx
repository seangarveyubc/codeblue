import { storiesOf } from '@storybook/react-native'
import { CentredContent } from '../CentredContent/CentredContent';
import { CancelButton } from './CancelButton'; 

storiesOf('Components', module)
  .addDecorator((getStory) => <CentredContent>{ getStory() }</CentredContent>)
  .add('CancelButton', () => (
    <CancelButton onPress={() => {}}/>
  ))