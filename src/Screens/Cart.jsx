import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import CartCard from "../components/ui/CartCard";
import useStore from "../GlobalStore/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Cart = () => {
  const navigation = useNavigation();
  const setCart = useStore((state) => state.setCart);
  const user = useStore((state) => state.user);
  const route = useRoute();
  const customer_details =
    route?.params?.customerDetails || route?.params?.customerInfo;
  const [backendCartItems, setBackendCartItems] = useState([]);

  console.log(route?.params?.customerDetails, "line no 29");

  const getUserCartItems = async () => {
    const cart_url = `https://api.elaundry.co.in/oit-elaundry/api/auth/customer/${customer_details?.storeCustomerId}/cart`;
    try {
      const { data } = await axios.get(cart_url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${user?.accessToken}`,
        },
      });
      console.log("yes yes nehat", data);
      setBackendCartItems(data);
    } catch (error) {
      console.log(error, "error in line 43");
    }
  };

  const deleteItemFromCart = async (cartItemId) => {
    const cart_url = `https://api.elaundry.co.in/oit-elaundry/api/auth/customer/${customer_details?.storeCustomerId}/cart/${cartItemId}`;
    try {
      const { data } = await axios.delete(cart_url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${user?.accessToken}`,
        },
      });
      // console.log('item deleted successfully',  data)
      Alert.alert(data?.message);
      const updatedCart = backendCartItems?.filter(
        (item) => item.id !== cartItemId
      );
      setBackendCartItems(updatedCart);
      setCart(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCartItems();
  }, []);

  const cartTotalAmount = backendCartItems?.reduce(
    (acc, item) => acc + item?.totalPrice,
    0
  );

  let productName = backendCartItems?.reduce(
    (acc, item) => acc + item?.garmentName + `, `,
    ""
  );


  const cartGarmetCount = backendCartItems?.reduce(
    (acc, item) => acc + item?.itemGarmentCount,
    0
  );

  console.log(backendCartItems.length);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#D9D9D9", marginTop: 30 }}
    >
      <StatusBar style="auto" />
      <Header
        leftContent={
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            onPress={() => navigation.goBack()}
          />
        }
        centerContent={
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cart</Text>
        }
        rightContent={<Text></Text>}
      />

      {backendCartItems?.length < 1 && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20%",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: 400 }}>
            No Items In the cart
          </Text>
        </View>
      )}
      {backendCartItems && (
        <View style={{ height: "60%" }}>
          <FlatList
            data={backendCartItems}
            style={{ marginTop: 10 }}
            renderItem={({ item }) => (
              <CartCard item={item} deleteItemFromCart={deleteItemFromCart} />
            )}
            keyExtractor={(item) => item?.id}
          />
        </View>
      )}

      {backendCartItems?.length > 0 && (
        <View style={{ height: "30%", justifyContent: "flex-end" }}>
          <View style={{ marginTop: 20, marginHorizontal: 15, gap: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18 }}>Subtotal:</Text>
              <Text style={{ fontSize: 16 }}>
                {"\u20B9"} {cartTotalAmount}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18, fontWeight: 400 }}>Delivery:</Text>
              <Text style={{ fontSize: 16 }}>Free</Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18, fontWeight: 400 }}>Total:</Text>
              <Text style={{ fontSize: 16 }}>
                {"\u20B9"} {cartTotalAmount}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Checkout", {
                totalAmount: cartTotalAmount,
                customer_details: customer_details,
                cart_details: { totalQuantity: cartGarmetCount },
                productDetails: productName,
              })
            }
            style={{
              backgroundColor: "#003566",
              marginHorizontal: 15,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 20,
              marginTop: 20,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
