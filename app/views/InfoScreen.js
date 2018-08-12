import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import uuidv1 from 'uuid/v1';

class InfoScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // id: null,
            name: null,
            population: null,
        }
    }

    componentDidMount() {

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
            this.props.navigation.state.params.setCities()
           
            console.log('====================================');
            console.log(result);
            console.log('====================================');
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
                    
                    this.props.navigation.navigate('Cities', {
                        datasource: this.state.cities
                    })
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