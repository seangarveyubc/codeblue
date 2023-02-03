/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const MyHeadlessTask = async () => {
    setInterval(() => {
        console.log('Receiving HeartBeat!' + Date.now());
    }, 15000);
};

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('BackgroundTask', () => MyHeadlessTask);
