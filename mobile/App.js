import React from 'react';
import { YellowBox } from 'react-native'
import Routes from './src/routes';

// Todo elemento do React Native possui o CSS padrão:
// display: flex
// flexDirection: column

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return <Routes />
}

