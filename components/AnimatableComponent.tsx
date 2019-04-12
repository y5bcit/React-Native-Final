import React from "react";
import { Text, View, Button } from "react-native";
import * as Animatable from "react-native-animatable"

export default class AnimatableComponent extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    text: any;
    handleTextRef = ref => this.text = ref;

    render() {
        return (
            <Animatable.View>
                <Button title={"ButtonTitleText"} onPress={(ev) => {
                    console.log("Pressed.");
                    this.text.transition({ top: 0 }, { top: 200 }, 5000, "linear");
                }}></Button>
                <Animatable.Text ref={this.handleTextRef}>Moving down when clicked</Animatable.Text>
            </Animatable.View>
        )
    }
}