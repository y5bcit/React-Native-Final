import React from "react";
import { Text, Image, Button, Animated, Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height

export default class AnimatedComponent extends React.Component<{}, { timer: Animated.Value, willUnmount: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            timer: new Animated.Value(0),
            willUnmount: false
        };
    }

    componentDidMount() {
        Animated.timing(this.state.timer, {
            toValue: screenHeight,
            duration: 10000,
        // If you don't want infinite loop, comment following code and change it to
        // }).start();
        }).start(() => {
            if (this.state.willUnmount) {
                return;
            }
            this.setState({
                timer: new Animated.Value(0)
            });
            this.componentDidMount();
        });
    }

    componentWillUnmount() {
        this.setState({ willUnmount: true });
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