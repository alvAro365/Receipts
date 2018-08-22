import React from 'react'
import { View } from 'react-native'
import Image from 'react-native-image-progress'
import ProgressPie from 'react-native-progress/Pie'

class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true,
        }
    }
    
    render() {
        const { uri } = this.props.navigation.state.params
        return (
            <View style={{ flex: 1, alignItems: 'stretch'}}>
                <Image style={{ flex: 1}} 
                source={{ uri: uri }}
                indicator={ProgressPie}
                />
            </View>
        )
    }
}

export default DetailsScreen;