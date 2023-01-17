import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions';

import { CentredContent } from '../CentredContent/CentredContent';
import { RoundButton } from './RoundButton'; 

storiesOf('Components', module)
  .addDecorator((getStory) => <CentredContent>{ getStory() }</CentredContent>)
  .add('RoundButton', () => (
    <RoundButton text={"Test"} onPress={action("RoundButton pressed")}/>
  ))