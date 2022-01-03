/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import './global';

const { registerRootComponent, scheme } = require('expo');
const { default: App } = require('./App');

const { default: AsyncStorage } = require('@react-native-async-storage/async-storage');
const { withWalletConnect } = require('@walletconnect/react-native-dapp');

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(withWalletConnect(App, {
    redirectUrl: Platform.OS === 'web' ? window.location.origin : `${scheme}://`,
    storageOptions: {
      asyncStorage: AsyncStorage,
    },
  }));
