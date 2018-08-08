import React from 'react'
import { Alert,
     StyleSheet,
     Button, 
     Text,
     Platform,
     TouchableHighlight, 
     TouchableOpacity, 
     TouchableNativeFeedback, 
     TouchableWithoutFeedback, 
     View } from 'react-native'

export class Touchables extends React.Component {
    _onPressButton() {
        Alert.alert('You pressed the button')
    }

    _onLongPressButton() {
        Alert.alert('You long pressed the button')
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>TouchableHighlight</Text>
                    </View>
                </TouchableHighlight>
                <TouchableOpacity onPress={this._onPressButton}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>TouchableOpacity</Text>
                    </View>
                </TouchableOpacity>
                <TouchableNativeFeedback 
                    onPress={this._onPressButton}
                    background={Platform.OS === 'android' ? 
                    TouchableNativeFeedback.SelectableBackground() : ''}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableWithoutFeedback
                    onPress={this._onPressButton}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Touchable with long press</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center'
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    },

})