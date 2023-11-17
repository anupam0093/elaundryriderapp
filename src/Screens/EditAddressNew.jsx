import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    ScrollView,
  } from "react-native";
  import useStore from "../GlobalStore/store";
  import React, { useState } from "react";
  import CustomButton from "../../Components/CommonComponent/CustomButton";
  import { TextInput } from "react-native-paper";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { API_URL } from "../../networkAPI/env";
  import axios from "axios";
  
  const EditAddressNew = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const user = useStore((state) => state.user);
    const [id,setId] = useState("")
    const [ad1, setAd1] = useState("")
    const [ad2, setAd2] = useState("")
    const [contact, setContact] = useState(route?.params?.customerDetails?.mobileNo || "")
    const [landmark, setLandmark] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState("")
   
  
  
  
  const addressCart = {
  
    "id": 0,
    "addressLine1": ad1,
    "addressLine2": ad2,
    "city": city,
    "contactNo": contact ,
    "landmark": landmark,
    "state": state,
    "pin": pincode,
    "default": false
  
  
  }
  

  const handleContact = (cont,ad_1,ad_2,cit,st,pin,land )=>{
  setContact(cont)
  setAd1(ad_1)
  setAd2(ad_2)
  setCity(cit)
  setState(st)
  setPincode(pin)
  setLandmark(land)
  }
  
 
  
  console.log(route?.params?.myN)

console.log(ad1)

  
    const updatAddress = async () => {
      const token = `${user?.accessToken}`;
      try {
        const { data } = await axios({
          method: "POST",
          url: `${API_URL}/auth/customer/${route?.params?.customerDetails?.storeCustomerId}/customer-address`,
          data: addressCart,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic" + " " + token,
          },
        });
        console.log(data)
        if (data?.success) {
          console.log(data?.message)
          alert(`${data?.message}`);
        
         
        }
      } catch (error) {
        console.log({error},"error in line 122")
        alert("Something Went Wrong");
      }
    };
  
    return (
      <ScrollView>
        <SafeAreaView>
          <View
            style={{ height: 926, width: "100%", backgroundColor: "#13519E" }}
          >
            <ImageBackground
              source={require("../../assets/Photos/backg.png")}
              alt="background"
              resizeMode="contain"
              style={{ width: "100%", height: "96%" }}
            >
              <View
                style={{
                  width: "80%",
                  height: "65%",
                  padding: 10,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  borderRadius: 10,
                  marginTop: 100,
                  left: 40,
                  display: "flex",
                }}
              >
                <View style={{ width: "100%", display: "flex",justifyContent:"center" ,marginTop:10,alignContent:"center"}}>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 15,
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
                      fontSize: 15,
                    }}
                  >
                    Customer Name : {route?.params?.customerDetails?.name}{" "}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      marginTop: 10,
                      fontWeight: "bold",
                      fontSize: 15,
                      width: "100%",
                    }}
                  >
                    Customer Mobile : {route?.params?.customerDetails?.mobileNo}{" "}
                  </Text>
                </View>
  
                <View
                  style={{
                    width: "90%",
                    height: 310,
                    marginTop: 7,
                    display: "flex",
                    gap: 8,
                    left: 10,
                    top: 30,
                  }}
                >
                  <TextInput
                    style={{ width: "100%", height: 50 }}
                    label="Addres Line 1"                  
                    value={ad1}
                    onChangeText={(text) => setAd1(text)}
                  
                  />
                  <TextInput
                    style={{ width: "100%", height: 50 }}
                    label="Addres Line 2"
                    value={ad2}
                    onChangeText={(text) => setAd2(text)}
                  />
  
                  <TextInput
                    style={{ width: "100%", height: 50 }}
                    label="Contact No"
                    value={contact} 
                    onChangeText={handleContact}
                  />
                  <TextInput
                    style={{ width: "100%", height: 50 }}
                    label="Landmark"
                    value={landmark}
                    onChangeText={(text) => setLandmark(text)}
                  />
                  <View
                    style={{ display: "flex", flexDirection: "row", gap: 15 }}
                  >
                    <TextInput
                      style={{ width: "100%", height: 50, flex: 1 }}
                      label="City"
                      value={city}
                      onChangeText={(text) => setCity(text)}
                    />
                    <TextInput
                      style={{ width: "100%", height: 50, flex: 1 }}
                      label="State"
                      value={state}
                      onChangeText={(text) => setState(text)}
                    />
                  </View>
  
                  <TextInput
                    style={{ width: "100%", height: 50 }}
                    label="Pincode"
                    value={pincode}
                    onChangeText={(text) => setPincode(text)}
                  />
  
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 22,
                      marginTop: 5,
                      width: 258,
                    }}
                  >
                    <CustomButton
                      btnTittle="Back"
                      bg="#EC1D1D"
                      textColor="white"
                      _width="47%"
                      
                      _onPress={() => navigation.goBack()}
                    />
  
                    <CustomButton
                      btnTittle="Update"
                      bg="green"
                      textColor="white"
                      _width="47%"
                      _onPress={updatAddress}
                    />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  };
  
  export default EditAddressNew;
  