/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
AppRegistry.registerComponent(appName, () => App);
