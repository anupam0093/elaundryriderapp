import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import { Linking, Platform } from "react-native";
import moment from "moment";

const PickupCards = ({ item }) => {
  const { navigate } = useNavigation();
  const windowWidth = Dimensions.get("window").width;

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

  const customerData = {
    name:
      item?.pickupRequest?.customerDTO?.firstName +
      " " +
      item?.pickupRequest?.customerDTO?.lastName,
    mobileNo: item?.pickupRequest?.customerDTO?.address?.contactNo,
    storeCustomerId: item?.pickupRequest?.storeCustomerId,
    id: item?.pickupRequest?.customerDTO?.address?.id,
   


  };
  // console.log( item?.pickupRequest?.customerDTO?.address?.contactNo)

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
          navigate("Category", { customerDetails: customerData });
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
                color: "black",
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
                  Number(item?.["pickupRequest"]?.["customerDTO"]?.["address"]?.contactNo)
                )
              }
            >
              <View
                style={{
                  width: 110,
                  flexDirection: "row",
                  justifyContent: "center",
                  height: 38,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: "#508FEF",
                  marginHorizontal: 15,
                  marginTop: 10,
                  borderRadius: 10,
                }}
              >
                <Feather
                  name="phone-call"
                  size={14}
                  color="black"
                  style={{ top: 2, right: 4 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    color: "black",
                    fontWeight: "bold",
                    left: 4,
                  }}
                >
                  {item?.["pickupRequest"]?.["customerDTO"]?.["address"]?.contactNo === null
                  ? item?.["pickupRequest"]?.["customerDTO"]?.mobileNo
                  :item?.["pickupRequest"]?.["customerDTO"]?.["address"]?.contactNo

                   }
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
                <AntDesign name="calendar" size={15} color="black" />{" "}
                {moment(item?.["pickupRequest"]?.["pickupDate"]).format(
                  "DD-MM-YYYY"
                )}
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
                {item?.["pickupRequest"]?.["pickupTime"]}
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
                color: "#B12EAC",
                textAlign: "center",
                fontSize: 17,
                fontWeight: "500",
              }}
            >
              {/* Request Received by Rider */}
              {(item?.["pickupRequest"]?.["pickupStatus"]).replace(/_/g, " ")}
            </Text>
          </View>

          <View style={{ width: "100%", height: 60, padding: 7 }}>
            <TouchableOpacity
              onPress={() =>
                openMap(
                  item?.["pickupRequest"]?.["customerDTO"]?.address
                    ?.addressLine1,
                  item?.["pickupRequest"]?.["customerDTO"]?.address?.pin,
                  item?.["pickupRequest"]?.["customerDTO"]?.address?.city
                )
              }
            >
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
                    backgroundColor: "#B12EAC",
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
                width: "33%",
                height: 30,
                display: "flex",
                flexDirection: "row",
                
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigate("Accountinfo", { customerDetails: customerData })
                }
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    height: 37,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: "#32D8D8",
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
                onPress={() =>
                  navigate("Address", { customerDetails: customerData })
                }
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
                    left: 10,
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
  );
};
const styles = StyleSheet.create({
  Viewcard: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    borderStyle: "solid",
    borderColor: "grey",
    height: 240,
    width: 370,
    borderWidth: 1.9,
    marginLeft: 8,
    borderRadius:27,
   
    
   
    
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

export default PickupCards;
