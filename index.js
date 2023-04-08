/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { setNotificationForegroundService } from './src/app/backgroundMode/notifee/notifeeService';
import * as utils from './src/app/utils/AppUtils';

// save FCM device token id into local storage
utils.saveDeviceFCMToken();

console.log('[index.js] registered foreground service in index.js');
setNotificationForegroundService();
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
