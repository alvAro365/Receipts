import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import uuidv4 from 'uuid/v4';

class AddScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addMode: false,
            id: null,
            category: null,
            date: null,
            editMode: false,
            name: null,
        }
    }

    componentDidMount() {

        const item = this.props.navigation.getParam('item')
        const mode = this.props.navigation.getParam('mode')

        console.log('====================================');
        console.log(`Info screen ${item.name}: ${item.category}, Mode: ${mode}`);
        console.log('====================================');

        if (item !== 'undefined' && mode === 'update') {
            this.setState({
                name: item.name,
                category: item.category,
                editMode: !this.state.editMode
            })
        } else {
            this.setState({
                addMode: !this.state.addMode
            })
        }
    }

    postCity() {
        const { name, category, id } = this.state
        console.log(name, category, id)

        fetch('http://localhost:3000/receipts', {
            body: JSON.stringify({category, id, name, date: new Date() }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then( response => response.json())
        .then( result => {
            console.log('====================================');
            console.log('Post result:  ' + result);
            console.log('====================================');
            const refresh = this.props.navigation.getParam('refresh')
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
            {/* <Text style={{ fontSize: 30}}>This is a modal!</Text> */}
            <Input
                value={this.state.name}
                placeholder='NAME'
                onChangeText={input => this.setState({ name: input}) }

            />
            <Input 
                value={this.state.population}
                placeholder='CATEGORY'
                onChangeText={ input => this.setState({ category: input, id: uuidv4() }) }
            />
            <Button 
                onPress={() => {
                    console.log(this.state)
                    this.postCity()
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