import React, {  useState } from "react";
import {  SafeAreaView, View,Text, ScrollView, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { styles } from "../../Components/Styles/welcome";
// import { getAccountInfo, handleLoginUser } from "../../networkAPI/api";
// import { sendToken, setRiderMobileNo, setStoreId, setStoreUserId } from "../../networkAPI/services/auth.service";
// import { useEffect } from "react";
// import * as Network from 'expo-network';
import axios from "axios";
import { API_URL } from "../../networkAPI/env";
import useStore from "../GlobalStore/store";
import CustomButton from "../../Components/CommonComponent/CustomButton";
import { getAccountInfo } from "../../networkAPI/api";

// interface NavigationProps {
//   navigation?: any;
// }

const Welcome = ({ navigation }) => {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  
  
  const setUser = useStore(state=>state.setUser)
  const setRiderDetails = useStore(state=>state.setRiderDetails)


  // async function loginUser() {
  //   const response = await handleLoginUser(username, password);
   

    
  //   // loginSuccess
  //   const getUser = await getAccountInfo(
  //     response[ `accessToken` ],
  //     response[ `tokenType` ]
  //   );

  //   const user = getUser?.data;
  //   if (user?.loginStatus === true && user?.role === "ROLE_RIDER") {
  //     sendToken(response[ `accessToken` ]);
  //     console.log(user?.role);
  //     switch (user?.role) {
  //       case "ROLE_RIDER": {
  //         console.log("sucess data", { user });
  //         setStoreId(user?.storeId);
  //         setStoreUserId(user?.storeUserId)
  //         Alert.alert(
  //           `Welcome ${user.userName} you have been logged in successfully`
  //         );
  //         navigation.navigate("Homepage");
  //         break;
  //       }
  //     }
  //   } else {
  //     Alert.alert("Login Error");
  //   }

  // }

  const customUserLogin=async() =>{
      try {
        const { data } = await axios({
          method: "POST",
          url: `${API_URL}/auth/signin`,
          data: {
            username: username,
            password: password,
          },
        });

        console.log(data)
        if(data){

          try {
            const accountData = await getAccountInfo(data?.accessToken, data?.tokenType)
            if (accountData){
              setRiderDetails(accountData?.data)
              setUser(data);
            }     
          } catch (error) {
            console.log('Something Went Wrong')
          }
        }
        
      } catch (error) {
       console.log(error) 
      }
  }



  return (
      <SafeAreaView style={{top:20}}>
     
        <View style={styles.container}>
          <View style={{width:'100%'}}>
            <Image
              alt="logo"
              
              source={require("../../assets/Photos/elaundry.png")}
             style={{width:150, height:100, resizeMode:'contain', alignSelf:'center'}}
            />
            <View
              style={{
                width: "100%",
                height: 200,
                // marginTop: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                
              }}>
              <Image
                alt="image-2"
                source={require("../../assets/Photos/pngwing.png")}
                style={{margin:'auto', width:'100%', height:'100%', resizeMode:'contain'}}
                
              />
            </View>
          </View>

          <View
            style={{
              top: 35,
            }}>
            <View>
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
                
                  fontSize: 35,
                  lineHeight: 35,
                  fontWeight: "700",
                  color: "#002B6B",
                  textAlign:'center'
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
            </View>
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
            <View
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
            </View>
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
            <View
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
            </View>
          </View>

          <View style={styles.viewButtonTop}>
            <View style={styles.viewButtonSection}>

            
            <CustomButton btnTittle="Submit" bg="green" _width={300} _onPress={customUserLogin} textColor='white' />

            </View>
          </View>
        </View>
   
      </SafeAreaView>
  );
};

export default Welcome;
