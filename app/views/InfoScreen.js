import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

class InfoScreen extends Component {
    state = {  }
    render() {
        return (
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30}}>This is a modal!</Text>
            <Button 
                onPress={() => this.props.navigation.goBack()}
                title="Dismiss"
            />
           </View> 
        );
    }
}

export default InfoScreen;