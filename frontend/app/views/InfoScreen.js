import React, { Component } from 'react';
import { Button, View } from 'react-native';

class InfoScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return (
            { title : "Info"}
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

export default InfoScreen;