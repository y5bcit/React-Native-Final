import React from "react";
import { Text, Image, Button, Animated, Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height

export default class AnimatedComponent extends React.Component<{}, { timer: Animated.Value }> {
    constructor(props) {
        super(props);
        this.state = {
            timer: new Animated.Value(0)
        };
    }

    componentDidMount() {
        Animated.timing(this.state.timer, {
            toValue: screenHeight,
            duration: 30000,
        }).start(() => {
            this.setState({
                timer: new Animated.Value(0)
            });
            this.componentDidMount();
        });
    }

    render() {
        return (
            <Animated.View style={{ top: this.state.timer }}>
                <Image style={{ width: 92, height: 30 }} source={{ uri: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" }}></Image>
            </Animated.View>
        )
    }
}