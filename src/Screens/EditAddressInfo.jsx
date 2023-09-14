import { View, Text, SafeAreaView, ImageBackground,ScrollView } from "react-native";
import useStore from "../GlobalStore/store";
import React from "react";
import CustomButton from "../../Components/CommonComponent/CustomButton";
import {TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


const EditAddressInfo = () => {
  const navigation = useNavigation();

  const account = useStore((state) => state.account);

  return (
    <ScrollView>
        <SafeAreaView>
      <View style={{ height: 926, width: "100%", backgroundColor: "#13519E" }}>
        <ImageBackground
          source={require("../../assets/Photos/backg.png")}
          alt="background"
          resizeMode="contain"
          style={{ width: "100%", height: "96%" }}
        >
          <View
            style={{ width: 258, height: 440, margin: 0, top: 148, left: 70 }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 19,
                }}
              >
                ADD NEW ADDRESS
              </Text>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: 20,
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                Customer Mobile : {account?.mobileNo}{" "}
              </Text>
            </View>
       
       
            <View
              style={{
                width: 258,
                height: 310,
                marginTop: 10,
                display: "flex",
                gap: 8,
              }}
            >
              <TextInput
                style={{ width: "100%", height: 50 }}
                label="Addres Line 1"
              />
              <TextInput
                
                style={{ width: "100%", height: 50 }}
                label="Addres Line 2"
              
              />
              <TextInput
             
                style={{ width: "100%", height: 50 }}
                label="Addres Line 1"
                
              />
              <TextInput
                
                style={{ width: "100%", height: 50 }}
                label="Contact No"
             
              />
              <TextInput
                
                style={{ width: "100%", height: 50 }}
                label="Landmark"
             
              />
              <View style={{display:"flex",flexDirection:"row",gap:10}}>
              <TextInput
                
                style={{ width: "100%", height: 50,flex:1 }}
                label="City"
             
              />
              <TextInput
                
                style={{ width: "100%", height: 50,flex:1, }}
                label="State"
             
              />
               
              </View>

              <View style={{display:"flex",flexDirection:"row",gap:7,marginTop:10,width:258}} >
              <CustomButton btnTittle="Cancel" bg ="#EC1D1D" textColor="white" _width="50%" _onPress={()=> navigation.goBack()} />
  
              <CustomButton btnTittle="Submit" bg ="green" textColor="white"  _width="50%"  />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
    </ScrollView>
  
  );
};

export default EditAddressInfo;
