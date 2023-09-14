import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import Octicons from "@expo/vector-icons/build/Octicons";
import { useNavigation} from "@react-navigation/native";
import { Feather,MaterialIcons } from "@expo/vector-icons";
import useStore from "../GlobalStore/store";


const Pickup = () => {
  const { navigate } = useNavigation();
  const account = useStore(state => state.account)


  return (
    <SafeAreaView>
      <View style={{ height: 926, width: "100%", backgroundColor: "#F3F1F6" }}>
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
              navigate("Homepage");
            }}
          >
            <AntDesign
              name="left"
              size={24}
              color="#5D7EFC"
              style={{ marginTop: 30, marginLeft: 10 }}
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
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#6200ED",
                    marginTop: 15,
                    marginLeft: 10,
                  }}
                >
                  {account?.firstName}{" "}
                  {account?.lastName}
                </Text>


                <View
                  style={{
                    width: 135,
                    flexDirection: "row",
                    justifyContent: "center",
                    left: 100,
                    height: 40,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: "#6200ED",
                    marginHorizontal: 15,
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                >
                  <Feather name="phone-call" size={17} color="white" style={{top:2,right:4}} />
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                      left: 5,
                    }}
                  >
                    {account.mobileNo}
                  </Text>
                </View>
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
                      fontSize: 19,
                      justifyContent: "center",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    9:00am-10:00 pm
                  </Text>
                </View>

                <View style={{ width: "auto", backgroundColor: "#FFFCFC" }}>
                  <Text
                    style={{
                      fontSize: 19,
                      justifyContent: "center",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    02-07-2023
                  </Text>
                </View>
              </View>

              <View style={{ width: "100%", height: 45, marginLeft: 10, }}>
                <View>
                   <AntDesign name="arrowright" size={14} color="#6200ED" style={{top:21,left:40}} />
                </View>
               
                <Text
                  style={{
                    color: "#6200ED",
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "500",
                    marginTop: 0,
                  }}
                >
                  Request Received by Rider
                </Text>
              </View>

              <View style={{ width: "100%", height: 60, padding: 10 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ marginLeft: 10, width: "auto", height: 45 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#000000",
                        fontWeight: "700",
                        top:7
                      }}
                    >
                      {/* Address not Available */}
                      {(account?.address === null ?( "Adress not Available") :(account?.address?.city))}
                    </Text>
                  </View>
                

                <TouchableOpacity onPress={() => navigate("Address")}>
                  <View
                    style={{
                      width: 110,
                      flexDirection: "row",
                      justifyContent: "center",
                      height: 40,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      backgroundColor: "#6200ED",
                      marginHorizontal: 15,
                      borderRadius: 7,
                      left:10
                    }}
                  >
                    <AntDesign name="plus" size={16} color="white" style={{top:2}} />
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: "center",
                        color: "white",
                        fontWeight: "600",
                        left:3,
                        
                      }}
                    >
                      ADDRESS
                    </Text>
                  </View>
                </TouchableOpacity>
                  

                </View>
                <View style={{ width: 161, height: 19, marginLeft: 8, justifyContent:"center" }}>
                  <Text style={{ fontSize: 10, lineHeight: 9.5 }}>
                    {/* {item?.[ "customer" ]?.[ "address" ]} */}

                    {/* {OrderDetails?.OrderDetails?.address} */}
                  </Text>


                   <TouchableOpacity onPress={() => navigate("Accountinfo")}>
                  <View
                    style={{
                      width: 150,
                      flexDirection: "row",
                      justifyContent: "center",
                      height: 40,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      backgroundColor: "#6200ED",
                      marginHorizontal: 15,
                      borderRadius: 7,
                      left:70,
                      top:10
                    }}
                  >
                 <MaterialIcons name="account-balance-wallet" size={20} color="white" />
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: "center",
                        color: "white",
                        fontWeight: "600",
                        left:4,
                        
                      }}
                    >
                      ACCOUNT INFO
                    </Text>
                  </View>
                </TouchableOpacity>    
                

                </View>
                
              </View>

            </View>
          </TouchableOpacity>
          {/* )
            })} */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Viewcard: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    borderStyle: "solid",
    borderColor: "#002B6B1F",
    height: 260,
    width: 370,
    borderWidth: 1,
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
});
export default Pickup;
