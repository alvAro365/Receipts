import React from 'react'
import { View, Text, Button } from 'react-native';


class DetailsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'City name')
        }
    }
    
    render() {
        const { navigation } = this.props
        const id = navigation.getParam('id', 'NO-ID')
        const name = navigation.getParam('title', 'NO-TITLE')
        const population = navigation.getParam('population', 'NO-POPULATION')

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {/* <Text>{name}</Text> */}
                {/* <Text>Id: {JSON.stringify(id)}</Text> */}
                <Text>Population: {JSON.stringify(population)}</Text>
                {/* <Button 
                    title="Go to Details... again"
                    onPress={() => this.props.navigation.push('Details', {
                        itemId: Math.floor(Math.random() * 100)
                    })}
                /> */}
                {/* <Button 
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Cities')}
                /> */}
                {/* <Button 
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                /> */}
                {/* <Button 
                    title="Update the title"
                    onPress={() => this.props.navigation.setParams({otherParam: 'Updated'})}
                /> */}
            </View>
        );
    }
}

export default DetailsScreen;