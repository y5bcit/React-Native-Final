import React from "react";
import { Text, Image, Button, Animated, Dimensions } from "react-native";
import ApiComponent from "./ApiComponent";
const screenHeight = Dimensions.get("window").height

export default class AnimatedComponent extends React.Component<{}, { timer: Animated.Value }> {
    constructor(props) {
        super(props);
        this.state = {
            timer: new Animated.Value(0)
        };
    }

    componentDidMount() {
        Animated.loop(Animated.sequence([
            Animated.timing(this.state.timer, {
                toValue: screenHeight,
                duration: 10000,
            }), Animated.timing(this.state.timer, {
                toValue: 0,
                duration: 1,
            })]), {
                iterations: 3 // -1 for infinite
            }).start();
    }

    render() {
        return (
            <Animated.View style={{
                top: this.state.timer,
                transform: [{
                    rotateY: this.state.timer.interpolate({
                        inputRange: [0, screenHeight],
                        outputRange: ["0deg", "360deg"]
                    })
                }]
            }}>
                <Image style={{ width: 92, height: 30 }} source={{ uri: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" }}></Image>
            </Animated.View>
        )
    }
}