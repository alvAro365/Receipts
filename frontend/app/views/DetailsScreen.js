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

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        setTimeout(()=> { this.setState({isLoading: false})}, 800)
    }
    
    render() {
        const { uri } = this.props.navigation.state.params

        if(this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ProgressPie indeterminate />
                </View>
            )
        }
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