import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "native-base";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import useStore from "../GlobalStore/store";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import { getChargeByStoreId, getDiscountByStoreId } from "../../networkAPI/api";
import { Card, Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Checkout = () => {
  const navigation = useNavigation();

  const Gst = ["No GST", "Including GST", "Excluding GST"];

  const [charge, setCharge] = useState([]);
  const [charges, setCharges] = useState([]);
  const [discount, setDiscount] = useState([]);
  console.log({ charges });

  const [selectedItem, setSelectedItem] = useState("");
  const [discounSelect, setdiscountSelect] = useState("");
  const [discounteditem, setDiscounteditem] = useState([]);
  const [cards, setCards] = useState([]);
  const [discountcards, setdiscountCards] = useState([]);

  const riderDetails = useStore((state) => state.riderDetails);
  const user = useStore((state) => state.user);

  const ChargeByStoreId = React.useCallback(async () => {
    try {
      const response = await getChargeByStoreId(
        riderDetails?.storeId,
        user?.accessToken
      );

      setCharge(response);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const discountByStoreId = React.useCallback(async () => {
    try {
      const response = await getDiscountByStoreId(
        riderDetails?.storeId,
        user?.accessToken
      );

      setDiscount(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    ChargeByStoreId();
    discountByStoreId();
  }, []);

  const handleSelect = (item) => {
    setSelectedItem(item);
    Alert.alert("Charge Added Successfully");
    // Create a card with the selected data
    const cardData = charge.find((d) => d.name === item);
    if (cardData) {
      setCards([...cards, cardData]);
    }
  };

  const cart = useStore((state) => state.cart);
  

  var totalPrice = cart?.reduce((acc, item) => acc + item.qty * item.price, 0);

  cart.map((item) => {
    const x = totalPrice;
    console.log({ x });
    return totalPrice;
  });

  const hadndleDiscount = (item) => {
    setdiscountSelect(item);
    Alert.alert("Charge Added Successfully");
    const discountData = discount.find((d) => d.name === item);
    if (discountData) {
      setdiscountCards([...discountcards, discountData]);
    }
  };

  const RemoveCharge = () => {
    Alert.alert("Charge Removed Successfully");
    setCharges("");
  };
  const RemoveDiscount = () => {
    Alert.alert("Charge Removed Successfully");
    setDiscounteditem("");
  };

  console.log("line103", charge);

  //======================================== Calculation for Gross Amount ===============================================

  var Gross =
    Number(totalPrice) +
    Number(charges?.chargeDiscount) -
    Number(discounteditem?.chargeDiscount);
  console.log({ Gross });

  var Gstc = (Gross * 0.18).toFixed(2);

  var taxableAmount = Gross.toFixed(2);
  var GrandTotal = Number(Gross) + Number(Gstc);

//  const setGrandTotal = useStore(state=>state.setGrandTotal)
// setGrandTotal(GrandTotal)


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
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
                Checkout
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#000000",
                }}
              >
                Checkout Final Submission
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

          {/* CHARGES  COMING FROM BACKEND */}

          <View style={{ top: 10, left: 30, marginBottom: 20 }}>
            <SelectDropdown
              data={charge.map(
                (item) =>
                  ` ${item.name}  ${"["} ${item.chargeDiscountType}${":"} ${
                    item.chargeDiscount
                  }${
                    item.chargeDiscountTypeIn === "AMOUNT" ? " Rs" : "%"
                  } ${"]"}`
              )}
              onSelect={(selectedItem, index) => {
                handleSelect(selectedItem);
                setCharges(charge[index]);
              }}
              defaultButtonText={"Add Charges"}
              buttonTextAfterSelection={() =>
                selectedItem || "Select an option"
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

          <View style={{ left: 30, marginBottom: 10 }}>
            <SelectDropdown
              data={discount.map(
                (item) =>
                  ` ${item.name}  ${"["} ${item.chargeDiscountType}${":"} ${
                    item.chargeDiscount
                  }${
                    item.chargeDiscountTypeIn === "AMOUNT" ? " Rs" : "%"
                  } ${"]"}`
              )}
              onSelect={(discounSelect, index) => {
                hadndleDiscount(discounSelect);
                setDiscounteditem(discount[index]);
                console.log("line260", discounteditem);
              }}
              defaultButtonText={"Add Discount"}
              buttonTextAfterSelection={() =>
                discounSelect || "Select an option"
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
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>

          <View style={{ left: 30, marginBottom: 10 }}>
            <SelectDropdown
              data={Gst}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText={"Select GST"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
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
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />

            <ScrollView style={styles.cardsContainer}>
              {charges && (
                <Card style={styles.card}>
                  <Text>{charges.name}</Text>
                  <View>
                    <Text>Description: {charges.description}</Text>
                    <Text>Charge: {charges.chargeDiscount} Rs</Text>
                  </View>
                  <Entypo
                    style={{ left: 300, bottom: 40 }}
                    onPress={RemoveCharge}
                    name="circle-with-cross"
                    size={24}
                    color="red"
                  />
                </Card>
              )}
            </ScrollView>
            <ScrollView style={styles.cardsContainer}>
              {discounteditem && (
                <Card style={styles.card}>
                  <View>
                    <Text>{discounteditem.name}</Text>
                  </View>

                  <View>
                    <Text>Description: {discounteditem.description}</Text>
                    <Text>Charge: {discounteditem.chargeDiscount} Rs</Text>
                  </View>
                  <Entypo
                    style={{ left: 300, bottom: 40 }}
                    onPress={RemoveDiscount}
                    name="circle-with-cross"
                    size={24}
                    color="red"
                  />
                </Card>
              )}
            </ScrollView>
          </View>

          <View style={{ left: 30 }}>
            <SelectDropdown
              data={Gst}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText={"Delevery Date "}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "calendar" : "calendar"}
                    color={"#444"}
                    size={24}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>

          <View
            style={{
              width: "85%",
              height: 340,
              borderColor: "cyan",
              borderStyle: "solid",
              borderWidth: 1,
              marginTop: 14,
              left: 30,
              display: "flex",
              padding: 20,
            }}
          >
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Total Amount (Rs):
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                  {"\u20B9"} {totalPrice}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Charges (Rs):
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                  {"\u20B9"} {charges?.chargeDiscount}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Discount (Rs):
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                  {"\u20B9"} {discounteditem?.chargeDiscount}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Gross Amount (Rs):
                </Text>

                <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                  {"\u20B9"} {Gross}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Taxable Amount (Rs):
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                  {"\u20B9"} {taxableAmount}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  GST (Rs) 18% :
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                  {"\u20B9"} {Gstc}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }} t>
                  Grand Total (Rs) :
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                  {"\u20B9"} {GrandTotal.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          <Button
            onPress={() => navigation.navigate("Payment",{"grandTotal":GrandTotal.toFixed(2)})}
            buttonColor="blue"
            textColor="white"
            style={{
              borderColor: "cyan",
              borderWidth: 1,
              borderStyle: "solid",
              width: "40%",
              left: 110,
              marginTop: 15,
              padding: 5,
            }}
          >
            Booked
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

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
  container: {
    padding: 10,
    width: "auto",
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
  },
  cardsContainer: {
    marginTop: 10,
    width: 340,
  },
  card: {
    marginBottom: 10,
    padding: 7,
  },
});
