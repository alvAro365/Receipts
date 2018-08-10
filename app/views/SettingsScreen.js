import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

class SettingsScreen extends Component {
    // static navigationOptions = {
    //     title: "Settings"
    // }

    static navigationOptions = ({ navigation }) => {
        return (
            { title : "Settings"}
        )

    }

    state = {  }
    render() {
        return (
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text style={{ fontSize: 30}}>Settings!</Text> */}
            <Button 
                onPress={() => this.props.navigation.navigate('Cities')}
                title="Go to Cities"
            />
           </View> 
        );
    }
}

export default SettingsScreen;