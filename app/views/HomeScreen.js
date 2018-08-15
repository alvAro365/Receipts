import React from 'react'
import { Alert,
     ActivityIndicator,
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
// import { Icon, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
// import Ionicons from "react-native-vector-icons/Ionicons"
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import HeaderButtons, { HeaderButton } from 'react-navigation-header-buttons';


const IoniconsHeaderButton = (props) => (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={33} />

)

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.param || {}

        return {
            // headerTitle: <MaterialCommunityIcons name="city" size={40} color="#fff" />,
            title: 'Cities',
            headerRight: (
                // <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>}>
                //     <HeaderButtons.Item title="search" iconName="ios-add" 
                //     color="blue" onPress={
                //         () => navigation.navigate('MyModal', 
                //         {
                //             mode: 'add',
                //             refresh: navigation.getParam('onRefresh'), 
                //             item: 'undefined' 
                //         }) 
                //     }
                //     />

                // </HeaderButtons>
                <Button 
                    onPress={ () => navigation.navigate('MyModal', 
                    {
                        mode: 'add',
                        refresh: navigation.getParam('onRefresh'),
                        item: 'undefined'

                    })}
                    title="Add"
                    color="blue"
                />
            )
        }
    }

    constructor(props) {
        super(props)
        this.state = { 
           isLoading: true,
           activeRow: null,
           datasource: null
        }
    }

    componentDidMount() {
        // this.props.navigation.setParams({ increaseCount: this.increaseCount })
        this.props.navigation.setParams({ onRefresh: this.onRefresh })
        this.fetchData()

    }

    async fetchData() {
        console.log('====================================');
        console.log('Fetching data Home Screen');
        console.log('====================================');
        try {
            let response = await fetch('http://cities.jonkri.se')
            let responseJson = await response.json()
            this.setState({
                    isLoading: false,
                    datasource: responseJson
                })
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
        console.log(this.state)
    }

    increaseCount = () => {
        this.setState({ count: this.state.count + 1 })
    }

    onRefresh = () => {
        console.log('Refreshing');
        this.setState({
            isLoading: true
        }, () => (
            this.fetchData()
        ))
    }
    onPress = (item) => {
        console.log('====================================');
        console.log('onPress:' + item.name);
        console.log('====================================');
        this.props.navigation.navigate('Details', { title: item.name, id: item.id, population: item.population})
    }

    onDeletePress = (item) => {
        console.log('====================================');
        console.log('Delete pressed: ' + item);
        console.log('====================================');

        fetch(`http://cities.jonkri.se/${item}`, {
            method: 'DELETE'
        })
        .then(response => {
            response.json()
        })
        .then(() => {
            this.fetchData()
        })
    }

    render() {
        // if(this.state.isLoading) {
        //     return(
        //         <View style={{flex: 1, padding: 20}}>
        //             <ActivityIndicator />
        //         </View>
        //     )
        // }
        return (
            <View style={styles.container}>
                { !this.state.isLoading && <FetchedMovies navigation={this.props.navigation } 
                datasource={this.state.datasource} 
                isLoading={this.state.isLoading}
                onDeletePress={this.onDeletePress}
                onRefresh={this.onRefresh}

                /> }
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
