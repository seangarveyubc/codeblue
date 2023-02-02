import { storiesOf } from '@storybook/react-native';
import { CentredContent } from '../CentredContent/CentredContent';
import { ForwardArrow } from './ForwardArrow';

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('ForwardArrow', () => <ForwardArrow label={'label'} />);
