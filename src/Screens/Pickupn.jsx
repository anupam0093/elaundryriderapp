import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,

  Dimensions,
} from "react-native";
import React, { useState,useEffect } from "react";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import Octicons from "@expo/vector-icons/build/Octicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import useStore from "../GlobalStore/store";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import PickupCards from "../components/ui/PickupCards";
import { Linking, Platform } from "react-native";
import axios from "axios";
import { API_URL } from "../../networkAPI/env";



const Pickupn = () => {
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const route = useRoute();
  const user = useStore((state) => state.user);
  const [balanceAmount, setBalanceAccount] = React.useState([]);


  
  const walletBalance = async () => {
    const token = `${user?.accessToken}`;
    try {
      const { data } = await axios({
        method: "GET",
        url: `${API_URL}/auth/customer/store-customer/${route?.params?.OrderDetails?.storeCustomerId}`,

        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic" + " " + token,
        },
      });
      setBalanceAccount(data)
     
    } catch (error) {
      console.log({ error }, "error in line 122");
    }
  };

  useEffect(() => {
    walletBalance();
  }, []);


  console.log(balanceAmount[0]?.customer?.address)





  //========================== Calling API ======================================================================
  const callPhoneNumber = async (number) => {
    const phoneNumber = `${
      Platform.OS !== "android" ? "telprompt" : "tel"
    }:${number}`;

    try {
      const supported = await Linking.canOpenURL(phoneNumber);

      if (supported) Linking.openURL(phoneNumber);
    } catch (error) {
      console.log(error);
    }
  };

  //======================== Open Map ==============================

  const openMap = async (address, city, zipCode) => {
    const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`);
    const provider = Platform.OS === "ios" ? "apple" : "google";
    const link = `http://maps.${provider}.com/?destination=${destination}`;

    try {
      const supported = await Linking.canOpenURL(link);

      if (supported) Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("nehat route", route.params);


  return (
    <SafeAreaView>
      <View style={{ width: "100%", backgroundColor: "#F3F1F6" }}>
        <View
          style={{
            marginLeft: 5,
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Homepage");
            }}
          >
            <AntDesign
              name="left"
              size={30}
              color="#5D7EFC"
              style={{ marginTop: 25, marginLeft: 10 }}
            />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#FFFCFC",
              width: 242,
              height: 34,
              marginTop: 25,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ marginTop: 6, marginLeft: 9.5 }}>
              <Octicons name="search" size={20} color="black" />
            </View>
            <View style={{ height: 23, width: 90 }}>
              <TextInput
                style={[styles.input]}
                placeholder="Search Here"
              ></TextInput>
            </View>
          </View>

          <Image
            alt="ios-bars"
            source={require("../../assets/Photos/bar.png")}
            style={{ marginTop: 32, marginRight: 20, height: 22, width: 22 }}
          />
        </View>

        {/* {isLoading &&  (
          <ActivityIndicator
            size="large"
            color="blue"
            style={{ marginTop: 20 }}
          />
        )} */}

        {balanceAmount && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              top: 10,
              right: 5,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Category", {
                  customerDetails: route.params.OrderDetails,
                });
              }}
            >
              <View style={[styles.Viewcard, { width: windowWidth * 0.9 }]}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      color: "#6200ED",
                      marginTop: 15,
                      marginLeft: 10,
                    }}
                  >
                    {route?.params?.OrderDetails?.name}{" "}
                    {route?.params?.OrderDetails?.lastName}
                  </Text>

                  <TouchableOpacity
                    onPress={() => callPhoneNumber(balanceAmount[0]?.customer?.mobileNo)}
                  >
                    <View
                      style={{
                        width: 110,
                        flexDirection: "row",
                        justifyContent: "center",
                        height: 38,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        backgroundColor: "#6200ED",
                        marginHorizontal: 15,
                        marginTop: 10,
                        borderRadius: 10,
                      }}
                    >
                      <Feather
                        name="phone-call"
                        size={14}
                        color="white"
                        style={{ top: 2, right: 4 }}
                      />

                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: "center",
                          color: "white",
                          fontWeight: "bold",
                          left: 5,
                        }}
                      >
                        {balanceAmount[0]?.customer?.mobileNo}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    padding: 10,
                  }}
                >
                  <View style={{ width: "auto", backgroundColor: "#FFFCFC" }}>
                    <Text
                      style={{
                        fontSize: 13,
                        justifyContent: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {/* 02-07-2023 */}
                      <AntDesign name="calendar" size={15} color="black" />{" "}
                      {moment(Date.now()).format("DD-MM-YYYY")}
                    </Text>
                  </View>
                  <View style={{ width: "auto", backgroundColor: "#FFFCFC" }}>
                    <Text
                      style={{
                        fontSize: 13,
                        justifyContent: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      <AntDesign name="clockcircleo" size={15} color="black" />{" "}
                      09 AM To 10:00 PM
                    </Text>
                  </View>
                </View>

                <View style={{ width: "100%", height: 37, marginLeft: 10 }}>
                  <View>
                    <AntDesign
                      name="arrowright"
                      size={14}
                      color="#6200ED"
                      style={{ top: 18, left: 40 }}
                    />
                  </View>

                  <Text
                    style={{
                      color: "#6200ED",
                      textAlign: "center",
                      fontSize: 17,
                      fontWeight: "500",
                    }}
                  >
                    Request Received by Rider
                  </Text>
                </View>

                <View style={{ width: "100%", height: 60, padding: 7 }}>
                  <TouchableOpacity onPress={() => openMap()}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          marginLeft: 0,
                          width: "98%",
                          height: 40,
                          backgroundColor: "#6200ED",
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            color: "white",
                            fontWeight: "600",
                            top: 7,
                            padding: 5,
                          }}
                        >
                          <Entypo name="location" size={15} color="white" />
                          {"  "}
                          {balanceAmount[0]?.customer?.address === null 
                          ? "address not available"
                         : balanceAmount[0]?.customer?.address.city } {" "}
                         {balanceAmount[0]?.customer?.address?.addressLine1}{" "}
                         {balanceAmount[0]?.customer?.address?.pin}

                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: "32%",
                      height: 30,
                      display: "flex",
                      flexDirection: "row",
                      left: 4,
                      gap:12
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Accountinfo",{
                        customerDetails: route.params.OrderDetails,
                      })}
                    >
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "center",
                          height: 37,
                          paddingHorizontal: 15,
                          paddingVertical: 10,
                          backgroundColor: "#6200ED",
                          marginHorizontal: 15,
                          borderRadius: 7,
                          top: 10,
                        }}
                      >
                        <MaterialIcons
                          name="account-balance-wallet"
                          size={17}
                          color="white"
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            textAlign: "center",
                            color: "white",
                            fontWeight: "600",
                            marginLeft: 4,
                          }}
                        >
                          ACCOUNT INFO
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("AddressN",{
                        customerDetails: route.params.OrderDetails,
                        // myN:my
                      })}
                    >
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "center",
                          height: 37,
                          paddingHorizontal: 15,
                          paddingVertical: 10,
                          backgroundColor: "#6200ED",
                          marginHorizontal: 15,
                          borderRadius: 7,
                          marginTop: 10,
                        }}
                      >
                        <AntDesign
                          name="plus"
                          size={17}
                          color="white"
                          style={{ top: 1 }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            textAlign: "center",
                            color: "white",
                            fontWeight: "600",
                            left: 3,
                          }}
                        >
                          EDIT ADDRESS
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

    
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Viewcard: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    borderStyle: "solid",
    borderColor: "grey",
    height: 233,
    width: 370,
    borderWidth: 1.9,
    marginLeft: 10,
    borderRadius: 27,
  },
  input: {
    fontSize: 16,
    lineHeight: 22.5,
    marginTop: 7,
    marginLeft: 5,
    fontWeight: "400",
    width: 190,
    height: 23,
    textAlign: "center",
    color: "black",
    backgroundColor: "#FFFCFC",
  },
});
export default Pickupn;
