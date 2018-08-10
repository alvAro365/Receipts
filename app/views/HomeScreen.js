import React from 'react'
import { Alert,
     StyleSheet,
     Button, 
     Text, 
     TouchableHighlight, 
     TouchableOpacity, 
     TouchableNativeFeedback, 
     TouchableWithoutFeedback, 
     View } from 'react-native'
import { Touchables } from '../components/Touchables'
import ScrollerView from '../components/Scroller'
import List from '../components/List'
import FetchedMovies from '../components/FetchedMovies'
import ImageTitle from '../components/ImageTitle';
import { Icon, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import HeaderButtons, { HeaderButton } from 'react-navigation-header-buttons';


const IoniconsHeaderButton = (props) => (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} />

)

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.param || {}

        return {
            // headerTitle: <MaterialCommunityIcons name="city" size={40} color="#fff" />,
            title: 'Cities',
            headerRight: (
                <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>}>
                    <HeaderButtons.Item title="search" iconName="ios-information-circle-outline" onPress={() => navigation.navigate('MyModal')}/>
                </HeaderButtons>
            )
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount })
    }

    state = {
        count: 0,
    }

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        return (
            <View style={styles.container}>
                <FetchedMovies navigation={this.props.navigation} />
                {/* <Button 
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details', {
                        itemId: 88,
                        otherParam: 'anything here'
                    })}
                / */}
                { 
                 /*
                <FetchedMovies />
                 <List />
                 <ScrollerView />
                 <Touchables />
                 <Button onPress={() => {
                    Alert.alert('You tapped the button')
                }}
                title="Press me"
                /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
