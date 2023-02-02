import { storiesOf } from '@storybook/react-native';
import { CentredContent } from '../CentredContent/CentredContent';
import { SettingsScreenHeader } from './SettingsScreenHeader';

storiesOf('Components', module)
    .addDecorator((getStory) => <CentredContent>{getStory()}</CentredContent>)
    .add('SettingsScreenHeader', () => (
        <SettingsScreenHeader
            title={'title text'}
            navigation={{ navigate: (a: any) => {} }}
        />
    ));
