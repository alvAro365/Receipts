import React from 'react'
import { StyleSheet,
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
        try {
            let response = await fetch('http://localhost:3000/receipts')
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
    
    onPress = (selectedItem) => {
        console.log('====================================');
        console.log('onPress:' + selectedItem.name);
        console.log('====================================');
        this.props.navigation.navigate('Details', { title: selectedItem.name, id: selectedItem.id, category: selectedItem.category})
    }

    onDeletePress = (selectedItem) => {
        console.log('====================================');
        console.log('Delete pressed: ' + selectedItem);
        console.log('====================================');

        fetch(`http://localhost:3000/receipts/delete/${selectedItem}`, {
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
