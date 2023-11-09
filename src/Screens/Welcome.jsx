import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  Alert
} from "react-native";
import { TextInput } from "react-native";
import { styles } from "../../Components/Styles/welcome";
import axios from "axios";
import { API_URL } from "../../networkAPI/env";
import useStore from "../GlobalStore/store";
import CustomButton from "../../Components/CommonComponent/CustomButton";
import { getAccountInfo } from "../../networkAPI/api";



const Welcome = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useStore((state) => state.setUser);
  const setRiderDetails = useStore((state) => state.setRiderDetails);

  const customUserLogin = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/auth/signin`,
        data: {
          username: username,
          password: password,
        },
      });

      console.log('Rider token', data);
      setUser(data);
      if (data) {
        try {
          const accountData = await getAccountInfo(
            data?.accessToken,
            data?.tokenType
          );
          if (accountData) {
            setRiderDetails(accountData?.data);
            setUser(data);
          }
        } catch (error) {
          console.log("Something Went Wrong");
        }
      }
     
    } catch (error) {
      Alert.alert("Rider Doesn't Exist Invalid credentials")

      console.log(error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ top: 20 }}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/Photos/backg.png")}
            alt="background"
            resizeMode="cover"
            style={{ height: 990, width: "100%" }}
          >
            <View style={{ width: "100%" }}>
              <Image
                alt="logo"
                source={require("../../assets/Photos/elaundry.png")}
                style={{
                  width: 200,
                  height: 100,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
              <View
                style={{
                  width: "100%",
                  height: 270,
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  alt="image-2"
                  source={require("../../assets/Photos/pngwing.png")}
                  style={{
                    margin: "auto",
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
            </View>

            <View
              style={{
                top: 35,
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 35,
                    lineHeight: 35,
                    fontWeight: "bold",
                    color: "#002B6B",
                  }}
                >
                  Get top
                </Text>

                <Text
                  style={{
                    fontSize: 35,
                    lineHeight: 35,
                    fontWeight: "700",
                    color: "#002B6B",
                    textAlign: "center",
                  }}
                >
                  washing facilities
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      fontWeight: "500",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      color: "#878686",
                    }}
                  >
                    We care about our customer first.
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      fontWeight: "500",
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      color: "#878686",
                    }}
                  >
                    After submitting order, we will pickup your
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      fontWeight: "500",
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      color: "#878686",
                    }}
                  >
                    clothes as you set the time
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                marginTop: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Text style={{ fontSize: 15, fontWeight: "500" }}>Username</Text> */}
            </View>
            <View style={{ display: "flex" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  keyboardType="ascii-capable"
                  value={username}
                  onChangeText={(e) => {
                    setUsername(e);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Text style={{ fontSize: 15, fontWeight: "500" }}>Password</Text> */}
            </View>
            <View style={{ display: "flex" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  keyboardType="ascii-capable"
                  textContentType="password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(e) => {
                    setPassword(e);
                  }}
                />
              </View>
            </View>

            <View style={styles.viewButtonTop}>
              <View style={styles.viewButtonSection}>
                <CustomButton
                  btnTittle="Submit"
                  bg="green"
                  _width={300}
                  _onPress={customUserLogin}
                  textColor="white"
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Welcome;
