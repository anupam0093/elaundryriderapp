import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../src/Screens/Welcome";
import Homepage from "../src/Screens/Homepage";
import Offline from "../src/Screens/Offline";
import Pickup from "../src/Screens/Pickup";
import Category from "../src/Screens/Category";
import Services from "../src/Screens/Service";
import AccountInfo from "../src/Screens/AccountInfo";
import OrderDelevery from "../src/Screens/OrderDelevery";
import NewOrder from "../src/Screens/NewOrder";
import PickupFilter from "../src/Screens/PIckupFilter";
import Notification from "../src/Screens/Notification";
import PickupDate from "../src/Screens/PickupDate";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Offline"
          component={Offline}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pickup"
          component={Pickup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Accountinfo"
          component={AccountInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderDelevery"
          component={OrderDelevery}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewOrder"
          component={NewOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PickupFilter"
          component={PickupFilter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PickupDate"
          component={PickupDate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Services"
          component={Services}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
