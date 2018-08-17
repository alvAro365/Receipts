import React from 'react'
import { Alert,
     ActivityIndicator,
     StyleSheet,
     View } from 'react-native'
import List from '../components/List'
import Ionicons from "react-native-vector-icons/Ionicons"
import HeaderButtons, { HeaderButton } from 'react-navigation-header-buttons';


const IoniconsHeaderButton = (props) => (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={33} />
)

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.param || {}

        return {
            // headerTitle: <MaterialCommunityIcons name="city" size={40} color="#fff" />,
            title: 'Receipts',
            headerRight: (
                <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>}>
                    <HeaderButtons.Item title="search" iconName="ios-add" 
                    color="blue" onPress={
                        () => navigation.navigate('MyModal', 
                        {
                            mode: 'add',
                            refresh: navigation.getParam('onRefresh'), 
                            item: 'undefined' 
                        }) 
                    }
                    />
                </HeaderButtons>
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
        this.props.navigation.setParams({ onRefresh: this.onRefresh })
        this.fetchData()
    }

    async fetchData() {
        console.log('====================================');
        console.log('Fetching data Home Screen');
        console.log('====================================');
        try {
            let response = await fetch('http://localhost:3000/receipts')
            let responseJson = await response.json()
            console.log(`ResponseJson: ${responseJson}`)
            this.setState({
                    isLoading: false,
                    datasource: responseJson
                })
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
        console.log('Hei fetch data')
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
        this.props.navigation.navigate('Details', { title: item.name, id: item.id, category: item.category})
    }

    onDeletePress = (item) => {
        console.log('====================================');
        console.log('Delete pressed: ' + item);
        console.log('====================================');

        fetch(`http://localhost:3000/receipts/delete/${item}`, {
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
                { !this.state.isLoading && <List navigation={this.props.navigation } 
                datasource={this.state.datasource} 
                isLoading={this.state.isLoading}
                onDeletePress={this.onDeletePress}
                onRefresh={this.onRefresh}

                /> }
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
