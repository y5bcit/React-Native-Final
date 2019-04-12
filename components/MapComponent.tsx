import React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
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
    clickedLa: any,
    clickedLo: any,
    rcx: any,
    rcy: any,
    sz: number,
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
            clickedLa: 49.2865,
            clickedLo: -123.123,
            rcx: 49.2865,
            rcy: -123.123,
            sz: 400,
            locationPermission: "unknown"
        };
        this.regionCache = {
            latitude: 49.2865,
            longitude: -123.123,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
        };
    }

    fetchTodos(location) {
        fetch(Helper.GoogleGeocodeApi("API", location)).then(r => r.json()).then(r => {
            this.setState({
                region: {
                    latitude: r.results[0].geometry.location.lat,
                    latitudeDelta: 0.025,
                    longitude: r.results[0].geometry.location.lng,
                    longitudeDelta: 0.025
                }
            });
        })
    }
    regionCache: any;
    hidemarker: boolean;
    
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
                },
                rcx: position.coords.latitude,
                rcy: position.coords.longitude
            });
        }, (error) => console.log(JSON.stringify(error)));
    }

    render() {
        return (
            <View>
                <View style={{ width: "100%", height: "10%", }}>
                    <View style={{ alignContent: "center", justifyContent: "center", flexDirection: "row" }}>
                        <Button title={"Circle"} onPress={(ev) => {
                            this.setState({
                                rcx: this.state.region.latitude + Math.random() * 0.0075,
                                rcy: this.state.region.longitude + Math.random() * 0.0035,
                                sz: 300 + Math.random() * 200
                            });
                        }}></Button>
                        <Button title={"Add/Remove"} onPress={(ev) => {
                            this.hidemarker = !this.hidemarker;
                            this.setState({});
                        }}></Button></View>
                    <Text style={{ textAlign: "center" }}>{this.state.clickedLa}, {this.state.clickedLo}</Text>
                </View>
                <MapView region={this.state.region} style={{ width: "100%", height: "100%" }}
                    onRegionChange={(e) => this.regionCache = e}
                    onPress={(event) => this.setState({
                        clickedLa: event.nativeEvent.coordinate.latitude,
                        clickedLo: event.nativeEvent.coordinate.longitude,
                        region: this.regionCache
                    })}>
                    <Marker style={{ opacity: this.hidemarker ? 0 : 1 }} coordinate={this.state.region} />
                    <Circle center={{ longitude: this.state.rcy, latitude: this.state.rcx }} radius={this.state.sz} />
                </MapView>
            </View>
        )
    }
}