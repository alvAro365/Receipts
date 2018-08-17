import React from 'react'
import { FlatList, ActivityIndicator, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import Swipeout from 'react-native-swipeout';
import { ListItem } from 'react-native-elements';

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
           activeRow: null,
        }
    }

    onPress(item) {
        console.log('====================================');
        console.log('onPress:' + item.name);
        console.log('====================================');
        this.props.navigation.navigate('Details', { title: item.name, id: item.id, category: item.category})
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
                    subtitle={<Text style={{color: 'gray'}}>Category: {item.category}</Text>}
                    leftAvatar={{source: require('./img/no_photo.png') }}
                    rightTitle="Today"
                    // rightSubtitle="Today"

                />
                </TouchableHighlight>
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
            </View>
        )
    }
}