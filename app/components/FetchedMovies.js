import React from 'react'
import { FlatList, ActivityIndicator, Text, View } from 'react-native'

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
    async componentDidMount() {
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
    render() {
        if(this.state.isLoading) {
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{flex: 1, paddingTop:20, width: '100%'}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text style={{ padding:20, fontSize: 26}}>{item.name}, {item.population} </Text>}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        )
    }
}