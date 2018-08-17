import React from 'react';
import { RootStack } from './app/components/Navigators';

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true
    return <RootStack /> 
  }
}





