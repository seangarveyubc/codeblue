/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { setNotificationForegroundService } from './src/app/backgroundMode/notifee/notifeeService';

AppRegistry.registerComponent(appName, () => App);

setNotificationForegroundService();
