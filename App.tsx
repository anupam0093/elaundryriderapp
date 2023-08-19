import { AppRegistry } from "react-native";
import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import Welcome from "./src/Screens/Welcome";
import StackNavigator from "./Components/StackNavigator";



export default function App() {
  return (
    <NativeBaseProvider>
      <StackNavigator />
    </NativeBaseProvider>
  );
}

AppRegistry.registerComponent("Welcome", () => Welcome);
