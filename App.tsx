import * as React from 'react';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import StorybookUI from './storybook';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {
    return <AppNavigator />;
};

// Variable to switch between running CodeBlue App and components Storybook
const STORYBOOK_START = false;

export default STORYBOOK_START ? StorybookUI : App;
