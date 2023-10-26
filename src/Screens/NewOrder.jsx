import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../Components/CommonComponent/CustomButton";
import useStore from "../GlobalStore/store";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../networkAPI/env";
// import { searchStoreCustomerByMobile } from "../../networkAPI/api";
//  import { handleAddCustomer } from "../../networkAPI/api";

const NewOrder = () => {
  const navigation = useNavigation();
  const [mobileNo, setMobileNo] = useState("");
  const handleBack = () => {
    navigation.navigate("Homepage");
  };
  const riderDetails = useStore((state) => state.riderDetails);
  const user = useStore((state) => state.user);
  const setAccount = useStore((state) => state.setAccount);
  const setBalance = useStore((state) => state.setBalance);

  //  const getOrder = async()=>{
  //   try {
  //     // https://api.elaundry.co.in/oit-elaundry/api/auth/customer/store-customer/5/9718409025
  //     const {data, status} = await axios.post(`https://api.elaundry.co.in/oit-elaundry/api/auth/customer/store-customer/${riderDetails?.storeId}/${mobileNo}`, {
  //      data:{
  //       "storeId":"5",
  //       "firstName":"Customer",
  //       "mobileNo":`${mobileNo}`
  //      },
  //     headers:{
  //         "Content-Type": "application/json",
  //         'Authorization': `Basic ${user?.accessToken}`
  //       }
  //     })
  //     // console.log('salman khan',  data)
  //     if(status === 200){
  //       setAccount(data[0]?.customer)
  //       setBalance(data[0]?.storeCustomerAccountDTO)
  //       Alert.alert("Succesfully created the Order")
  //       navigation.navigate('Pickup', {'OrderDetails':data[0]?.customer})

  //     }
  //     // console.log(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  //  }

  const getOrder = async () => {
   const storeId = `${riderDetails.storeId}`
   const token = `${user?.accessToken}`
   
    try {
      const {data}  = await axios({
        method: "POST",
        url: `${API_URL}/auth/customer/store-customer/${storeId}/`,
        data: {
          storeId: storeId,
          firstName: "Customer",
          mobileNo: mobileNo,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Basic' + " " + token,
        },
      });
      console.log('nehat shailender', data[0]?.storeCustomerAccountDTO?.storeCustomerId)

      const customerData = {
        name:data[0]?.customer.firstName + ' ' + data[0]?.customer?.lastName, 
        mobileNo:data[0]?.customer?.mobileNo, storeCustomerId : data[0]?.storeCustomerAccountDTO?.storeCustomerId
      }

      if (data) {
        // setAccount(data[0]?.customer);
        // setBalance(data[0]?.storeCustomerAccountDTO);
        Alert.alert("Succesfully created the Order");
        navigation.navigate("Pickup", { OrderDetails: customerData });  
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ flex: 1, width: "100%", backgroundColor: "#F3F1F6" }}>
        <ImageBackground
          source={require("../../assets/Photos/backg.png")}
          alt="background"
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              width: "68%",
              height: 200,
              display: "flex",
              alignItems: "center",
              top: 300,
              left: 63,
              borderStyle: "solid",
              borderColor: "#f3f1f6",
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              NEW ORDER BOOKING
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "400", marginTop: 19 }}>
              Customer Mobile No
            </Text>

            <TextInput
              style={[styles.input]}
              keyboardType="numeric"
              placeholder="Customer mobile"
              value={mobileNo}
              onChangeText={setMobileNo}
            />
          </View>

          <View style={{ display: "flex" }}>
            <View
              style={{
                flexDirection: "row",
                top: 239,
                gap: 6,
                marginLeft: 100,
              }}
            >
              <CustomButton
                btnTittle="Cancel"
                bg="#EC1D1D"
                textColor="white"
                _onPress={handleBack}
              />
              <CustomButton
                btnTittle="Submit"
                bg="green"
                textColor="white"
                _onPress={getOrder}
              />
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
