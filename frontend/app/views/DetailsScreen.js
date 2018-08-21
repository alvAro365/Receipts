import React from 'react'
import { View, Text, Button, Image } from 'react-native';
import { Avatar } from 'react-native-elements';

class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            // title: navigation.getParam('title', ''),
            headerTransparent: true,
        }
    }
    
    render() {
        const { navigation } = this.props
        const id = navigation.getParam('id', 'NO-ID')
        const name = navigation.getParam('title', 'NO-TITLE')
        const category = navigation.getParam('category', 'NO-CATEGORY')
        const uri = navigation.getParam('uri', 'NO-URI')

        return (
            <View style={{ flex: 1, alignItems: 'stretch'}}>
                <Image style={{ flex: 1}} 
                source={{uri: uri}}/>
            </View>
        );
    }
}

export default DetailsScreen;