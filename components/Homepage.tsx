import React from "react";
import { View, StyleSheet, Dimensions, Text, Button } from "react-native";
import { LinearGradient } from "expo";
import Helper from "../Helper";
const screenHeight = Dimensions.get("window").height
const screenWidth = Dimensions.get("window").width

export default class HomeScreen extends React.Component<{ navigation: any }, {}> {
    static navigationOptions = {
        title: "Home",
        headerStyle: {
            backgroundColor: "#0F0F0F"
        },
        headerTitleStyle: {
            fontWeight: "bold",
            color: "white"
        }
    }
    constructor(props) {
        super(props);
    }

    render() {
        const buttons = ["Maps", "Animatable", "Animated", "Image", "PreloadApi", "Api"].map((value, index, array) => {
            return (<View key={value + "v"}>
                <Button title={value} onPress={(ev) => {
                    if (value === "PreloadApi") {
                        fetch(Helper.picsum).then(response => response.json())
                            .then(result => {
                                // Picsum provide a array so only take first 10
                                result = result.slice(0, 10);
                                this.props.navigation.navigate(value, { data: result })
                            })
                            .catch(error => console.error(error));
                        return;
                    }
                    this.props.navigation.navigate(value);
                }}></Button>
            </View>);
        });
        return <LinearGradient colors={["#000000", "#323232"]} style={StyleSheet.absoluteFill}>
            <View style={styles.container}>
                {buttons}
            </View>
        </LinearGradient>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textView: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },
    buttons: {
        position: "absolute",
        marginLeft: screenWidth * 0.025,
        bottom: 0,
        width: screenWidth * 0.95,
        backgroundColor: "black"
    }
});