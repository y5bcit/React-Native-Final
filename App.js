import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './components/hompage'
import MapComponent from './components/MapComponent'
import DummyComponent from './components/DummyComponent'

const RootStack = createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    Maps: {
      screen: MapComponent
    },
    Gallery: {
      screen: DummyComponent
    },
    Animation: {
      screen: DummyComponent
    }
  },
  {
    initialRouteName: "Home"
  }
);

const App = createAppContainer(RootStack);

export default App;
