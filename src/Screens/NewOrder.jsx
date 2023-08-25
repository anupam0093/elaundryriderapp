import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
  Text,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { searchStoreCustomerByMobile } from "../../networkAPI/api";
import { getRiderMobileNo, getStoreId, setRiderMobileNo } from "../../networkAPI/services/auth.service";
// import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../Components/CommonComponent/CustomButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import useStore from "../GlobalStore/store";
import axios from "axios";
import { API_URL } from "../../networkAPI/env";
import { useNavigation } from "@react-navigation/native";

// import Pickup from "../../Components/pickup";

// interface NavigationProps {
//   navigation?: any;
// }

const NewOrder = () => {

  const navigation = useNavigation()


  const [ mobileNo, setMobileNo ] = useState('')
  console.log(mobileNo)

  const handleBack = () => {
    navigation.navigate("Homepage");
  };

  

  const [ customerInfo, setCustomerInfo ] = React.useState([]);

  const riderDetails = useStore(state=>state.riderDetails)
  const user = useStore(state=>state.user)
  // console.log(riderDetails)


 

  const getSearchStoreCustomerByMobile = React.useCallback(async () => {
    try {
      // https://api.elaundry.co.in/oit-elaundry/api/auth/customer/store-customer/5/9718409025
      const {data, status} = await axios.get(`https://api.elaundry.co.in/oit-elaundry/api/auth/customer/store-customer/${mobileNo}/${riderDetails?.storeId}`, {
        headers:{
          "Content-Type": "application/json",
          'Authorization': `Basic ${user?.accessToken}`
        }
      })
      console.log('salman khan',  data)
      if(status === 200){
        navigation.navigate('Pickup', {'OrderDetails':data[0]?.customer})
      }
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  }, [ ]);




  return (
      <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}} >
        <View
          style={{ flex:1 ,width: "100%", backgroundColor: "#F3F1F6" }}>
          <ImageBackground
             source={require("../../assets/Photos/backg.png")}
             alt="background"
             resizeMode="contain"
             style={{ width:'100%', height:'100%' }}>
              <View
            style={{
              width: '100%',
              height: 200,
              display: "flex",
              alignItems: "center",
              top: 300,
              left: 63,
              borderStyle:"solid",
              borderColor:"#f3f1f6",
              borderWidth:1
            }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              NEW ORDER BOOKING
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "400", marginTop: 19 }}>
              Customer Mobile No
            </Text>

            <TextInput
              style={[ styles.input ]}
              placeholder="Customer mobile"
              value={mobileNo}
              onChangeText={setMobileNo}
            />
          </View> 
          
          <View style={{ display: "flex" }}>
            <View
              style={{
               flexDirection:"row",
                top: 239,
                gap: 6,
                marginLeft: 100,
                
              }}>

              <CustomButton btnTittle="Cancel" bg ="red"  _onPress={handleBack}/>
              

 
              <CustomButton btnTittle="Submit" bg ="green" _onPress={()=>getSearchStoreCustomerByMobile()} />

              
            </View>

          </View>

            
          </ImageBackground>
        

        </View>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    justifyContent: "center",
    marginTop: 7,
    marginLeft: 5,
    fontWeight: "400",
    width: 210,
    height: 40,
    textAlign: "center",
    color: "black",
    backgroundColor: "#DCDCDE",
    borderRadius: 7,
  },
});

export default NewOrder;


