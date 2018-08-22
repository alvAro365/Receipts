import React, { Component } from 'react'
import { Button, Text, View, CameraRoll, ScrollView, Image } from 'react-native'
import CameraRollPicker from 'react-native-camera-roll-picker'
import { Input, Avatar } from 'react-native-elements'
import uuidv4 from 'uuid/v4'

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
            isLoading: true,
            image: undefined,
            uri: undefined
        }
    }

    componentDidMount() {
        const { selectedRowItem, mode, refresh } = this.props.navigation.state.params
        // const selectedRowItem = this.props.navigation.getParam('selectedRowItem')
        // const refresh = this.props.navigation.getParam('refresh')
        // const mode = this.props.navigation.getParam('mode')
        const editMode = this.state.editMode

        console.log('====================================');
        console.log(`Add screen ${selectedRowItem}: ${selectedRowItem}, Mode: ${mode}, Id: ${selectedRowItem}`);
        console.log('====================================');

        if (selectedRowItem !== 'undefined' && mode === 'update') {
            this.setState({
                name: selectedRowItem.name,
                category: selectedRowItem.category,
                id: selectedRowItem.id,
                editMode: !this.state.editMode,
                uri: selectedRowItem.imageUri
            })
        } else {
            this.setState({
                addMode: !this.state.addMode,
                id: uuidv4()
            })
        }
    }

    post(imageUri) {
        const { name, category, id } = this.state

        fetch('http://localhost:3000/receipts', {
            body: JSON.stringify({category, id, name, date: new Date(), imageUri }),
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

    update(uri) {
        console.log(`State before update: ${this.state.uri}`)
        const { name, category, id } = this.state
        fetch(`http://localhost:3000/receipts/update/${this.state.id}`, {
            body: JSON.stringify({ category, id, imageUri: uri, name, date: new Date() }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
        .then( response => response.json())
        .then( result => {
            const refresh = this.props.navigation.getParam('refresh')
            refresh()
        })
        .catch(error => console.log(error))
    }

    render() {
        const selectedRowItem = this.props.navigation.getParam('selectedRowItem')
        let image = this.props.navigation.getParam('currentImage')
        let imageUri
        let isDisabled


        if (this.state.addMode) {
            if(image) {
                imageUri = image.uri
            }
            isDisabled = (this.state.name && this.state.category && image ) ? false : true
        }
        else if (this.state.editMode) {
            if ( image ) {
                imageUri = image.uri
                isDisabled = ((this.state.name === selectedRowItem.name) && (this.state.category === selectedRowItem.category && this.state.uri === image.uri)) ? true : false

            } else {
                imageUri = this.state.uri
                isDisabled = ((this.state.name === selectedRowItem.name) && (this.state.category === selectedRowItem.category )) ? true : false
            }
        }
        return (
           <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
            { image &&  <Avatar 
                size="xlarge"
                source={{uri: imageUri}}
                onPress={() => this.props.navigation.navigate('CameraRollPicker', { setImage: this.setImage})}
                activeOpacity={0.7}
            />}
            {(!image && !this.state.uri) && <Avatar 
                size="xlarge"
                icon={{name: 'image'}}
                onPress={() => this.props.navigation.navigate('CameraRollPicker', { setImage: this.setImage})}
                activeOpacity={0.7}
            />}
            {(!image && this.state.uri) && <Avatar 
                size="xlarge"
                source={{uri: this.state.uri}}
                onPress={() => this.props.navigation.navigate('CameraRollPicker', { setImage: this.setImage})}
                activeOpacity={0.7}
            />}
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
                    // console.log(this.state)
                    this.state.addMode ? this.post(imageUri) : this.update(imageUri)
                    this.props.navigation.navigate('Cities')
                    }}
                disabled={isDisabled}
                title= { this.state.editMode ? 'Update' : 'Add' }
            />
            <Button 
                onPress={() => this.props.navigation.navigate('Home')}
                title="Cancel"
            />
           </View> 
        );
    }
}

export default AddScreen;