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
        return (
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text style={{ fontSize: 30}}>This is a modal!</Text> */}
            <Input 
                placeholder='CITY'
                onChangeText={input => this.setState({ name: input}) }

            />
            <Input 
                placeholder='POPULATION'
                onChangeText={ input => this.setState({ population: input }) }
            />
            <Button 
                onPress={() => {
                    console.log(this.state)
                    this.postCity()
                    this.props.navigation.navigate('Cities')

                    }}
                disabled={ (this.state.name && this.state.population) ? false : true }
                title="Add"
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