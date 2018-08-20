import React, { Component } from 'react';
import { Button, View } from 'react-native';

class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return (
            { title : "Settings"}
        )
    }

    state = {  }
    render() {
        return (
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button 
                onPress={() => this.props.navigation.navigate('Cities')}
                title="Go to Home"
            />
           </View> 
        );
    }
}

export default SettingsScreen;