import { storiesOf } from '@storybook/react-native';
import { OptionType, SettingsOption } from './SettingsOption';

storiesOf('Components', module).add('SettingsOption', () => (
    <SettingsOption optionType={OptionType.AccountInfo} onPress={() => {}} />
));
