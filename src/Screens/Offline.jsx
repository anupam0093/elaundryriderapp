import React, { useState } from "react";

import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import {
  Box,
  Text,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from "native-base";
import Feather from "@expo/vector-icons/build/Feather";
import { useNavigation } from "@react-navigation/native";
import Homepage from "./Homepage";

// interface NavigationProps {
//   navigation?: any;
// }


const Offline = ({ navigation }) => {
  // validation starts here //

  const [email, setEmail] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleEmailValidation = () => {
    // Email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      Alert.alert("Error", "Please enter an email address");
    } else if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
    } else {
      Alert.alert("Success", "Email is valid");
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={{ height: 926, width: "100%", backgroundColor: "#F3F1F6" }}>
          <Box
            style={{
              marginLeft: 19,
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Image
              style={{
                width: 45,
                height: 45,
                borderRadius: 27.5,
                marginTop: 20,
              }}
              alt="profile-pic"
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AOLn63Gvcqud18bpZN8SVHtRZYQQ-49QfjkzyNVWHyrW8w=s32-c-mo",
              }}
            />

            <Image
              alt="Notification-icon"
              source={require("../../assets/Photos/Vector.png")}
              style={{ marginTop: 30, marginRight: 50, height: 22, width: 22 }}
            />
          </Box>

          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "#767272",
              marginLeft: 19,
            }}>
            Hey, Shail
          </Text>
          <Text
            style={{
              marginLeft: 19,
              fontSize: 24,
              lineHeight: 45,
              fontWeight: "600",
              color: "#002B6B",
            }}>
            Welcome back!
          </Text>

          {/* data coming from backend */}

          <Text
            style={{
              marginLeft: 19,
              fontSize: 14,
              fontWeight: "700",
              color: "#0000008F",
              borderStyle: "solid",
              borderColor: "#002B6B1F",
              borderWidth: 1,
              width: 191,
              padding: 10,
              height: 31,
              borderRadius: 7,
              textAlign: "center",
              lineHeight: 14,
              backgroundColor: "#FFFFFF",
            }}>
            {/* data coming from backend */}
            RIDERID9718409025
          </Text>
          <Box style={{ display: "flex" }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                gap: 5,
                marginLeft: 19,
              }}>
              <Button
                variant="solid"
                width="171px"
                height="48px"
                colorScheme="darkText"
                borderRadius="xl"
                backgroundColor="#002B6B">
                ONLINE
              </Button>
              <Button
                variant="solid"
                backgroundColor="#D9D9D9"
                width="171px"
                height="48px"
                borderRadius="xl">
                ONLINE
              </Button>
            </View>
          </Box>

          <View
            style={{
              width: 334,
              height: 280,
              marginLeft: 47,
              marginRight: 47,
            }}>
            <Image
              alt="man-image"
              source={require("../../assets/Photos/man.png")}
            />
          </View>
          {/* email and other deatails have been filled here */}

          <View style={{ marginTop: 20, marginLeft: 30 }}>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="johnsmith@example.com"
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
            />
          </View>
          <View style={{ marginTop: 10, marginLeft: 30 }}>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>Role</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="ascii-capable"
            />
          </View>
          <View
            style={{
              marginTop: 18,
              marginLeft: 30,
              display: "flex",
              flexDirection: "row",
            }}>
            <Feather name="check-circle" size={24} color="#5D7EFC" />
            <Box style={{ marginLeft: 18 }}>
              <Text style={{ color: "#242426", fontSize: 16, lineHeight: 23 }}>
                I agree to the{" "}
                <Text style={styles.innerText}>Terms & Conditions</Text>
              </Text>

              <Text style={{ color: "#5D7EFC", fontSize: 16, lineHeight: 23 }}>
                {" "}
                <Text style={styles.dark}>and</Text> Privacy Policy
              </Text>
            </Box>
          </View>
          <Box style={{ display: "flex" }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                gap: 10,
                marginLeft: 19,
              }}>
              <Button
                variant="solid"
                width="174px"
                height="40px"
                colorScheme=""
                borderRadius="3px"
                backgroundColor="#D9D9D9">
                <Text
                  style={{ fontSize: 20, lineHeight: 17, fontWeight: "bold" }}>
                  Logout
                </Text>
              </Button>
              <Button
                variant="solid"
                backgroundColor="#5D7EFC"
                width="174px"
                height="40px"
                borderRadius="3px"
                onPress={handleEmailValidation}>
                <Text
                  style={{
                    fontSize: 20,
                    lineHeight: 20,
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  }}>
                  Submit
                </Text>
              </Button>
            </View>
          </Box>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    lineHeight: 23,
    fontSize: 18,
    height: 60,
    textAlign: "center",
    width: 327,
    padding: 8,
    backgroundColor: "#DCDCDE",
    borderRadius: 16,
  },
  innerText: {
    color: "#5D7EFC",
    fontSize: 16,
    lineHeight: 23,
  },
  dark: {
    color: "#242426",
  },
});
export default Offline;
