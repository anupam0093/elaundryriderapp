import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import { Linking, Platform } from "react-native";
import moment from "moment";

const PickupCards = ({ item }) => {
  const { navigate } = useNavigation();

  // =================================== Calling Api ==============================================================
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

  // ================================= Open Map =======================================================================

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

  return (
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
          navigate("Category");
        }}
      >
        <View style={[styles.Viewcard]}>
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
                fontSize: 18,
                fontWeight: "bold",
                color: "#6200ED",
                marginTop: 15,
                marginLeft: 10,
              }}
            >
              {item?.["pickupRequest"]?.["customerDTO"]?.firstName}{" "}
              {item?.["pickupRequest"]?.["customerDTO"]?.lastName}
            </Text>

            <TouchableOpacity
              onPress={() =>
                callPhoneNumber(
                  Number(item?.["pickupRequest"]?.["customerDTO"]?.mobileNo)
                )
              }
            >
              <View
                style={{
                  width: 125,
                  flexDirection: "row",
                  justifyContent: "center",
                  height: 40,
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
                  size={17}
                  color="white"
                  style={{ top: 2, right: 4 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    left: 5,
                  }}
                >
                  {item?.["pickupRequest"]?.["customerDTO"]?.mobileNo}
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
                  fontSize: 15,
                  justifyContent: "center",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <AntDesign name="calendar" size={17} color="black" />{" "}
                {moment(item?.["pickupRequest"]?.["pickupDate"]).format(
                  "DD-MM-YYYY"
                )}
              </Text>
            </View>
            <View style={{ width: "auto", backgroundColor: "#FFFCFC" }}>
              <Text
                style={{
                  fontSize: 15,
                  justifyContent: "center",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <AntDesign name="clockcircleo" size={17} color="black" />{" "}
                {item?.["pickupRequest"]?.["pickupTime"]}
              </Text>
            </View>
          </View>

          <View style={{ width: "100%", height: 45, marginLeft: 10 }}>
            <View>
              <AntDesign
                name="arrowright"
                size={16}
                color="#6200ED"
                style={{ top: 21, left: 70 }}
              />
            </View>

            <Text
              style={{
                color: "#6200ED",
                textAlign: "center",
                fontSize: 17,
                fontWeight: "500",
                marginTop: 0,
              }}
            >
              {/* Request Received by Rider */}
              {(item?.["pickupRequest"]?.["pickupStatus"]).replace(/_/g,  " ")}
            </Text>
          </View>

          <View style={{ width: "100%", height: 60, padding: 10 }}>

            <TouchableOpacity onPress={() => openMap(( item?.["pickupRequest"]?.["customerDTO"]?.address
                        ?.addressLine1),( item?.["pickupRequest"]?.["customerDTO"]?.address
                        ?.pin),( item?.["pickupRequest"]?.["customerDTO"]?.address
                        ?.city))}>
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
                  height: 45,
                  backgroundColor: "#6200ED",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontWeight: "600",
                    top: 7,
                    padding: 5,
                  }}
                >
                  <Entypo name="location" size={18} color="white" />
                  {"  "}
                  {item?.["pickupRequest"]?.["customerDTO"]?.address === null
                    ? "Adress not Available"
                    : item?.["pickupRequest"]?.["customerDTO"]?.address
                        ?.addressLine1}{" "}
                  {item?.["pickupRequest"]?.["customerDTO"]?.address?.city}{" "}
                  {item?.["pickupRequest"]?.["customerDTO"]?.address?.pin}
                </Text>
              </View>
            </View>
            </TouchableOpacity>
           

            <View
              style={{
                width: 161,
                height: 19,
                marginLeft: 8,
                display: "flex",
                flexDirection: "row",
                gap: 50,
              }}
            >
              <TouchableOpacity onPress={() => navigate("Accountinfo")}>
                <View
                  style={{
                    width: 140,
                    flexDirection: "row",
                    justifyContent: "center",
                    height: 40,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: "#6200ED",
                    marginHorizontal: 15,
                    borderRadius: 7,
                    left: 70,
                    top: 10,
                  }}
                >
                  <MaterialIcons
                    name="account-balance-wallet"
                    size={20}
                    color="white"
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      color: "white",
                      fontWeight: "600",
                      left: 4,
                    }}
                  >
                    ACCOUNT INFO
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate("Address")}>
                <View
                  style={{
                    width: 90,
                    flexDirection: "row",
                    justifyContent: "center",
                    height: 40,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: "#6200ED",
                    marginHorizontal: 15,
                    borderRadius: 7,
                    left: 10,
                    marginTop: 10,
                  }}
                >
                  <AntDesign
                    name="plus"
                    size={16}
                    color="white"
                    style={{ top: 2 }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      color: "white",
                      fontWeight: "600",
                      left: 3,
                    }}
                  >
                    ADDRESS
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Viewcard: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    borderStyle: "solid",
    borderColor: "#E6E6E6",
    height: 260,
    width: 370,
    borderWidth: 2,
    marginLeft: 10,
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
  shadowProp: {
    shadowColor: "#52006A",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default PickupCards;
