import { storiesOf } from '@storybook/react-native';
import { CentredContent } from '../CentredContent/CentredContent';
import { SettingsOptionHeading } from './SettingsOptionHeading';

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('SettingsOptionHeading', () => (
        <SettingsOptionHeading title={'title text'} />
    ));
