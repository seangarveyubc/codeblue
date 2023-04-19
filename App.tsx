import * as React from 'react';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import StorybookUI from './storybook';
import { LogBox } from 'react-native';
import { APP_MODE, AppModes } from './env_vars';

// Supress warning and error logs when app is not in debug mode
if (APP_MODE != AppModes.DEBUG_MODE) {
    LogBox.ignoreAllLogs();
}

const App = () => {
    return <AppNavigator />;
};

export default APP_MODE == AppModes.STORYBOOK_MODE ? StorybookUI : App;
