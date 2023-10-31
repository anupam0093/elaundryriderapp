import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";
import useStore from "../GlobalStore/store";
import React from "react";
import CustomButton from "../../Components/CommonComponent/CustomButton";
import { TextInput } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditAddressInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const account = useStore((state) => state.account);

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
                height: "70%",
                padding: 10,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderRadius: 10,
                marginTop: 50,
                left: 40,
                display: "flex",
              }}
            >
              <View style={{ width: "100%", display: "flex",justifyContent:"center" }}>
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
                  marginTop: 10,
                  display: "flex",
                  gap: 8,
                  left: 10,
                  top: 30,
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
                <View
                  style={{ display: "flex", flexDirection: "row", gap: 10 }}
                >
                  <TextInput
                    style={{ width: "100%", height: 50, flex: 1 }}
                    label="City"
                  />
                  <TextInput
                    style={{ width: "100%", height: 50, flex: 1 }}
                    label="State"
                  />
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 7,
                    marginTop: 5,
                    width: 258,
                  }}
                >
                  <CustomButton
                    btnTittle="Cancel"
                    bg="#EC1D1D"
                    textColor="white"
                    _width="47%"
                    
                    _onPress={() => navigation.goBack()}
                  />

                  <CustomButton
                    btnTittle="Submit"
                    bg="green"
                    textColor="white"
                    _width="47%"
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

export default EditAddressInfo;
