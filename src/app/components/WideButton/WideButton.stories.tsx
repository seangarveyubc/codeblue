import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import { CentredContent } from '../CentredContent/CentredContent';
import { WideButton } from './WideButton';

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('WideButton', () => (
        <WideButton text={'text'} onPress={action('WideButton pressed')} />
    ));
