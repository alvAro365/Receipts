import React, { Component } from 'react'
import { Button, View } from 'react-native'
import { Input, Avatar } from 'react-native-elements'
import uuidv4 from 'uuid/v4'

class AddScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addMode: false,
            category: null,
            editMode: false,
            id: null,
            isButtonDisabled: true,
            name: null,
            uri: undefined,
            previousUri: undefined,

        }
    }

    componentDidMount() {
        const { selectedRowItem, mode } = this.props.navigation.state.params
        // console.log('====================================');
        // console.log(`Add screen ${selectedRowItem}: ${selectedRowItem}, Mode: ${mode}, Id: ${selectedRowItem}`);
        // console.log('====================================');

        if (selectedRowItem !== 'undefined' && mode === 'update') {
            this.setState({
                name: selectedRowItem.name,
                category: selectedRowItem.category,
                id: selectedRowItem.id,
                editMode: !this.state.editMode,
                uri: selectedRowItem.imageUri,
                previousUri: undefined
            })
        } else {
            this.setState({
                addMode: !this.state.addMode,
                id: uuidv4()
            })
        }
    }

    setAddUpdateVisibility() {
        if (this.state.name && this.state.category && this.state.uri) {
            this.setState({
                isButtonDisabled: false
            })
        }
    }

    setSelectedImage = (selectedUri) => {
        this.setAddUpdateVisibility()
        this.setState( prevState => ({
            uri: selectedUri,
            previousUri: prevState.uri,
            isButtonDisabled: false
        }))
    }

    post() {
        const { name, category, id, uri } = this.state

        fetch('http://localhost:3000/receipts', {
            body: JSON.stringify({category, id, name, date: new Date(), imageUri: uri }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then( response => response.json())
        .then( result => {
            this.props.navigation.getParam('refresh')()

        })
        .catch(error => console.log(error))
    }

    update() {
        const { name, category, id, uri } = this.state
        fetch(`http://localhost:3000/receipts/update/${this.state.id}`, {
            body: JSON.stringify({ category, id, imageUri: uri, name, date: new Date() }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
        .then( response => response.json())
        .then( result => {
            this.props.navigation.getParam('refresh')()
        })
        .catch(error => console.log(error))
    }

    render() {

        return (
           <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
            { this.state.uri &&  <Avatar 
                size="xlarge"
                source={{uri: this.state.uri}}
                onPress={() => this.props.navigation.navigate('CameraRollPicker', { setImage: this.setSelectedImage})}
                activeOpacity={0.7}
            />}
            { !this.state.uri && <Avatar 
                size="xlarge"
                icon={{name: 'image'}}
                onPress={() => this.props.navigation.navigate('CameraRollPicker', { setImage: this.setSelectedImage})}
                activeOpacity={0.7}
            />}
            <Input
                value={this.state.name}
                placeholder='NAME'
                onChangeText={input => this.setState({ name: input, isButtonDisabled: false }) }

            />
            <Input 
                value={this.state.category}
                placeholder='CATEGORY'
                onChangeText={ input => this.setState({ category: input, isButtonDisabled: false }) }
            />
            <Button 
                onPress={() => {
                    this.state.addMode ? this.post() : this.update()
                    this.props.navigation.navigate('Cities')
                    }}
                disabled={ this.state.isButtonDisabled }
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