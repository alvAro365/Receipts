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
            num: 0,
            selectedPhotos: [],
            currentImage: {}
        }
    }

    getSelectedImages = (images, current) => {
        // const { params } = this.props.navigation.state
        // params.setImage(images)
        this.props.navigation.navigate('AddScreen', { currentImage: current })
        console.log('====================================');
        console.log(current.uri);
        console.log('====================================');
        this.setState({
            num: images.length,
            selectedPhotos: images,
            currentImage: current
        })
    }

    render() {
        return (
           <View style={styles.container}>
            {/* <View style={styles.content}>
                <Text style={styles.text}>
                    <Text style={styles.bold}>{this.state.num.toString()}</Text> images has been selected
                </Text>
            </View> */}
            <CameraRollPicker 
                callback={this.getSelectedImages}
                maximum={0}
            />
            {/* <Button 
                onPress={() => this.props.navigation.goBack()}
                title={this.state.num.toString()}
            /> */}
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
    },
    text: {
        fontSize: 16,
        alignItems: 'center'
    },
    bold: {
        fontWeight: 'bold'
    }

})

export default CameraRoll;