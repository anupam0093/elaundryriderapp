import React, { useState } from "react";

import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Feather from "@expo/vector-icons/build/Feather";
import { useNavigation } from "@react-navigation/native";

// interface NavigationProps {
//   navigation?: any;
// }

const Offline = ({navigation}) => {
  // validation starts here //

  const { navigate } = useNavigation();

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
          style={{ height: 926, width: "100%", backgroundColor: "#F3F1F6",left:0 }}
        >
          
          <View
            style={{
              marginLeft: 49,
              marginTop: 20,
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
                size={24}
                color="#5D7EFC"
                style={{ marginTop: 30, marginLeft: 10 }}
              />
            </TouchableOpacity>
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
          </View>

          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "#767272",
              marginLeft: 39,
            }}
          >
            Hey, Shail
          </Text>
          <Text
            style={{
              marginLeft: 19,
              fontSize: 24,
              lineHeight: 45,
              fontWeight: "600",
              color: "#002B6B",
            }}
          >
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
            }}
          >
            {/* data coming from backend */}
            RIDERID9718409025
          </Text>
          <View style={{ display: "flex" }}>
      
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#D9D9D9",
                marginHorizontal: 15,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#003566",
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 5,
                  width: "45%",
                }}
              >
                <Text
                  style={{ fontSize: 20, textAlign: "center", color: "white" }}
                >
                  ONLINE
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Services")}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  width: "45%",
                }}
              >
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  OFFLINE
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: 334,
              height: 280,
              marginLeft: 47,
              marginRight: 47,
            }}
          >
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
            }}
          >
            <Feather name="check-circle" size={24} color="#5D7EFC" />
            <View style={{ marginLeft: 18 }}>
              <Text style={{ color: "#242426", fontSize: 16, lineHeight: 23 }}>
                I agree to the{" "}
                <Text style={styles.innerText}>Terms & Conditions</Text>
              </Text>

              <Text style={{ color: "#5D7EFC", fontSize: 16, lineHeight: 23 }}>
                {" "}
                <Text style={styles.dark}>and</Text> Privacy Policy
              </Text>
            </View>
          </View>
      
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: "#D9D9D9",
              marginHorizontal: 15,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#003566",
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 5,
                width: "45%",
              }}
            >
              <Text
                style={{ fontSize: 20, textAlign: "center", color: "white" }}
              >
                Logout
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
           onPress={handleEmailValidation}
              style={{
                backgroundColor: "white",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                width: "45%",
              }}
            >
              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
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
