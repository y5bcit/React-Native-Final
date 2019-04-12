import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import Permissions from "react-native-permissions";
import Helper from "../Helper";

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

    fetchTodos(location) {
        let result = Helper.GoogleGeocodeApi("api", location);
        this.setState({
            region: {
                latitude: result[0].geometry.location.lat,
                latitudeDelta: 0.025,
                longitude: result[0].geometry.location.lng,
                longitudeDelta: 0.025
            }
        });
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
            <View>
                <View style={{ width: "100%", height: "10%" }}>
                    <TextInput style={{
                        height: '100%',
                        width: '100%',
                        borderColor: 'gray',
                        borderWidth: 1,
                        textAlign: 'center'
                    }}
                        placeholder="Enter a Destination"
                        onSubmitEditing={(event) => this.fetchTodos(event.nativeEvent.text)}
                    />
                </View>
                <MapView region={this.state.region} style={{ width: "100%", height: "100%" }}>
                    <Marker coordinate={this.state.region} />
                    <Circle center={this.state.region} radius={500} />
                </MapView>
            </View>
        )
    }
}