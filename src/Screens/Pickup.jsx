import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import Octicons from "@expo/vector-icons/build/Octicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import useStore from "../GlobalStore/store";
import { searchAllPickupbystoreId } from "../../networkAPI/api";
import { useQuery } from "@tanstack/react-query";
import PickupCards from "../components/ui/PickupCards";
import { Linking, Platform } from "react-native";

const Pickup = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPickup, setFilteredPickup] = useState([]);
  const [pickup, setPickup] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const account = useStore((state) => state.account);
  const riderDetails = useStore((state) => state.riderDetails);
  const user = useStore((state) => state.user);


  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["pickup"],
    queryFn: async () =>
      await searchAllPickupbystoreId(
        riderDetails?.storeId,
        user?.accessToken,
        riderDetails?.storeUserId
      ),
    onSuccess: (data) =>
      setPickup(
        data?.filter(
          (item) =>
            item?.pickupRequest?.storeCustomerId ===
            item?.pickupRequest?.storeCustomerId
        )
      ),
       
  },[refetch]);


// console.log(pickup[0]?.pickupRequest?.storeCustomerId)
 
  useEffect(() => {
    const filterPickupData = () => {
      const filteredData = pickup.filter((item) => {
        const customer = item.pickupRequest.customerDTO;
        const customer2 = item.pickupRequest.customerDTO.address;
        if (!customer || !customer2) {
          return false; 
        }
        const customerName = customer.firstName ? customer.firstName.toLowerCase() : "";
        const customerMobile = customer2.contactNo ? customer2.contactNo.toLowerCase() : "";
        const query = searchQuery.toLowerCase();
        return customerName.includes(query) || customerMobile.includes(query);
      });
      setFilteredPickup(filteredData);
    };
  
    const debouncedFilter = setTimeout(filterPickupData, 3);
  
    return () => clearTimeout(debouncedFilter);
  
  }, [searchQuery, pickup],[refetch()]);
  

  const callPhoneNumber = async (number) => {
    const phoneNumber = `${
      Platform.OS !== "android" ? "telprompt" : "tel"
    }:${number}`;

    try {
      const supported = await Linking.canOpenURL(phoneNumber);

      if (supported) Linking.openURL(phoneNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const openMap = async (address, city, zipCode) => {
    const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`);
    const provider = Platform.OS === "ios" ? "apple" : "google";
    const link = `http://maps.${provider}.com/?destination=${destination}`;

    try {
      const supported = await Linking.canOpenURL(link);

      if (supported) Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ width: "100%", backgroundColor: "#F3F1F6" }}>
        <View
          style={{
            marginLeft: 5,
            marginTop: 10,
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
              size={30}
              color="#5D7EFC"
              style={{ marginTop: 25, marginLeft: 10 }}
            />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#FFFCFC",
              width: 242,
              height: 34,
              marginTop: 25,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ marginTop: 6, marginLeft: 9.5 }}>
              <Octicons name="search" size={20} color="black" />
            </View>
            <View style={{ height: 23, width: 90 }}>
              <TextInput
                style={styles.input}
                placeholder="Search Here"
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
              ></TextInput>
            </View>
          </View>

          <Image
            alt="ios-bars"
            source={require("../../assets/Photos/bar.png")}
            style={{ marginTop: 32, marginRight: 20, height: 22, width: 22 }}
          />
        </View>

        {isLoading && (
          <ActivityIndicator
            size="large"
            color="blue"
            style={{ marginTop: 20 }}
          />
        )}

        {filteredPickup.length > 0 ? (
          <FlatList
            data={filteredPickup}
            renderItem={({ item }) => <PickupCards item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={{fontSize:20,display:"flex",textAlign:"center",top:40,color:"red"}}>No matching pickups found.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Viewcard: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    borderStyle: "solid",
    borderColor: "grey",
    height: 233,
    width: 370,
    borderWidth: 1.9,
    marginLeft: 10,
    borderRadius: 27,
  },
  input: {
    fontSize: 16,
    lineHeight: 22.5,
    marginTop: 7,
    marginLeft: 5,
    fontWeight: "400",
    width: 190,
    height: 23,
    textAlign: "center",
    color: "black",
    backgroundColor: "#FFFCFC",
  },
});

export default Pickup;
