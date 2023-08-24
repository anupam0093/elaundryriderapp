import React from "react";
import { View, Text, Box, ScrollView } from "native-base";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

// interface NavigationProps {
//   navigation?: any;
// }

const PickupDate = ({ navigation }) => {
  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={{ height: 926, width: "100%", backgroundColor: "#F3F1F6" }}>
          <ImageBackground
            source={require("../../assets/Photos/backg.png")}
            alt="background"
            resizeMode="contain"
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
                  navigation.navigate("PickupFilter");
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

            <Box style={{ width: 290, height: 290, left: 50, bottom: 40 }}>
              <ImageBackground
                source={require("../../assets/Photos/clock.png")}
                resizeMode="cover"
                style={{ width: 298, height: 298 }}
              />
            </Box>

            <Box
              style={{
                width: 370,
                height: 60,
                borderStyle: "solid",
                borderColor: "#E8E8E8",
                borderWidth: 1,
                left: 20,
                bottom: 40,
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#E8E8E8",
                borderRadius: 7,
              }}>
              <View style={{ left: 5, top: 17, marginLeft: 20, flex: 1 }}>
                <Text style={{ fontSize: 15, color: "#000" }}>Search Date</Text>
              </View>

              <View style={{ flex: 1, top: 15, left: 120 }}>
                <Ionicons name="calendar" size={24} color="black" />
              </View>
            </Box>

            {/* calender  having event starts here */}
          </ImageBackground>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PickupDate;
