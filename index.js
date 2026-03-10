/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const isStorybook = false;

const RootComponent = isStorybook
  ? require('./.rnstorybook').default
  : require('./App').default;

AppRegistry.registerComponent(appName, () => RootComponent);
