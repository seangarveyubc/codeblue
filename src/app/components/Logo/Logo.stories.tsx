import { storiesOf } from '@storybook/react-native'
import { CentredContent } from '../CentredContent/CentredContent';
import { Logo } from './Logo'; 


storiesOf('Components', module)
  .addDecorator((getStory) => <CentredContent>{ getStory() }</CentredContent>)
  .add('Logo', () => (
    <Logo width={50} height={50}/>
  ))