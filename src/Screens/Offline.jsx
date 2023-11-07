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
import useStore from "../GlobalStore/store";
import Feather from "@expo/vector-icons/build/Feather";


const Offline = ({navigation}) => {

  const riderDetails = useStore((state) => state.riderDetails);

  console.log(riderDetails)




  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={{ height: 820, width: "100%", backgroundColor: "#F3F1F6",left:0 }}
        >
          
          <View
            style={{
              marginLeft: 10,
              marginTop: 10,
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
                size={30}
                color="#5D7EFC"
                style={{ marginTop: 30, marginLeft: 10 }}
              />
            </TouchableOpacity>
        
            <Image
            alt="ios-bars"
            source={require("../../assets/Photos/bar.png")}
            style={{ marginTop: 32, marginRight: 20, height: 22, width: 22 }}
          />
          </View>

       
          <Text
            style={{
              
              fontSize: 24,
              lineHeight: 45,
              fontWeight: "600",
              color: "#002B6B",
              textAlign:"center",
              top:20
            }}
          >
            Welcome back!
          </Text>
          

    

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

          <Text
            style={{
            
              fontSize: 24,
              fontWeight: "700",
              color: "#002B6B",
              width: 165,
              padding: 10,
              height: 31,
              borderRadius: 7,
              textAlign: "center",
              lineHeight: 14,
           
            }}
          >
     
            {riderDetails?.userName}

          </Text>
          {/* email and other deatails have been filled here */}

          <View style={{ marginTop: 20, marginLeft: 30 }}>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="email-address"
              value={riderDetails.email}
             
            />
          </View>
          <View style={{ marginTop: 10, marginLeft: 30 }}>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>Role</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="ascii-capable"
              value={riderDetails.role.replace(/_/g, " ")}
            />
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
