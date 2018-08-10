import React from 'react'
import { FlatList, ActivityIndicator, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import Swipeout from 'react-native-swipeout';
import { ListItem } from 'react-native-elements';

export default class FetchedMovies extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isLoading: true }
    }

    // componentDidMount() {
    //     return fetch('https://facebook.github.io/react-native/movies.json')
    //         .then(response => response.json())
    //         .then(responseJson => {
    //             this.setState({
    //                 isLoading: false,
    //                 dataSource: responseJson.movies
    //             })
    //         })
    //         .catch(error => console.error(error))

    // }
    componentDidMount() {
        this.fetchData()

    }

    async fetchData() {
        try {
            let response = await fetch('http://cities.jonkri.se')
            let responseJson = await response.json()
            this.setState({
                    isLoading: false,
                    dataSource: responseJson
                })
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }

    }

    onRefresh() {
        console.log('Refreshing');
        
        this.setState({
            isLoading: true
        }, () => (
            this.fetchData()
        ))
    }
    _onPress(item) {
        console.log('====================================');
        console.log(item.name);
        console.log('====================================');
        this.props.navigation.navigate('Details')


    }
    
    render() {
        if(this.state.isLoading) {
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator />
                </View>
            )
        }

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
                    onRefresh={()=>this.onRefresh()}
                    refreshing={this.state.isLoading}
                    data={this.state.dataSource}
                    renderItem={({item}) => (
                        <Swipeout autoClose right={[
                             { text: 'Edit', type: 'primary'},
                             { text: 'Delete', type: 'delete', onPress: () => console.log('Delete')}
                             ]}
                        > 
                            <TouchableHighlight onPress={() => this._onPress(item)} underlayColor="lightgray">
                            <ListItem 
                                title={item.name}
                                subtitle={<Text style={{color: 'gray'}}>Population: {item.population}</Text>}
                            />
                                {/* <View>
                                    <Text style={{ padding:20, fontSize: 26}}>{item.name}, {item.population} </Text>
                                </View> */}
                            </TouchableHighlight>
                        </Swipeout>
                    )}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        )
    }
}