import React from "react";
import { View, Text, Box, ScrollView } from "native-base";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

// interface NavigationProps {
//   navigation?: any;
// }

const PickupFilter = ({ navigation }) => {
  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={{ height: 926, width: "100%", backgroundColor: "#F3F1F6" }}>
          <ImageBackground
            source={require("../../assets/Photos/backg.png")}
            alt="background"
            resizeMode="cover"
            style={{ height: 926, width: 428 }}>
            <Box
              style={{
                marginLeft: 5,
                marginTop: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("OrderDelevery");
                }}>
                <AntDesign
                  name="left"
                  size={24}
                  color="#5D7EFC"
                  style={{ marginTop: 30, marginLeft: 10 }}
                />
              </TouchableOpacity>
              <Box
                style={{
                  width: 242,
                  height: 34,
                  marginTop: 16,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    lineHeight: 44,
                    fontWeight: "600",
                    color: "#002B6B",
                  }}>
                  Pickup List Filter
                </Text>
              </Box>

              <Entypo
                name="dots-three-vertical"
                size={24}
                color="black"
                style={{ marginTop: 30, marginRight: 46 }}
              />
            </Box>

            <Box
              style={{
                width: 292,
                height: 250,

                left: 50,
                top: 200,
              }}>
              <Box
                style={{
                  width: 290,
                  height: 50,
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#D9D9D9",
                    borderRadius: 7,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#000",
                      textAlign: "center",
                      lineHeight: 45,
                    }}>
                    Customer Name
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderColor: "#D9D9D9",
                    borderStyle: "solid",
                    borderWidth: 1,
                    backgroundColor: "#D9D9D9",
                    borderRadius: 7,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#003566",
                      textAlign: "center",
                      lineHeight: 45,
                    }}>
                    Aksha Tiyagi
                  </Text>
                </View>
              </Box>
              <Box
                style={{
                  width: 290,
                  height: 50,
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 20,
                  gap: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#D9D9D9",
                    borderRadius: 7,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#000",
                      textAlign: "center",
                      lineHeight: 45,
                    }}>
                    Customer Name
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    borderColor: "#D9D9D9",
                    borderStyle: "solid",
                    borderWidth: 1,
                    backgroundColor: "#D9D9D9",
                    borderRadius: 7,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#003566",
                      textAlign: "center",
                      lineHeight: 45,
                    }}>
                    98765790383
                  </Text>
                </View>
              </Box>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PickupDate");
                }}>
                <Box
                  style={{
                    width: 290,
                    height: 50,
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    gap: 10,
                  }}>
                  <View
                    style={{
                      width: "40%",
                      left: 170,
                      height: 29,
                      backgroundColor: "#11A7E1",
                      borderRadius: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: "#FFF",
                        textAlign: "center",
                        lineHeight: 27,
                      }}>
                      Pickup Date
                    </Text>
                  </View>
                </Box>
              </TouchableOpacity>

              <Box
                style={{
                  width: "95%",
                  height: 50,
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 20,
                  gap: 10,
                  left: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#21C003",
                    borderRadius: 7,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      color: "#FFF",
                      textAlign: "center",
                      lineHeight: 45,
                    }}>
                    Filter
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    borderColor: "#D9D9D9",
                    borderStyle: "solid",
                    borderWidth: 1,
                    backgroundColor: "#EE4034",
                    borderRadius: 7,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("OrderDelevery");
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: "#FFF",
                        textAlign: "center",
                        lineHeight: 45,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </Box>
            </Box>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PickupFilter;
