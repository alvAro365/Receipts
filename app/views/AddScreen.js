import React, { Component } from 'react';
import { Button, Text, View, CameraRoll, ScrollView, Image } from 'react-native';
import { Input } from 'react-native-elements';
import uuidv4 from 'uuid/v4';

class AddScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addMode: false,
            id: null,
            category: null,
            editMode: false,
            name: null,
            photos: null,
            isLoading: true
        }
    }

    componentDidMount() {
        this.loadImages()
        const item = this.props.navigation.getParam('item')
        const mode = this.props.navigation.getParam('mode')
        const refresh = this.props.navigation.getParam('refresh')
        const editMode = this.state.editMode

        // console.log('====================================');
        // console.log(`Add screen ${item.name}: ${item.category}, Mode: ${mode}, Id: ${item.id}, Refresh: ${refresh}`);
        // console.log('====================================');

        if (item !== 'undefined' && mode === 'update') {
            this.setState({
                name: item.name,
                category: item.category,
                id: item.id,
                editMode: !this.state.editMode
            }, console.log(this.state))
        } else {
            this.setState({
                addMode: !this.state.addMode,
                id: uuidv4()
            })
        }
    }

    loadImages = () => {
        CameraRoll.getPhotos({
            first: 1,
            assetType: 'Photos'
        })
        .then(response => {
            this.setState({ photos: response.edges, isLoading: false })
        })
        .catch( err => {
            console.log('====================================');
            console.log(`Error loading images ${err}`);
            console.log('====================================');
        })
    }

    post() {
        const { name, category, id } = this.state
        // console.log(name, category, id)

        fetch('http://localhost:3000/receipts', {
            body: JSON.stringify({category, id, name, date: new Date() }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then( response => response.json())
        .then( result => {
            // console.log('====================================');
            // console.log('Post result:  ' + result);
            // console.log('====================================');
            const refresh = this.props.navigation.getParam('refresh')
            refresh()

        })
        .catch(error => console.log(error))
    }

    update() {
        console.log(`State before update: ${this.state}`)
        const { name, category, id } = this.state
        fetch(`http://localhost:3000/receipts/update/${this.state.id}`, {
            body: JSON.stringify({ category, id, name, date: new Date() }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
        .then( response => response.json())
        .then( result => {
            const refresh = this.props.navigation.getParam('refresh')
            console.log(typeof(refresh))
            refresh()
        })
        .catch(error => console.log(error))

    }

    render() {
        const item = this.props.navigation.getParam('item')
        const mode = this.props.navigation.getParam('mode')
        let isDisabled;

        if (this.state.addMode) {
            isDisabled = (this.state.name && this.state.category ) ? false : true
        }
        else if (this.state.editMode) {
            isDisabled = ((this.state.name === item.name) && (this.state.category === item.category )) ? true : false
        }
        return (
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            { !this.state.isLoading &&
                 this.state.photos.map(((photo, index) => {
                    return (
                        <Image  
                            key={index}
                            style={{
                                width: 300,
                                height: 200
                            }}
                            source={{ uri: photo.node.image.uri }}
                        />
                    )
                }))
            }
            {/* <Text style={{ fontSize: 30}}>This is a modal!</Text> */}
            <Input
                value={this.state.name}
                placeholder='NAME'
                onChangeText={input => this.setState({ name: input}) }

            />
            <Input 
                value={this.state.category}
                placeholder='CATEGORY'
                onChangeText={ input => this.setState({ category: input }) }
            />
            <Button 
                onPress={() => {
                    console.log(this.state)
                    this.state.addMode ? this.post() : this.update()
                    this.props.navigation.navigate('Cities')
                    }}
                // disabled={ (this.state.name && this.state.population ) ? false : true }
                disabled={isDisabled}
                title= { this.state.editMode ? 'Update' : 'Add' }
            />
            <Button 
                onPress={() => this.props.navigation.goBack()}
                title="Cancel"
            />
           </View> 
        );
    }
}

export default AddScreen;