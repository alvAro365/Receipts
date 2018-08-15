import React from 'react'
import { FlatList, ActivityIndicator, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import Swipeout from 'react-native-swipeout';
import { ListItem } from 'react-native-elements';
// import { Icon, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

export default class FetchedMovies extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
           activeRow: null,
        }
    }

    // componentDidMount() {
    //     return fetch('https://facebook.github.io/react-native/movies.json')
            // .then(response => response.json())
    //         .then(responseJson => {
    //             this.setState({
    //                 isLoading: false,
    //                 dataSource: responseJson.movies
    //             })
    //         })
    //         .catch(error => console.error(error))

    // }


    // onDeletePress(item) {
    //     console.log('====================================');
    //     console.log('Delete pressed');
    //     console.log('====================================');

    //     fetch(`http://cities.jonkri.se/${item.id}`, {
    //         method: 'DELETE'
    //     })
    //     .then(response => {
    //         response.json()
    //     })
    //     .then(() => {
    //         this.fetchData()
    //     })
    // }

    // async fetchData() {
    //     console.log('====================================');
    //     console.log('Fetching data');
    //     console.log('====================================');
    //     try {
    //         let response = await fetch('http://cities.jonkri.se')
    //         let responseJson = await response.json()
    //         this.setState({
    //                 isLoading: false,
    //                 dataSource: responseJson
    //             })
    //     } catch (error) {
    //         console.log('====================================');
    //         console.log(error);
    //         console.log('====================================');
    //     }
    // }

    // onRefresh() {
    //     console.log('Refreshing');
        
    //     this.setState({
    //         isLoading: true
    //     }, () => (
    //         this.fetchData()
    //     ))
    // }

    onPress(item) {
        console.log('====================================');
        console.log('onPress:' + item.name);
        console.log('====================================');
        this.props.navigation.navigate('Details', { title: item.name, id: item.id, population: item.population})
    }

    onSwipeOpen(item) {
        console.log('====================================');
        console.log(item.name);
        console.log('====================================');
        this.setState({
            activeRow: item.id,
        })
    }

    onSwipeClose(item, rowId, direction) {
        if(item.id === this.state.activeRow && typeof direction !==  'undefined') {
            this.setState({
                activeRow: item.id
            })
        }
    }

    renderItem(item, index) {
        // console.log('====================================');
        // console.log(`Item: ${item.name}, Index: ${index}`);
        // console.log('====================================');
        return (
            <Swipeout autoClose
                    close={item.id !== this.state.activeRow}
                    right={[
                    { text: 'Edit', type: 'primary', onPress: () => this.props.navigation.navigate('MyModal', { item, mode: 'update' }) },
                    { text: 'Delete', type: 'delete', onPress: () => this.props.onDeletePress(this.state.activeRow) }
                    ]}
                    onOpen={(secId, rowId, direction) => this.onSwipeOpen(item)}
                    onClose={(secId, rowId, direction) => {
                        this.onSwipeClose(item, rowId, direction)
                    }}
            > 
                <TouchableHighlight onPress={() => this.onPress(item)} underlayColor="lightgray">
                <ListItem 
                    title={item.name}
                    subtitle={<Text style={{color: 'gray'}}>Population: {item.population}</Text>}
                />
                </TouchableHighlight>
                    {/* { ((index + 1) == this.state.dataSource.length) && <View>
                        <ListItem title={<Ionicons name="ios-add-circle-outline" color="blue" size={32} />}/> 
                    </View> } */}
            </Swipeout>
        )
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
            <View style={{flex: 1, paddingTop:0, width: '100%'}}>
                <FlatList
                    ItemSeparatorComponent={() => (
                        <View style={{
                            height: 1,
                            backgroundColor: "#CED0CE"
                        }} />
                    )
                    }
                    onRefresh={this.props.onRefresh}
                    refreshing={this.props.isLoading}
                    data={this.props.datasource}
                    extraData={this.state.activeRow}
                    renderItem={({item, index}) => (
                        this.renderItem(item, index)
                    )}
                    keyExtractor={(item, index) => item + index}
                />
                {/* <Ionicons name="ios-add-outline" size={33} color="blue" /> */}
            </View>
        )
    }
}