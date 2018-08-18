import React from 'react'
import { View, Text, Button, Image } from 'react-native';

class DetailsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', '')
        }
    }
    
    render() {
        const { navigation } = this.props
        const id = navigation.getParam('id', 'NO-ID')
        const name = navigation.getParam('title', 'NO-TITLE')
        const category = navigation.getParam('category', 'NO-CATEGORY')

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{ width: 100, height: 100 }} source={require('../components/img/no_photo.png')}/>
            </View>
        );
    }
}

export default DetailsScreen;