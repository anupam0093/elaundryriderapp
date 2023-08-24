import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
  Text,
  ImageBackground,
} from "react-native";
import { Box } from "native-base";
import React, { useState } from "react";
import { searchStoreCustomerByMobile } from "../../networkAPI/api";
import { getRiderMobileNo, getStoreId, setRiderMobileNo } from "../../networkAPI/services/auth.service";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../Components/CommonComponent/CustomButton";

// import Pickup from "../../Components/pickup";

// interface NavigationProps {
//   navigation?: any;
// }

const NewOrder = ( {navigation}) => {
  // validation starts here //
  const [ mobileNo, setMobileNo ] = useState("")



  const handleBack = () => {
    navigation.navigate("Homepage");
  };

  // const handleMobileValidation = () => {
  //   // Email regex pattern
  //   const mobileRegex = /^[0]?[789]\d{9}$/;

  //   if (mob.length === 0) {
  //     Alert.alert("Error ❓❓", "Please enter an Customer MobileNumber");
  //   } else if (!mobileRegex.test(mob)) {
  //     Alert.alert("Error❓❓", "Please enter a valid Mobile Number");
  //   } else if (mob.length < 10) {
  //     Alert.alert("Error❓❓", "Please enter a 10 Digit number");
  //   } else {
  //     Alert.alert("Success ✅✅", "Successfully registered");

  //     navigation.navigate("Pickup");
  //   }
  // };

  const [ customerInfo, setCustomerInfo ] = React.useState([]);
  const getSearchStoreCustomerByMobile = React.useCallback(async () => {
    try {
      const response = await searchStoreCustomerByMobile(

        //@ts-expect-error
        getStoreId(), mobileNo
      );
      console.log({ response })
      console.log(response[ 0 ].customer.status)
      if (response[ 0 ].customer.status === "ACTIVE") {
        setCustomerInfo(response)
        setRiderMobileNo(response[ 0 ].customer.mobileNo)
        navigation.navigate('Pickup')

      }
      else {
        Alert.alert("You are not registered")
      }


    } catch (error) {
      console.log(error);
    }
  }, [ mobileNo ]);

  console.log({ customerInfo });


  return (
      <SafeAreaView>
        <View
          style={{ height: 926, width: "100%", backgroundColor: "#F3F1F6" }}>
          <ImageBackground
             source={require("../../assets/Photos/backg.png")}
             alt="background"
             resizeMode="contain"
             style={{ height: 926, width: 428 }}>
              <Box
            style={{
              width: "58%",
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
              keyboardType="phone-pad"
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
            />
          </Box>
          
          <Box style={{ display: "flex" }}>
            <View
              style={{
               flexDirection:"row",
                top: 239,
                gap: 6,
                marginLeft: 100,
                
              }}>

              <CustomButton btnTittle="Cancel" bg ="red"  _onPress={handleBack}/>
              

 
              <CustomButton btnTittle="Submit" bg ="green" _onPress={getSearchStoreCustomerByMobile} />

              <View>
                {/* <Pickup /> */}
              </View>

            </View>

          </Box>

            
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


