import { storiesOf } from '@storybook/react-native'
import { Text } from 'react-native'
import { CentredContent } from './CentredContent'

storiesOf('CentredContent', module)
  .addDecorator((getStory) => <CentredContent>{ getStory() }</CentredContent>)
  .add('title', () => (
    <Text>Test centred content</Text>
  ))