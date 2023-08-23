import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  Text, 
  Button,
  Platform,
  TouchableOpacity
} from "react-native";
// import { Box, Text, Button, ScrollView } from "native-base";
import React, { useState } from "react";
import { searchStoreCustomerByMobile } from "../../networkAPI/api";
import { getRiderMobileNo, getStoreId, setRiderMobileNo } from "../../networkAPI/services/auth.service";
// import Pickup from "../../Components/pickup";



const NewOrder = ({ navigation }) => {
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
    <ScrollView>
        <View
          style={{ height: 926, width: "100%", backgroundColor: "#F3F1F6" }}>
          <View
            style={{
              width: "65%",
              height: 200,
              display: "flex",
              alignItems: "center",
              top: 300,
              left: 63,
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
          </View>
          <View style={{ display: "flex" }}>
            <View
              style={{
                flexDirection: "row",
                top: 228,
                gap: 5,
                marginLeft: 58,
              }}>
              <TouchableOpacity
                variant="solid"
                width="141px"
                height="48px"
                colorScheme="darkText"
                borderRadius="xl"
                backgroundColor="red.600"
                onPress={handleBack}>
                <Text style={{ fontSize: 17, color: "#000" }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                variant="solid"
                backgroundColor="green.400"
                width="141px"
                height="48px"
                borderRadius="xl"
                // onPress={handleMobileValidation}
                onPress={getSearchStoreCustomerByMobile}

              >
                <Text>SUBMIT</Text>
              </TouchableOpacity>
              <View>
                {/* <Pickup /> */}
              </View>

            </View>

          </View>

        </View>
    </ScrollView>
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

function sendtoken(arg0) {
  throw new Error("Function not implemented.");
}
