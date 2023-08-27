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
import { useNavigation, useRoute } from "@react-navigation/native";


const Pickup = () => {
  
  const {navigate} = useNavigation()
  const route = useRoute()
  const OrderDetails = route.params
  return (
   
      <SafeAreaView>
        <View
          style={{ height: 926, width: "100%", backgroundColor: "#F3F1F6" }}>
          <View
            style={{
              marginLeft: 5,
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <TouchableOpacity
              onPress={() => {
                navigate("Homepage");
              }}>
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
              }}>
              <View style={{ marginTop: 6, marginLeft: 9.5 }}>
                <Octicons name="search" size={20} color="black" />
              </View>
              <View style={{ height: 23, width: 90 }}>
                <TextInput
                  style={[ styles.input ]}
                  placeholder="Search Here"></TextInput>
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
              top: 20,
              right: 5,
            }}>


            {/* {OrderDetails?.map((item, index) => {
              console.log(item?.[ "storeCustomerAccountDTO" ])
              return ( */}
                <TouchableOpacity
                
                  onPress={() => {
                    navigate("Category");
                  }} 
                  >

                  <View style={[ styles.Viewcard ]}
                  
                  >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                          color: "#003566",
                          marginTop: 15,
                          marginLeft: 8,
                        }}>
                        {/* {item?.[ "customer" ]?.[ "firstName" ]} {item?.[ "customer" ]?.[ "lastName" ]} */}
                       { OrderDetails?.OrderDetails?.firstName} { OrderDetails?.OrderDetails?.lastName}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          height: 20,
                          width: 79,
                          marginTop: 16.8,
                          justifyContent: "center",
                          backgroundColor: "#D9D9D9",
                          marginLeft: 9,
                          borderRadius: 2,
                          paddingBottom: 2,
                        }}>
                        <View style={{ justifyContent: "center" }}>
                          <Text style={{ fontSize: 10 }}>02-07-2023</Text>
                        </View>
                        <Image
                          style={{ marginTop: 5, marginLeft: 4 }}
                          alt="calendar"
                          source={require("../../assets/Photos/calendar.png")}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        height: 20,
                        width: 104,
                        marginTop: 5,
                        justifyContent: "center",
                        backgroundColor: "#D9D9D9",
                        marginLeft: 72.9,
                        borderRadius: 2,
                      }}>
                      <View style={{ justifyContent: "center" }}>
                        <Text style={{ fontSize: 10 }}>9:00am-10:00pm</Text>
                      </View>
                      <Image
                        style={{ marginTop: 5, marginLeft: 4 }}
                        alt="calendar"
                        source={require("../../assets/Photos/stopwatch.png")}
                      />
                    </View>
                    <View
                      style={{
                        width: 169,
                        height: 24,
                        borderStyle: "solid",
                        borderColor: "#002B6B1F",
                        backgroundColor: "#002B6B",
                        marginTop: 7,
                        marginLeft: 5,
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          color: "#FFFF",
                          textAlign: "center",
                          fontSize: 11,
                          fontWeight: "500",
                          marginTop: 1.9,
                        }}>
                        {/* {item?.[ "customer" ]?.[ "mobileNo" ]} */}
                      </Text>
                    </View>

                    <View style={{ width: 160, height: 45, marginLeft: 10 }}>
                      <Text
                        style={{
                          color: "#000000",
                          textAlign: "center",
                          fontSize: 12,
                          fontWeight: "500",
                          marginTop: 5,
                        }}>
                        Request Received by Rider
                      </Text>
                    </View>
                    <View style={{ width: 172, height: 70 }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}>
                        <View style={{ marginLeft: 10, width: 41, height: 45 }}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: "#000000",
                              fontWeight: "400",
                            }}>
                            Address
                          </Text>
                        </View>
                        <View style={{ marginTop: 0 }}>
                          <Text style={{ fontSize: 6, fontWeight: "400" }}>
                            Edit
                          </Text>
                        </View>
                      </View>
                      <View style={{ width: 161, height: 19, marginLeft: 8 }}>
                        <Text style={{ fontSize: 10, lineHeight: 9.5 }}>
                          {/* {item?.[ "customer" ]?.[ "address" ]} */}
                        </Text>

                        <TouchableOpacity
                          onPress={() => {
                            navigate("Accountinfo");
                          }}
                          >
                          <TouchableOpacity
                          onPress={()=>navigate('Accountinfo')}
                            style={{
                              width: 169,
                              height: 24,
                              borderStyle: "solid",
                              borderColor: "#002B6B1F",
                              backgroundColor: "#11A7E1",
                              marginTop: 10,
                              borderRadius: 4,
                            }}>
                            <Text
                              style={{
                                color: "#FFFF",
                                textAlign: "center",
                                fontSize: 11,
                                fontWeight: "500",
                                marginTop: 1,
                              }}>
                              Account Info
                            </Text>
                          </TouchableOpacity>
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
    height: 250,
    width: 185,
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
