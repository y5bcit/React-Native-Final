import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Permissions from "react-native-permissions";

interface MapState {
    region: {
        latitude: number;
        latitudeDelta: number;
        longitude: number;
        longitudeDelta: number;
    },
    locationPermission: string
}

export default class MapComponent extends React.Component<{}, MapState> {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 0,
                latitudeDelta: 0,
                longitude: 0,
                longitudeDelta: 0
            },
            locationPermission: "unknown"
        };
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
            this.setState({
              region: {
                latitude: position.coords.latitude,
                latitudeDelta: 0.025,
                longitude: position.coords.longitude,
                longitudeDelta: 0.025
              }
            });
        },
            (error) => alert(JSON.stringify(error)));
    }

    render() {
        return (
            <MapView 
            region={this.state.region}
            style={styles.map}>
            
            <Marker coordinate={this.state.region}/>
            <Circle center={this.state.region} radius={500} />

            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    }
})