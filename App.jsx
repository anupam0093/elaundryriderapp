import { AppRegistry } from "react-native";
import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import Welcome from "./src/Screens/Welcome";
import StackNavigator from "./Components/StackNavigator";
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <NativeBaseProvider>
          <QueryClientProvider client={queryClient}>
              <StackNavigator />
        </QueryClientProvider>
    </NativeBaseProvider>
  );
}

AppRegistry.registerComponent("Welcome", () => Welcome);
