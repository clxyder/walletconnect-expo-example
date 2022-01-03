# WalletConnect Example on Expo

This is a simple example how to get `WalletConnect` up and running with `Expo` for React Native.

## `WalletConnect`'s dependency on Node's `crypto` package

`WalletConnect` uses node's built-in crypto package which is not available on iOS or Android.
In order to work around this we can use `metro.config.js` to create aliases for different packages, this idea is from [here](https://learn.figment.io/tutorials/how-to-successfully-connect-to-a-celo-wallet-with-a-react-native-dapp).
This will allow us to use `WalletConnect` directly from the `expo` client without having to eject the application.

## Getting Started

Please go ahead and install the packages via `yarn install`, then, run `yarn start` or `expo start`.
Once the build is complete and opened in the `Expo Go` app, connect your wallet by pressing the `Connect a wallet` button.

![alt text](./assets/gifs/walletconnect-expo-demo.gif)
