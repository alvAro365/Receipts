import React, { Component } from 'react';
import { 
    Button, 
    View, 
    StyleSheet,
    Text
 } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker'


class CameraRoll extends Component {
    static navigationOptions = ({ navigation }) => {
        return (
            { title : "Camera Roll"} 
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            currentImage: {}
        }
    }

    getSelectedImages = (images, current) => {
        this.props.navigation.navigate('AddScreen', { currentImage: current })
        console.log('====================================');
        console.log(current.uri);
        console.log('====================================');
        this.setState({
            currentImage: current
        })
    }

    render() {
        return (
           <View style={styles.container}>
            <CameraRollPicker 
                callback={this.getSelectedImages}
                maximum={0}
            />
           </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25
    },
    content: {
        marginTop: 15,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
})

export default CameraRoll;