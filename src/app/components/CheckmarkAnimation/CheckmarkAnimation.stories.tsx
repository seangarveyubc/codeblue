import { storiesOf } from '@storybook/react-native'
import { CentredContent } from '../CentredContent/CentredContent';
import { CheckmarkAnimation } from './CheckmarkAnimation'; 

storiesOf('Components', module)
  .addDecorator((getStory) => <CentredContent>{ getStory() }</CentredContent>)
  .add('CheckmarkAnimation', () => (
    <CheckmarkAnimation/>
  ))