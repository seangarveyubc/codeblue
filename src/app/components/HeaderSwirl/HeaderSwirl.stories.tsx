import { storiesOf } from '@storybook/react-native'
import { useState } from 'react';

import { CentredContent } from '../CentredContent/CentredContent';
import { HeaderSwirl } from './HeaderSwirl'; 


storiesOf('Components', module)
  .addDecorator((getStory) => <CentredContent>{ getStory() }</CentredContent>)
  .add('HeaderSwirl', () => (
    <HeaderSwirl title={"title"}/>
  ))