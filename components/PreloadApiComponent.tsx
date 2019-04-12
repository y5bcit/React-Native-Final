import React from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";

export default class PreloadApiComponent extends React.Component<{ navigation: any }, { data: any }> {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    render() {
        let data = this.props.navigation.getParam("data", {});
        this.setState({ data: data });
        return (
            <FlatList keyExtractor={(i, k) => k.toString()} extraData={this.state} data={this.state.data}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        {
                            /* 
                            * Change code here: 
                            * item.n item.s etc into your api data
                            */
                        }
                        <Text style={{ fontSize: 24 }}>{item.author}</Text>
                        <Text style={{ fontSize: 16 }}>https://picsum.photos/200/300?image={item.id}</Text>
                        <Image style={{ width: 50, height: 50 }} source={{
                            uri: "https://picsum.photos/200/300?image=" + item.id
                        }}></Image>
                    </View>
                )}
            />
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