// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import CartIcon from '../Components/CartIcon';
// import CartScreen from '../Components/CartScreen';
// import Category from '../src/Screens/Category';
// import { CartProvider } from '../src/Context/CartContext';

// const Tab = createBottomTabNavigator();

// const AppNavigator: React.FC = () => {
//   return (
//     <CartProvider>
//       <NavigationContainer>
//         <Tab.Navigator>
//           <Tab.Screen
//             name="Home"
//             component={Category}
//             options={({ navigation }:any) => ({
//               tabBarIcon: () => <CartIcon navigation={navigation} />,
//             })}
//           />
//           <Tab.Screen name="CartScreen" component={CartScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </CartProvider>
//   );
// };

// export default AppNavigator;
