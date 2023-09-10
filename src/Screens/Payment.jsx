import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { ScrollView } from "native-base";
  import AntDesign from "@expo/vector-icons/build/AntDesign";
  import useStore from "../GlobalStore/store";
  import { getPaymentMode } from "../../networkAPI/api";
  import SelectDropdown from "react-native-select-dropdown";
  import FontAwesome from "react-native-vector-icons/FontAwesome";
  import { useNavigation } from '@react-navigation/native';
  
  
  
  const Payment = () => {
    const navigation = useNavigation()
  
   const [selectedItem, setSelectedItem] = useState("");
    const [payment, setPayment] = useState([]);
    const riderDetails = useStore((state) => state.riderDetails);
    const user = useStore((state) => state.user);
  
    const paymentMode = React.useCallback(async () => {
      try {
        const response = await getPaymentMode(user?.accessToken);
  
        setPayment(response);
      } catch (error) {
        console.log(error);
      }
    }, []);
  
    useEffect(() => {
      paymentMode();
    }, []);
  
  
  
    const handleSelect = (item) => {
      setSelectedItem(item);
  
      }
  
    
  
    console.log("line no 31", { payment });
  
    return (
      <SafeAreaView>
        <ScrollView>
          <View
            style={{ height: 1140, width: "100%", backgroundColor: "#F3F1F6" }}
          >
            <View
              style={{
                marginLeft: 5,
                marginTop: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <AntDesign
                  name="left"
                  size={24}
                  color="#5D7EFC"
                  style={{ marginTop: 30, marginLeft: 10 }}
                />
              </TouchableOpacity>
  
              <View
                style={{
                  width: 242,
                  height: 34,
                  marginTop: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    lineHeight: 44,
                    fontWeight: "600",
                    color: "#002B6B",
                  }}
                >
                  Order Submit
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    color: "#000000",
                  }}
                >
                  Order Submit Now
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 30,
                marginLeft: 22,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  marginLeft: 6,
                  width: 165,
                  height: 38,
                  borderColor: "#FFFF",
                  borderStyle: "solid",
                  borderWidth: 1,
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "400",
                  }}
                >
                  Name : {riderDetails?.userName}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 8,
                  width: 165,
                  height: 38,
                  borderColor: "#FFFF",
                  borderStyle: "solid",
                  borderWidth: 1,
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "400",
                  }}
                >
                  Mobile: {riderDetails?.mobileNo}
                </Text>
              </View>
            </View>
            <View style={{ top: 10, left: 30, marginBottom: 20 }}>
              <SelectDropdown
                data={payment.map(
                  (item) => item
                  
                )}
                onSelect={(selectedItem, index) => {
                  handleSelect(selectedItem);
                  setPayment(payment[index]);
                }}
                defaultButtonText={"Select Payment Mode"}
                buttonTextAfterSelection={() =>
                  selectedItem || "Select Payment Mode"
                }
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={17}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Payment;
  
  const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
  
    dropdown1BtnStyle: {
      width: "85%",
      height: 50,
      backgroundColor: "#FFF",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "cyan",
    },
    dropdown1BtnTxtStyle: { color: "black", textAlign: "left", fontSize: 16 },
    dropdown1DropdownStyle: { backgroundColor: "black" },
    dropdown1RowStyle: {
      backgroundColor: "grey",
      borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: { color: "#444", textAlign: "left", fontSize: 17 },
  
    dropdown2BtnStyle: {
      width: "80%",
      height: 50,
      backgroundColor: "#444",
      borderRadius: 8,
    },
    dropdown2BtnTxtStyle: {
      color: "#FFF",
      textAlign: "center",
      fontWeight: "bold",
    },
    dropdown2DropdownStyle: {
      backgroundColor: "#444",
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
    dropdown2RowTxtStyle: {
      color: "#FFF",
      textAlign: "center",
      fontWeight: "bold",
    },
  });
  