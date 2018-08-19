import React, { Component } from 'react';
import { Button, View } from 'react-native';

class CameraRollPicker extends Component {
    static navigationOptions = ({ navigation }) => {
        return (
            { title : "Camera Roll"} 
        )
    }

    state = {  }
    render() {
        return (
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button 
                onPress={() => this.props.navigation.goBack()}
                title="Go Back"
            />
           </View> 
        );
    }
}

export default CameraRollPicker;