import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
  } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import useStore from "../GlobalStore/store";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { searchAllDeliverybystoreId } from "../../networkAPI/api";
import DeliveryCard from "../components/ui/DeliveryCard";

// interface NavigationProps {
//   navigation?: any;
// }

const OrderDelevery = ({ navigation }) => {
  const [delivery, setDelivery] = useState([]);
  const { navigate } = useNavigation();
  const riderDetails = useStore((state) => state.riderDetails);
  const user = useStore((state) => state.user);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["delivery"],
    queryFn: async () =>
      await searchAllDeliverybystoreId(
        riderDetails?.storeId,
        user?.accessToken,
        riderDetails?.storeUserId
      ),
    onSuccess: (data) => setDelivery(data),
  });

  console.log(delivery[1]);


  return (
   
      <SafeAreaView>
        <View
          style={{ height: 970, width: "100%", backgroundColor: "#F3F1F6" }}
        >
          <View
            style={{
              marginLeft: 5,
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Homepage");
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
                marginTop: 16,

              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "600",
                  color: "#002B6B",
                }}
              >
                Order Delivery
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#000000",
                }}
              >
                Select Order to Deliver
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PickupFilter");
              }}
            >
              <MaterialIcons
                name="filter-list-alt"
                size={35}
                color="#5D7EFC"
                style={{ marginTop: 28, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: 340,
              height: 60,
              display: "flex",
              flexDirection: "row",
              marginTop: 20,
              marginLeft: 25,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{ fontSize: 20, fontWeight: "600", color: "#000000" }}
              >
                Latest Order
              </Text>
            </View>
            
            <TouchableOpacity >
               <View>
              <Text
                style={{
                  color: "#003566",
                  fontSize: 17,
                  marginRight: 14,
                  textDecorationLine: "underline",
                }}
              >
                View all orders
              </Text>
            </View>
            </TouchableOpacity>
           
          </View>

          {isLoading && (
            <ActivityIndicator
              size="large"
              color="blue"
              style={{ marginTop: 20 }}
            />
          )}
          
       
        
          {data && (
          <FlatList
          data={delivery}
          renderItem={({item})=><DeliveryCard item={item} />}
          keyExtractor={(item) => item.id}
        />
        )}




          {/* <View
            style={{
              width: 350,
              height: 80,
              borderColor: "#003566",
              borderStyle: "solid",
              borderWidth: 1,
              marginLeft: 20,
              display: "flex",
              flexDirection: "row",
              borderRadius: 11,
              marginTop: 12,
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                marginTop: 8,
                marginLeft: 8,
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                alt="Group-2"
                source={require("../../assets/Photos/group2.png")}
              ></Image>
            </View>

            <View
              style={{ width: 140, height: 65, marginLeft: 12, marginTop: 10 }}
            >
              <Text style={{ fontSize: 14, fontWeight: "400", marginLeft: 4 }}>
                Picking Up Order
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#646060",
                  marginLeft: 4,
                }}
              >
                Placed On:{" "}
                <Text style={{ color: "#2F2D2D", fontSize: 10 }}>
                  12th Jan 2023
                </Text>{" "}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#646060",
                  marginLeft: 4,
                }}
              >
                Placed At:{" "}
                <Text style={{ color: "#2F2D2D", fontSize: 10 }}>
                  East Patel Nagar
                </Text>{" "}
              </Text>
            </View>
            <View
              style={{ width: 80, height: 60, marginLeft: 80, marginTop: 7 }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#646060",
                  textAlign: "center",
                }}
              >
                Details
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: "#322F2F",
                  textAlign: "center",
                }}
              >
                Men
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: "#322F2F",
                  textAlign: "center",
                }}
              >
                Household
              </Text>
            </View>
          </View>

          <View
            style={{
              width: 350,
              height: 80,
              borderColor: "#003566",
              borderStyle: "solid",
              borderWidth: 1,
              marginLeft: 20,
              display: "flex",
              flexDirection: "row",
              borderRadius: 11,
              marginTop: 12,
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                marginTop: 8,
                marginLeft: 8,
              }}
            >
              <Image
                alt="Group-1"
                source={require("../../assets/Photos/group1.png")}
              ></Image>
            </View>

            <View
              style={{ width: 140, height: 65, marginLeft: 12, marginTop: 10 }}
            >
              <Text style={{ fontSize: 14, fontWeight: "600", marginLeft: 4 }}>
                Picking Up Order
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#646060",
                  marginLeft: 4,
                }}
              >
                Placed On:{" "}
                <Text
                  style={{ color: "#2F2D2D", fontSize: 10, fontWeight: "600" }}
                >
                  12th Jan 2023
                </Text>{" "}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#646060",
                  marginLeft: 4,
                }}
              >
                Placed At:{" "}
                <Text
                  style={{ color: "#2F2D2D", fontSize: 10, fontWeight: "600" }}
                >
                  East Patel Nagar
                </Text>{" "}
              </Text>
            </View>
            <View
              style={{ width: 80, height: 60, marginLeft: 80, marginTop: 7 }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#646060",
                  textAlign: "center",
                }}
              >
                Details
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: "#322F2F",
                  textAlign: "center",
                }}
              >
                Men
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: "#322F2F",
                  textAlign: "center",
                }}
              >
                Household
              </Text>
            </View>
          </View> 

          <View
            style={{
              width: 350,
              height: 80,
              borderColor: "#003566",
              borderStyle: "solid",
              borderWidth: 1,
              marginLeft: 20,
              display: "flex",
              flexDirection: "row",
              borderRadius: 11,
              marginTop: 12,
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                marginTop: 8,
                marginLeft: 8,
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                alt="Group-2"
                source={require("../../assets/Photos/group2.png")}
              ></Image>
            </View>

            <View
              style={{ width: 140, height: 65, marginLeft: 12, marginTop: 10 }}
            >
              <Text style={{ fontSize: 14, fontWeight: "400", marginLeft: 4 }}>
                Picking Up Order
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#646060",
                  marginLeft: 4,
                }}
              >
                Placed On:{" "}
                <Text style={{ color: "#2F2D2D", fontSize: 10 }}>
                  12th Jan 2023
                </Text>{" "}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#646060",
                  marginLeft: 4,
                }}
              >
                Placed At:{" "}
                <Text style={{ color: "#2F2D2D", fontSize: 10 }}>
                  East Patel Nagar
                </Text>{" "}
              </Text>
            </View>
            <View
              style={{ width: 80, height: 60, marginLeft: 80, marginTop: 7 }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#646060",
                  textAlign: "center",
                }}
              >
                Details
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: "#322F2F",
                  textAlign: "center",
                }}
              >
                Men
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: "#322F2F",
                  textAlign: "center",
                }}
              >
                Household
              </Text>
            </View>
          </View>  */}
        </View>
      </SafeAreaView>
   
  );
};

export default OrderDelevery;
