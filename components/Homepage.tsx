import React from 'react';
import { View, StyleSheet, Dimensions, Text, Button } from 'react-native';
import { LinearGradient } from 'expo';
import * as Animatable from 'react-native-animatable'
import Consts from '../Consts';
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default class HomeScreen extends React.Component<{ navigation: any }, {}> {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#0F0F0F'
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
        }
    }
    constructor(props) {
        super(props);
    }

    render() {
        const buttons = ['Maps', 'Animation', 'Image', "Api", "PreloadApi"].map((value, index, array) => {
            return (<Animatable.View key={value + "v"} delay={2000} animation="fadeIn" duration={3000}>
                <Button title={value} onPress={(ev) => {
                    if (value === "PreloadApi") {
                        fetch(Consts.apiPath).then(response => response.json())
                            .then(data => this.props.navigation.navigate(value, { data }))
                            .catch(error => console.error(error));
                        return;
                    }
                    this.props.navigation.navigate(value);
                }}></Button>
            </Animatable.View>);
        });
        return <LinearGradient colors={["#000000", "#323232"]} style={StyleSheet.absoluteFill}>
            <View style={styles.container}>
                <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>React-Native</Text>
                <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>Final</Text>
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
        position: 'absolute',
        marginLeft: screenWidth * 0.025,
        bottom: 0,
        width: screenWidth * 0.95,
        backgroundColor: "black"
    }
});