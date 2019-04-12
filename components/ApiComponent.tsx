import React from "react";
import { Text, View, StyleSheet, FlatList, Image, TextInput } from "react-native";
import Helper from "../Helper";

export default class ApiComponent extends React.Component<{}, { data: any }> {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    /*componentDidMount() {
        fetch(Helper.picsum).then(response => response.json())
            .then(result => {
                result = result.slice(10, 20);
                this.setState({
                    data: result
                });
            }).catch(error => console.error(error));
    }*/

    render() {
        return (<View style={{ width: "100%", height: "100%" }}>
            <View style={{ width: "100%", height: "10%" }}>
                <TextInput style={{                    height: "100%",                    width: "100%",                    borderColor: "gray",                    borderWidth: 1,                    textAlign: "center"                }} placeholder="Mars? Moon?" onSubmitEditing={(event) =>
                    fetch("https://images-api.nasa.gov/search?q=" + encodeURIComponent(event.nativeEvent.text)).then(response => response.json())
                        .then(result => {
                            this.setState({
                                data: result.collection.items
                            });
                        }).catch(error => console.error(error))}
                />
            </View>
            <FlatList keyExtractor={(i, k) => k.toString()} extraData={this.state} data={this.state.data}
                ListEmptyComponent={() => {
                    return (<View style={{ width: "100%" }}><Text style={{ textAlign: "center" }}>Go and type in something to search!</Text></View>)
                }}
                renderItem={({ item }) => {
                    if (item === undefined || item.links === undefined)
                        return (<View></View>);
                    return (
                        <View style={styles.item}>
                        {
                            /*
                            * Change code here:
                            * item.n item.s etc into your api data
                            */
                        }
                            <Text style={{ fontSize: 16, textAlign: "center", fontWeight: "bold" }}>{item.data[0].title}</Text>
                            <Image style={{ width: 175, height: 175 }} source={{
                                uri: item.links[0].href
                            }}></Image>
                        </View>
                    )
                }}
            /></View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        padding: 3,
        margin: 10,
        marginHorizontal: 60
    },
    placeholder: {
        margin: 6,
        fontSize: 18,
        textAlign: "center"
    }
});