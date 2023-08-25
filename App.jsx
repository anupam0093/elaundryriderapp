import { AppRegistry } from "react-native";
import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import Welcome from "./src/Screens/Welcome";
import StackNavigator from "./Components/StackNavigator";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()
export default function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <StackNavigator />
        </NativeBaseProvider>
    </QueryClientProvider>
    </>
  );
}

AppRegistry.registerComponent("Welcome", () => Welcome);
