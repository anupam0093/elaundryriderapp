import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "../../Components/Styles/welcome";
import useStore from "../GlobalStore/store";


const AccountInfo = () => {
  const navigation = useNavigation()
  // const windowWidth = Dimensions.get("window").width;


const account = useStore(state => state.account)
const balance = useStore(state => state.balance)
const route = useRoute()


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
              borderColor: "#FFFF",
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
              Name: {route?.params?.customerDetails?.name}
            </Text>
          </View>
          <View
            style={{
              marginLeft: "2%",
              width: "49%",
              height: 40,
              borderColor: "#FFFF",
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
            height:300,
            borderColor: "#D9D9D9",
            borderWidth: 1,
            marginTop: "5%",
            marginLeft: "5%",
            paddingLeft: "5%",
            paddingRight: "5%",
            backgroundColor: "#D9D9D9",
          }}
        >
          {renderInfo("Wallet Status", "status")}
          {renderInfo("Credit Limit", "creditLimit")}
          {renderInfo("Available Limit", "balanceUnit")}
          {renderInfo("Balance Unit", "balanceUnit")}
          {renderInfo("Advance Limit", "advanceUnit")}
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
              marginTop:"3%",
              marginLeft:"2%"
            }}
          >
            {label}
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ color: "#002B6B", fontSize: 16, fontWeight: "400" }}>
            {balance ? balance[value] : ""}
          </Text>
        </View>
      </View>
    );
  }
};

export default AccountInfo;
