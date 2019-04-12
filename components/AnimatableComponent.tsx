import React from "react";
import { Dimensions, Text, View, Button } from "react-native";
import * as Animatable from "react-native-animatable"

const screenHeight = Dimensions.get("window").height
const screenWidth = Dimensions.get("window").width

export default class AnimatableComponent extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    text: any;
    handleTextRef = ref => this.text = ref;

    render() {
        return (
            <View>
                <View>
                    <Button title={"ButtonTitleText"} onPress={(ev) => {
                        console.log("Pressed.");
                        this.text.transition({ top: 0 }, { top: 200 }, 5000, "linear");
                    }}></Button>
                    <Animatable.Text ref={this.handleTextRef}>Moving down when clicked</Animatable.Text>
                </View>
                <View>
                    <Animatable.Text animation={{
                        from: { rotate: '0deg' },
                        to: { rotate: '360deg' },
                    }} duration={10000} iterationCount={"infinite"}>Infinite rotation</Animatable.Text>
                </View>
                <View>
                    <Animatable.Text animation={{
                        from: { translateY: 0 },
                        to: { translateY: screenHeight * 0.8 },
                    }} duration={10000} easing={"ease-in-cubic"}>Accelerated falling</Animatable.Text>
                </View>
            </View>
        )
    }
}