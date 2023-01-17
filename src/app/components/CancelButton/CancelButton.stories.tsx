import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions';

import { CentredContent } from '../CentredContent/CentredContent';
import { CancelButton } from './CancelButton'; 

storiesOf('Components', module)
  .addDecorator((getStory) => <CentredContent>{ getStory() }</CentredContent>)
  .add('CancelButton', () => (
    <CancelButton onPress={action("CancelButton pressed")}/>
  ))