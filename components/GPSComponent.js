import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import Permissions from 'react-native-permissions';

export default class GPSComponent extends Component {

    static navigationOptions = {
        title: 'Maps'
    }

    constructor() {
        super();
        this.state = {
            locationPermission: "unknown",
            position: "unknown"
        }
    }

    _requestPermissions() {
        Permissions.request('location')
            .then(response => {
                this.setState({
                    locationPermission: response
                })
                console.log("Response: " + response);
            });
    }

    componentDidMount() {
        console.log('Start');
        this._requestPermissions();
        console.log('Check position');
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            console.log('My position: ' + position.coords.latitude + ', ' + position.coords.longitude);
            let coordinates = position.coords.latitude + ', ' + position.coords.longitude;
            this.setState({
                position: coordinates
            })
        },
            (error) => alert(JSON.stringify(error)));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>POSITION:</Text>
                <Text style={styles.paragraph}>{this.state.position}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
    },
    paragraph: {
        margin: 6,
        fontSize: 18,
        textAlign: 'center'
    }
});