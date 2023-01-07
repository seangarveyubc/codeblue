import React from 'react';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import StorybookUI from './storybook';

const App = () => {
    return <AppNavigator />;
};

// export default App;

const STORYBOOK_START = true;

export default STORYBOOK_START ? StorybookUI : App;
