import React from "react";
import { View, Text, Image, Button, Animated, Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height

export default class AnimatedComponent extends React.Component<{}, { timer: Animated.Value, timer2: Animated.Value, timer3: Animated.Value }> {
    constructor(props) {
        super(props);
        this.state = {
            timer: new Animated.Value(0),
            timer2: new Animated.Value(0),
            timer3: new Animated.Value(1)
        };
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(this.state.timer, {
                toValue: 1,
                duration: 3000,
            }), Animated.timing(this.state.timer, {
                toValue: screenHeight,
                duration: 3000,
            }), Animated.timing(this.state.timer, {
                toValue: screenHeight / 3,
                duration: 1,
            }), Animated.timing(this.state.timer2, {
                toValue: 360,
                duration: 3000,
            }), Animated.timing(this.state.timer2, {
                toValue: 0,
                duration: 1,
            }), Animated.timing(this.state.timer3, {
                toValue: 0,
                duration: 3000,
            })]).start();
    }

    render() {
        return (
            <View>
                <Animated.View style={{
                    top: this.state.timer,
                    left: 135,
                    transform: [{
                        rotateZ: this.state.timer2.interpolate({
                            inputRange: [0, 360],
                            outputRange: ["0deg", "360deg"]
                        })
                    }, {
                        scale: this.state.timer2.interpolate({
                            inputRange: [0, 360],
                            outputRange: [1, 2]
                        })
                    }, {
                        rotateX: this.state.timer.interpolate({
                            inputRange: [0, screenHeight],
                            outputRange: ["0deg", "360deg"]
                        })
                    }],
                    opacity: this.state.timer3
                }}>
                    <Image style={{ width: 92, height: 30 }} source={require("../assets/big_justice.png")}></Image>
                </Animated.View>
            </View>
        )
    }
}