import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { RootStack } from './app/components/Navigators';
// import app from 'server'

export default class App extends React.Component {
  state = {
    cities: 'Hej på dig'
  }

  setCities = cities => this.setState({ cities }, console.log('City added'))
  render() {
    console.disableYellowBox = true
    const propsForTheScreen = { setCities: this.setCities, cities: this.state.cities }
    return <RootStack screenProps = { propsForTheScreen }/> 
  }
}



