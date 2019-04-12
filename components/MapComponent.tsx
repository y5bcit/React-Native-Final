import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
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
                latitude: 47.6062,
                longitude: 122.3321,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
            },
            locationPermission: "unknown"
        };
    }

    componentDidMount() {
        console.log("Start");
        Permissions.request("location").then(response => {
            this.setState({
                locationPermission: response
            })
            console.log("Response: " + response);
        });
        console.log("Check position");
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    latitudeDelta: 0.025,
                    longitude: position.coords.longitude,
                    longitudeDelta: 0.025
                }
            });
        }, (error) => console.log(JSON.stringify(error)));
    }

    render() {
        return (
            <MapView region={this.state.region} style={{ width: "100%", height: "100%" }}>
                <Marker coordinate={this.state.region} />
                <Circle center={this.state.region} radius={500} />
            </MapView>
        )
    }
}