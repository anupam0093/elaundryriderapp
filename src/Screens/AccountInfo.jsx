import React, { useEffect, useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {  SafeAreaView, TouchableOpacity,View,Text} from "react-native";
import { styles } from "../../Components/Styles/welcome";
import axios from "axios";
import useStore from "../GlobalStore/store";
import { useNavigation,useRoute } from '@react-navigation/native';


const AccountInfo = () => {

  const navigation = useNavigation()

const account = useStore(state => state.account)
const balance = useStore(state => state.balance)
const route = useRoute()


 




  return (
      <SafeAreaView>
            <View style={styles.container}  
            >
              <View
                style={{
                  marginLeft: 5,
                  marginTop: 30,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <TouchableOpacity
                 onPress={() => navigation.goBack()}>
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
                  }}>
                  <Text
                    style={{
                      fontSize: 24,
                      lineHeight: 44,
                      fontWeight: "600",
                      color: "#002B6B",
                    }}>
                    Account Info
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "400",
                      color: "#000000",
                    }}>
                    Customer Account Info
                  </Text>
                </View>

                <Entypo
                  name="dots-three-vertical"
                  size={24}
                  color="black"
                  style={{ marginTop: 30, marginRight: 16 }}
                />
              </View>

              <View
                style={{
                  marginTop: 30,
                  marginLeft: 22,
                  display: "flex",
                  flexDirection: "row",
                }}>
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
                  }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 17,
                      fontWeight: "600",
                    }}>
                      Name : {route?.params?.customerDetails?.name} 
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
                  }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 17,
                      fontWeight: "600",
                    }}>
                      Mobile: {route?.params?.customerDetails?.mobileNo} 
                    {/* Mobile : {item?.[ "customer" ]?.[ "mobileNo" ]} */}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: 340,
                  height: 340,
                  borderColor: "#D9D9D9",
                  borderStyle: "solid",
                  borderWidth: 1,
                  marginTop: 20,
                  marginLeft: 26,
                  marginRight: 26,
                  paddingLeft: 11,
                  paddingRight: 11,
                  backgroundColor: "#D9D9D9",
                }}>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: 310,
                    height: 40,
                    borderColor: "#CDCACA",
                    borderStyle: "solid",
                    borderWidth: 1,
                    backgroundColor: "#CDCACA",
                    marginTop: 13,
                  }}>
                  <View
                    style={{
                      width: 109,
                      height: 40,
                      marginTop: 7,
                      marginLeft: 30,
                    }}>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 16,
                        fontWeight: "bold",
                        letterSpacing: -1,
                      }}>
                      Wallet Status
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 50,
                      height: 45,
                      marginTop: 7,
                      marginRight: 30,
                    }}>
                    <Text
                      style={{ color: "#002B6B", fontSize: 15, fontWeight: "400", letterSpacing: -1, }}>
                        {account?.status}
                     
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: 310,
                    height: 40,
                    borderColor: "#CDCACA",
                    borderStyle: "solid",
                    borderWidth: 1,
                    backgroundColor: "#CDCACA",
                    marginTop: 13,
                  }}>
                  <View
                    style={{
                      width: 109,
                      height: 40,
                      marginTop: 7,
                      marginLeft: 30,
                    }}>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 16,
                        fontWeight: "bold",
                        letterSpacing: -1,
                      }}>
                      Credit Limit
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 50,
                      height: 45,
                      marginTop: 7,
                      marginRight: 30,
                    }}>
                    <Text
                      style={{ color: "#002B6B", fontSize: 16, fontWeight: "400", letterSpacing: -1, }}>
                      {/* {item?.[ "storeCustomerAccountDTO" ]?.[ "creditLimit" ]} */}
                      {balance?.creditLimit}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: 310,
                    height: 40,
                    borderColor: "#CDCACA",
                    borderStyle: "solid",
                    borderWidth: 1,
                    backgroundColor: "#CDCACA",
                    marginTop: 13,
                  }}>
                  <View
                    style={{
                      width: 109,
                      height: 40,
                      marginTop: 7,
                      marginLeft: 30,
                    }}>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 16,
                        fontWeight: "bold",
                        letterSpacing: -1,
                      }}>
                      Available Limit
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 50,
                      height: 45,
                      marginTop: 7,
                      marginRight: 30,
                    }}>
                    <Text
                      style={{ color: "#002B6B", fontSize: 16, fontWeight: "400", letterSpacing: -1, }}>
                      {/* {item?.[ "storeCustomerAccountDTO" ]?.[ "balanceUnit" ]} */}
                      {balance?.balanceUnit}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: 310,
                    height: 40,
                    borderColor: "#CDCACA",
                    borderStyle: "solid",
                    borderWidth: 1,
                    backgroundColor: "#CDCACA",
                    marginTop: 13,
                  }}>
                  <View
                    style={{
                      width: 109,
                      height: 40,
                      marginTop: 7,
                      marginLeft: 30,
                    }}>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 16,
                        fontWeight: "bold",
                        letterSpacing: -1,
                      }}>
                      Balance Unit
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 50,
                      height: 45,
                      marginTop: 7,
                      marginRight: 30,
                    }}>
                    <Text
                      style={{ color: "#002B6B", fontSize: 16, fontWeight: "400", letterSpacing: -1, }}>
                      {/* {item?.[ "storeCustomerAccountDTO" ]?.[ "balanceUnit" ]} */}
                      {balance?.balanceUnit}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: 310,
                    height: 40,
                    borderColor: "#CDCACA",
                    borderStyle: "solid",
                    borderWidth: 1,
                    backgroundColor: "#CDCACA",
                    marginTop: 13,
                  }}>
                  <View
                    style={{
                      width: 109,
                      height: 40,
                      marginTop: 7,
                      marginLeft: 30,
                    }}>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 16,
                        fontWeight: "bold",
                        letterSpacing: -1,
                      }}>
                      Advance Limit
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 50,
                      height: 45,
                      marginTop: 7,
                      marginRight: 30,
                    }}>
                    <Text
                      style={{ color: "#002B6B", fontSize: 16, fontWeight: "400", letterSpacing: -1, }}>
                      {/* {item?.[ "storeCustomerAccountDTO" ]?.[ "advanceUnit" ]} */}
                      {balance?.advanceUnit}
                    </Text>
                  </View>
                </View>
              </View>

            </View>
      </SafeAreaView>
   
  );
};

export default AccountInfo;
