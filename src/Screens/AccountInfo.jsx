import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "../../Components/Styles/welcome";
import useStore from "../GlobalStore/store";
import axios from "axios";
import { API_URL } from "../../networkAPI/env";

const AccountInfo = () => {
  const navigation = useNavigation();
  // const windowWidth = Dimensions.get("window").width;

  const user = useStore((state) => state.user);
  const route = useRoute();
  console.log(route?.params?.customerDetails?.storeCustomerId);

  const [balanceAmount, setBalanceAccount] = React.useState([]);
  console.log(balanceAmount[0]?.scstatus)

  const walletBalance = async () => {
    const token = `${user?.accessToken}`;
    try {
      const { data } = await axios({
        method: "GET",
        url: `${API_URL}/auth/customer/store-customer/${route?.params?.customerDetails?.storeCustomerId}`,

        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic" + " " + token,
        },
      });
      setBalanceAccount(data)
      // console.log("data in on ", data?.storeCustomerAccountDTO);
    } catch (error) {
      console.log({ error }, "error in line 122");
    }
  };

  useEffect(() => {
    walletBalance();
  }, []);


  console.log(balanceAmount[0]?.storeCustomerAccountDTO)

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            marginLeft: "5%",
            marginTop: "5%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="#5D7EFC" />
          </TouchableOpacity>
          <View style={{ width: "52%", marginTop: "2%" }}>
            <Text style={{ fontSize: 24, fontWeight: "600", color: "#002B6B" }}>
              Account Info
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "#000000" }}>
              Customer Account Info
            </Text>
          </View>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </View>

        <View
          style={{
            marginTop: "5%",
            marginLeft: "5%",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "45%",
              height: 40,
              borderColor: "black",
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
                fontWeight: "600",
              }}
            >
              Name: {route?.params?.customerDetails?.name}{" "}
              {route?.params?.customerDetails?.nameL}
            </Text>
          </View>
          <View
            style={{
              marginLeft: "2%",
              width: "49%",
              height: 40,
              borderColor: "black",
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
                fontWeight: "600",
              }}
            >
              Mobile: {route?.params?.customerDetails?.mobileNo}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: "90%",
            height: 300,
            borderColor: "#D9D9D9",
            borderWidth: 1,
            marginTop: "5%",
            marginLeft: "5%",
            paddingLeft: "5%",
            paddingRight: "5%",
            backgroundColor: "#D9D9D9",
          }}
        >
          {renderInfo("Wallet Status", balanceAmount[0]?.scstatus)}
          {renderInfo("Credit Limit", balanceAmount[0]?.storeCustomerAccountDTO?.creditLimit )}
          {renderInfo("Available Limit",  balanceAmount[0]?.storeCustomerAccountDTO?.availableLimit)}
          {renderInfo("Balance Unit",  balanceAmount[0]?.storeCustomerAccountDTO?.balanceUnit)}
          {renderInfo("Advance Limit",  balanceAmount[0]?.storeCustomerAccountDTO?.advanceUnit)}
        </View>
      </View>
    </SafeAreaView>
  );

  function renderInfo(label, value) {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 40,
          borderColor: "#CDCACA",
          borderWidth: 1,
          backgroundColor: "#CDCACA",
          marginTop: "5%",
        }}
      >
        <View style={{ width: "70%" }}>
          <Text
            style={{
              color: "#000000",
              fontSize: 15,
              fontWeight: "bold",
              marginTop: "3%",
              marginLeft: "3%",
            }}
          >
            {label}
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text
            style={{
              color: "#002B6B",
              fontSize: 16,
              fontWeight: "400",
              marginTop: "5%",
            }}
          >
            {value}
          </Text>
        </View>
      </View>
    );
  }
};

export default AccountInfo;
