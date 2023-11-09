import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import useStore from "../GlobalStore/store";
import { getPaymentMode, searchDeliveryData } from "../../networkAPI/api";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { API_URL } from "../../networkAPI/env";

const DeliveryPayment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [delivery, setDelivery] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [payment, setPayment] = useState([]);
  const [payments, setPayments] = useState([]);
  const user = useStore((state) => state.user);
  const [text, setText] = useState("");

  const getDeliveryData = async () => {
    const token = `${user?.accessToken}`;

    try {
      const { data } = await axios({
        method: "GET",
        url: `${API_URL}/auth/order/${route?.params?.customerDetails?.storeCustomerId}/${route?.params?.customerDetails?.orderId}`,

        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic" + " " + token,
        },
      });

      if (data) {
        setDelivery(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    getDeliveryData();
  }, []);

  const handleSelect = (item) => {

      setSelectedItem(item);
     
  };

  // const handleFinal = () => {
  //   if (!selectedItem) {
  //     Alert.alert("Please select a mode of payment");
  //   } else {
  //     navigation.navigate("Homepage");
  //   }
  // };

  const remain =
    Number(delivery[0]?.grandTotal) - Number(delivery[0]?.paidAmount);
  console.log("line 62", delivery[0]?.orderPaymentStatus);
  // console.log(text);

  console.log(route?.params?.customerDetails);
  console.log(delivery[0]?.orderItem[1]?.qrCode[0]);

  const customDeliver = {
    orderChargeDiscountDTO: {},
    paymentDTO: {
      receivedBy: "7",
      paidBy: route?.params?.customerDetails?.storeCustomerId,
      amount: remain,
      paymentMode: selectedItem || "",
      paymentRefNo: "",
    },
    garmentList: [Number(delivery[0]?.orderItem[0]?.qrCode[0]?.orderItemId)],
  };

  //========================================= deliver Post aPi=======================================================

  const deliverOrder = async () => {
    const token = `${user?.accessToken}`;
    try {
      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/auth/order/delivery`,
        data: customDeliver,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic" + " " + token,
        },
      });
      console.log(data);
      if (data?.success) {
        console.log(data?.message);
        alert(`${data?.message}`);
        navigation.navigate("OrderDelevery");
      }
    } catch (error) {
      console.log({ error }, "error in line 122");
      alert("Something Went Wrong Please select Payment mode and Advance Amount");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{ height: 1040, width: "100%", backgroundColor: "#F3F1F6" }}
        >
          <View
            style={{
             
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
                style={{ marginTop: 30,  }}
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
                  fontSize: 28,
                  lineHeight: 30,
                  fontWeight: "600",
                  color: "#002B6B",
                }}
              >
                Order Delivery
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "400",
                  color: "#000000",
                  marginTop:7
                }}
              >
                Order Delivery : {route?.params?.customerDetails?.name}{" "}
                {route?.params?.customerDetails?.nameL}
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
                height: 40,
                borderColor: "black",
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
                  fontWeight: "500",
                }}
              >
                Name {route?.params?.customerDetails?.name}{" "}
                {route?.params?.customerDetails?.nameL}
              </Text>
            </View>
            <View
              style={{
                marginLeft: 8,
                width: 160,
                height: 40,
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 1,
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                Mobile {route?.params?.customerDetails?.mobileNo}
              </Text>
            </View>
          </View>

          {delivery[0]?.orderPaymentStatus === "PAID" ?(
           <>
 
         <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%",
              left: 30,
              top: 20,
              marginBottom: 10,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              t
            >
              Payment Status :
            </Text>
            <Text
              style={{ fontSize: 17, fontWeight: "500", top: 5, color: "red" }}
            >
              {delivery[0]?.orderPaymentStatus}
            </Text>
          </View>
          <Button
            onPress={deliverOrder}
            buttonColor="blue"
            textColor="white"
            focusable={true}
            style={{
              borderColor: "cyan",
              borderWidth: 1,
              borderStyle: "solid",
              width: "86%",
              left: 30,
              marginTop: 15,
              padding: 5,
              top: 30,
            }}
          >
            <Entypo
              name="save"
              size={25}
              color="white"
              style={{ marginTop: 2 }}
            />
            {"  "}
            Deliver Now
          </Button>
           </>
            
            
          ):
          (
            <>
                      <View style={{ top: 10, left: 30, marginBottom: 20 }}>
            <SelectDropdown
              data={payment.map((item) => item)}
              onSelect={(selectedItem, index) => {
                handleSelect(selectedItem);
                setPayments(payment[index]);
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
          <TextInput
            style={{ width: "85%", left: 30 }}
            value={text}
            onChangeText={(text) => setText(text)}
            label="Remain Amount"
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%",
              left: 30,
              top: 20,
              marginBottom: 10,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              t
            >
              Payment Status :
            </Text>
            <Text
              style={{ fontSize: 17, fontWeight: "500", top: 5, color: "red" }}
            >
              {delivery[0]?.orderPaymentStatus}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%",
              left: 30,
              top: 20,
              marginBottom: 10,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              t
            >
              Paid Amount :
            </Text>
            <Text
              style={{ fontSize: 17, fontWeight: "500", top: 5, color: "red" }}
            >
              {delivery[0]?.paidAmount}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%",
              left: 30,
              top: 20,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "skyblue" }}
              t
            >
              Total Amount :
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "500", top: 5 }}>
              ₹ {delivery[0]?.grandTotal}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%",
              left: 30,
              top: 26,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "skyblue" }}
            >
              Remaining Amount :
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "500", top: 5 }}>
              ₹ {remain}
            </Text>
          </View>

          <Button
            onPress={deliverOrder}
            buttonColor="blue"
            textColor="white"
            focusable={true}
            style={{
              borderColor: "cyan",
              borderWidth: 1,
              borderStyle: "solid",
              width: "86%",
              left: 30,
              marginTop: 15,
              padding: 5,
              top: 30,
            }}
          >
            <Entypo
              name="save"
              size={25}
              color="white"
              style={{ marginTop: 2 }}
            />
            {"  "}
            Pay Now
          </Button>
            </>
          )
          }

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryPayment;

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
