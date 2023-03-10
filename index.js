/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { setNotificationForegroundService } from './src/app/backgroundMode/notifee/notifeeService';

console.log('[index.js] registered foreground service in index.js');
setNotificationForegroundService();

AppRegistry.registerComponent(appName, () => App);
