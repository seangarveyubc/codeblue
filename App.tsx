import React from 'react';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import StorybookUI from './storybook';

const App = () => {
    return <AppNavigator />;
};

// Variable to switch between running CodeBlue App and components Storybook
const STORYBOOK_START = true;

export default STORYBOOK_START ? StorybookUI : App;
