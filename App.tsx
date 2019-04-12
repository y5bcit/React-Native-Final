import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './components/Homepage'
import MapComponent from './components/MapComponent'
import DummyComponent from './components/DummyComponent'
import ApiComponent from './components/ApiComponent';
import PreloadApiComponent from './components/PreloadApiComponent';

const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Maps: {
        screen: MapComponent
    },
    Image: {
        screen: DummyComponent
    },
    Animation: {
        screen: DummyComponent
    },
    Api: {
        screen: ApiComponent
    },
    PreloadApi: {
        screen: PreloadApiComponent
    }
},
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    public render() {
        return <AppContainer />;
    }
}