import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import uuidv1 from 'uuid/v1';

class InfoScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            population: null,
            editMode: false,
            addMode: false
        }
    }

    componentDidMount() {

        const item = this.props.navigation.getParam('item')
        const mode = this.props.navigation.getParam('mode')

        // console.log(item, mode)
        console.log('====================================');
        console.log(`Info screen ${item.name}: ${item.population}, Mode: ${mode}`);
        console.log('====================================');

        if (item !== 'undefined' && mode === 'update') {
            this.setState({
                name: item.name,
                population: item.population.toString(),
                editMode: !this.state.editMode
            })
        } else {
            this.setState({
                addMode: !this.state.addMode
            })
        }
    }

    postCity() {
        fetch('http://cities.jonkri.se/', {
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then( response => response.json())
        .then( result => {
            console.log('====================================');
            console.log(result);
            console.log('====================================');
            const refresh = this.props.navigation.getParam('refresh')
            refresh()

        })
    }

    render() {
        const item = this.props.navigation.getParam('item')
        const mode = this.props.navigation.getParam('mode')
        let isDisabled;

        if (this.state.addMode) {
            isDisabled = (this.state.name && this.state.population ) ? false : true
        }
        else if (this.state.editMode) {
            isDisabled = ((this.state.name === item.name) && (this.state.population === item.population.toString())) ? true : false
        }
        return (
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text style={{ fontSize: 30}}>This is a modal!</Text> */}
            <Input
                value={this.state.name}
                placeholder='CITY'
                onChangeText={input => this.setState({ name: input}) }

            />
            <Input 
                value={this.state.population}
                placeholder='POPULATION'
                onChangeText={ input => this.setState({ population: input }) }
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

export default InfoScreen;