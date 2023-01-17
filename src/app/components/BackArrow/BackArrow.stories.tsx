import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions';

import { CentredContent } from '../CentredContent/CentredContent';
import { BackArrow } from './BackArrow'; 

storiesOf('Components', module)
  .addDecorator((getStory) => <CentredContent>{ getStory() }</CentredContent>)
  .add('BackArrow', () => (
    <BackArrow label="Back" onPress={action("BackArrow pressed")} />
  ))