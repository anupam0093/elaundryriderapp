import React, { useCallback, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { Image, Box, Text, Center, ScrollView, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { styles } from "../../Components/Styles/welcome";
import { getAccountInfo, handleLoginUser } from "../../networkAPI/api";
import { sendToken, setRiderMobileNo, setStoreId, setStoreUserId } from "../../networkAPI/services/auth.service";
import { useEffect } from "react";
import * as Network from 'expo-network';
interface NavigationProps {
  navigation?: any;
}

const Welcome = ({ navigation }: NavigationProps) => {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  
  // const [ipAddress, setIpAddress] = useState('');

  // get ip address dynamically from any device
  // useEffect(() => {
  //   async function fetchIpAddress() {
  //     const localIpAddress = await Network.getIpAddressAsync();
  //     setIpAddress(localIpAddress);
  //     console.log(ipAddress)
  //   }

  //   fetchIpAddress();
  // }, [ipAddress]);





  async function loginUser() {
    const response = await handleLoginUser(username, password);

    // loginSuccess
    const getUser = await getAccountInfo(
      response[ `accessToken` ],
      response[ `tokenType` ]
    );

    const user = getUser?.data;
    if (user?.loginStatus === true && user?.role === "ROLE_RIDER") {
      sendToken(response[ `accessToken` ]);
      console.log(user?.role);
      switch (user?.role) {
        case "ROLE_RIDER": {
          console.log("sucess data", { user });
          setStoreId(user?.storeId);
          setStoreUserId(user?.storeUserId)
          Alert.alert(
            `Welcome ${user.userName} you have been logged in successfully`
          );
          navigation.navigate("Homepage");
          break;
        }
      }
    } else {
      Alert.alert("Login Error");
    }

  }



  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <AntDesign
              name="left"
              size={24}
              color="#5D7EFC"
              style={{ marginTop: 30, marginLeft: 20 }}
            />

            <Image
              alt="ios-notifications-outline"
              height="22px"
              width="22px"
              source={require("../../assets/Photos/Vector.png")}
              style={{ marginTop: 30, marginRight: 30 }}
            />
          </Box>

          <Box style={{ marginTop: 50, marginRight: 20 }}>
            <Image
              alt="logo"
              margin="auto"
              height="115px"
              source={require("../../assets/Photos/elaundry.png")}
              width="250px"
            />
            <Box
              style={{
                width: "100%",
                height: 299,
                marginTop: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Image
                alt="image-2"
                source={require("../../assets/Photos/pngwing.png")}
                margin="auto"
                width="100%"
                height="100%"
              />
            </Box>
          </Box>
          <View
            style={{
              top: 35,
            }}>
            <Center>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 35,
                  lineHeight: 35,
                  fontWeight: "bold",
                  color: "#002B6B",
                }}>
                Get top
              </Text>

              <Text
                style={{
                  marginRight: 20,
                  fontSize: 35,
                  lineHeight: 35,
                  fontWeight: "700",
                  color: "#002B6B",
                }}>
                washing facilities
              </Text>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 20,
                }}>
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
                  }}>
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
                  }}>
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
                  }}>
                  clothes as you set the time
                </Text>
              </View>
            </Center>
          </View>

          <View
            style={{
              marginTop: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>Username</Text>
          </View>
          <View style={{ display: "flex" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: 10,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                keyboardType="ascii-capable"
                value={username}
                onChangeText={(e) => {
                  setUsername(e);
                }}
              />
            </Box>
          </View>
          <View
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>Password</Text>
          </View>
          <View style={{ display: "flex" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: 10,
                alignItems: "center",
                justifyContent: "center",
              }}>
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
            </Box>
          </View>

          <Box style={styles.viewButtonTop}>
            <View style={styles.viewButtonSection}>
              <Button
                variant="solid"
                width="37%"
                height="40px"
                colorScheme=""
                borderRadius="7px"
                backgroundColor="#D9D9D9">
                <Text
                  style={{
                    fontSize: 20,
                    lineHeight: 17,
                    fontWeight: "bold",
                    color: "#5D7EFC",
                  }}>
                  Logout
                </Text>
              </Button>
              <Button
                variant="solid"
                backgroundColor="#5D7EFC"
                width="37%"
                height="40px"
                borderRadius="7px"
                onPress={loginUser}>
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

export default Welcome;
