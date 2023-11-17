import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/build/Octicons";
import useStore from "../GlobalStore/store";
import CategoryButton from "../components/CategoryButton";
import { searchGarmentByStoreId } from "../../networkAPI/api";
import Header from "../components/Header/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import CartModal from "../components/Modals/CartModal";
import GamentsCard from "../components/ui/GamentsCard";
import CartIcon from "../components/ui/CartIcon";
import axios from "axios";

const categories = [
  { id: "1", title: "TOPUP" },
  { id: "2", title: "WASH & STEAM IRON" },
  { id: "3", title: "PICO" },
  { id: "4", title: "BUTTON" },
  { id: "5", title: "COMMERCIAL LAUNDRY" },
  { id: "6", title: "WASH & FLOD PREMIUM" },
  { id: "7", title: "HANGER" },
  { id: "8", title: "WASH & IRON" },
  { id: "9", title: "PACKAGING COVER" },
  { id: "10", title: "STEAM IRON" },
  { id: "11", title: "CHARAKH" },
  { id: "12", title: "POLISH" },
  { id: "13", title: "PREMIUM LAUNDRY" },
  { id: "14", title: "REPAIR" },
  { id: "15", title: "WASH & IRON PREMIUM" },
  { id: "16", title: "DARNING" },
  { id: "17", title: "STEAM CLEANING" },
  { id: "18", title: "HOME CLEANING" },
  { id: "19", title: "PREMIUM FABRIC CARE" },
  { id: "20", title: "STITCH" },
  { id: "21", title: "STARCH" },
  { id: "22", title: "OFFICE CLEANING" },
  { id: "23", title: "RAFU" },
  { id: "24", title: "FALL" },
  { id: "25", title: "ANTISEPTIC WASH" },
  { id: "26", title: "DYEING" },
  { id: "27", title: "EXPRESS DRYCLEAN" },
  { id: "28", title: "DRY CLEANING" },
  { id: "29", title: "Premium Dry Cleaning" },
  { id: "30", title: "COAT COVER" },
  { id: "31", title: "IRON" },
  { id: "32", title: "LAUNDRY" },
  { id: "33", title: "FABRIC FRAGRANCE" },
  { id: "34", title: "STEAM PRESS" },
  { id: "35", title: "WASH" },
  { id: "36", title: "EXPRESS LAUNDRY" },
  { id: "37", title: "WASH & FOLD" },
  { id: "38", title: "COMMERCIAL DRYCLEANING" },
  { id: "39", title: "WET CLEANING" },
  { id: "40", title: "FABRIC SOFTNER" },
  { id: "41", title: "SEPARATE WASH" },
  { id: "42", title: "ONSITE CLEANING" },

  // Add more categories as needed
];

const Categoryn = () => {
  const riderDetails = useStore((state) => state.riderDetails);
  const user = useStore((state) => state.user);
  const cart = useStore((state) => state.cart);
  const account = useStore((state) => state.account);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("TOPUP");
  const [showModal, setShowModal] = useState(false);
  const [garments, setGarments] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState("");
  const [backendCartItems, setBackendCartItems] = useState([]);

  console.log(route?.params?.customerInfo?.mobileNo);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["garments"],
    queryFn: async () =>
      await searchGarmentByStoreId(riderDetails?.storeId, user?.accessToken),
    onSuccess: (data) =>
      setGarments(
        data?.filter(
          (item) =>
            item?.["serviceName"] == selectedCategory && item?.price !== 0
        )
      ),
  },[refetch]);

  const filterGarments = useCallback(
    (categoryName) => {
      setLoading(true);
      const sortedGarments = data?.sort((a, b) =>
        a.garmentName.localeCompare(b.garmentName)
      );
      const newFilteredGarments = sortedGarments?.filter((item) => {
        return item?.["serviceName"] == categoryName && item?.["price"] !== 0;
      });
      setGarments(newFilteredGarments);
      setSelectedCategory(categoryName);
      setLoading(false);
    },
    [data, setGarments, setSelectedCategory, garments,refetch]
  );

  const openModal = useCallback((item) => {
    setSelectedItem(item);
    setShowModal(true);
  }, [refetch]);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
    setShowModal(false);
    refetch();
    getUserCartItems();
  }, [refetch, getUserCartItems])

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredGarments = data?.filter(
      (item) =>
        item?.["serviceName"] === selectedCategory &&
        item?.["price"] !== 0 &&
        item?.["garmentName"].toLowerCase().includes(text.toLowerCase())
    );
    setGarments(filteredGarments);
  };


  //=========================== cart Icon session maintain=================================================================
  const getUserCartItems = async () => {
    const cart_url = `https://api.elaundry.co.in/oit-elaundry/api/auth/customer/${route?.params?.customerInfo?.storeCustomerId}/cart`;
    try {
      const { data } = await axios.get(cart_url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${user?.accessToken}`,
        },
      });
      console.log("yes yes nehat", data);
      setBackendCartItems(data);
    } catch (error) {
      console.log(error, "error in line 43");
    }
  };

  const deleteItemFromCart = async (cartItemId) => {
    const cart_url = `https://api.elaundry.co.in/oit-elaundry/api/auth/customer/${customer_details?.storeCustomerId}/cart/${cartItemId}`;
    try {
      const { data } = await axios.delete(cart_url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${user?.accessToken}`,
        },
      });

      Alert.alert(data?.message);
      const updatedCart = backendCartItems?.filter(
        (item) => item.id !== cartItemId
      );
      setBackendCartItems(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCartItems();
  }, [refetch, data]);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      refetch();
      getUserCartItems();
    });
    return unsubscribeFocus;
  }, [navigation, refetch]);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <Header
        leftContent={
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            onPress={() => navigation.goBack()}
          />
        }
        centerContent={
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Book Now</Text>
        }
        rightContent={
          <CartIcon
            path="Cart"
            cartLength={backendCartItems?.length}
            customerDetails={route?.params?.customerInfo}
          />
        }
      />
      <View
        style={{
          marginTop: 30,
          marginLeft: 19,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            marginLeft: 6,
            width: "40%",
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
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Name : {route?.params?.customerInfo?.name}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 8,
            width: 178,
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
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Mobile : {route?.params?.customerInfo?.mobileNo}
          </Text>
        </View>
      </View>

      {/* Tabs Button  */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: "#D9D9D9",
          marginHorizontal: 15,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 5,
            width: "45%",
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center", color: "black" }}>
            Category
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#003566",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            width: "45%",
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
            Services
          </Text>
        </TouchableOpacity>
      </View>
      {/* Tabs Button End */}

      <View style={styles.maininput}>
        <TextInput
          style={styles.searchbar}
          placeholder="Search Here"
          onChangeText={handleSearch}
          value={searchQuery}
        ></TextInput>
        <Octicons
          name="search"
          size={20}
          color="black"
          style={styles.searchicon}
        />
      </View>

      <View style={{ marginTop: 10, paddingHorizontal: 15 }}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryButton
              item={item}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              filterGarments={filterGarments}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>

      {isLoading && (
        <ActivityIndicator size="large" color="red" style={{ marginTop: 20 }} />
      )}

      {/* Data */}

      {data && (
        <FlatList
          data={garments}
          renderItem={({ item }) => (
            <GamentsCard
              item={item}
              setShowModal={setShowModal}
              openModal={openModal}
            />
          )}
          keyExtractor={(item) => item?.priceListId}
        />
      )}
      {/* <GamentsCard setShowModal={setShowModal}/> */}
      {showModal && (
        <CartModal
          showModal={showModal}
          setShowModal={setShowModal}
          key={selectedItem?.priceListId}
          closeModal={closeModal}
          selectedItem={selectedItem}
          customerDetails={route?.params?.customerInfo}
        />
      )}
    </SafeAreaView>
  );
};

export default Categoryn;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 10,
  },
  image: {
    width: 90,
    height: 80,
    borderRadius: 10,
    resizeMode: "contain",
  },
  name: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  price: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
  },
  maininput: {
    position: "relative",
    width: "93%",
    marginLeft: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginTop: 10,
  },
  searchbar: {
    paddingLeft: 40,
    fontSize: 18,
    height: 40,
    width: "auto",
  },
  searchicon: {
    position: "absolute",
    top: 4,
    width: 20,
    paddingTop: 4,
    left: 10,
  },
});
