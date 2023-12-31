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
import React, { useCallback, useState,useEffect } from "react";
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
import { QueryCache } from "react-query";

const categories = [
  { id: "1", title: "Men" },
  { id: "2", title: "Women" },
  { id: "3", title: "Kids" },
  { id: "4", title: "Household" },
  { id: "5", title: "Institutional" },
  { id: "6", title: "Others" },
  { id: "7", title: "Office" },
  { id: "8", title: "Kids Girls" },
  { id: "9", title: "Kids Boys" },
  // Add more categories as needed
];

const Categoryn = () => {
  const account = useStore((state) => state.account);
  const riderDetails = useStore((state) => state.riderDetails);
  const user = useStore((state) => state.user);
  const cart = useStore((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [showModal, setShowModal] = useState(false);
  const [garments, setGarments] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [backendCartItems, setBackendCartItems] = useState([])


  // // const customer = route?.params?.customer
  console.log(route?.params?.customerDetails);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["garments"],
    queryFn: async () =>
      await searchGarmentByStoreId(riderDetails?.storeId, user?.accessToken),
    onSuccess: (data) =>
      setGarments(
        data?.filter(
          (item) =>
            item?.["categoryName"] == selectedCategory && item?.price !== 0
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
        return item?.["categoryName"] == categoryName && item?.["price"] !== 0;
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

  const customerInfo = {
    name: route?.params?.customerDetails?.name,
    mobileNo: route?.params?.customerDetails?.mobileNo,
    storeCustomerId: route?.params?.customerDetails?.storeCustomerId,
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredGarments = data?.filter(
      (item) =>
        item?.["categoryName"] === selectedCategory &&
        item?.["price"] !== 0 &&
        item?.["garmentName"].toLowerCase().includes(text.toLowerCase())
    );
    setGarments(filteredGarments);
  };


// ================================================= Cart Icon session mentain========================================================

const getUserCartItems = async () => {

  const cart_url = `https://api.elaundry.co.in/oit-elaundry/api/auth/customer/${customerInfo?.storeCustomerId}/cart`
  try {
    const {data} = await axios.get(cart_url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${user?.accessToken}`,
      }
    })
    console.log('yes yes nehat',  data)
    setBackendCartItems(data)
    
  } catch (error) {
    console.log(error,"error in line 43");
  }
}

const deleteItemFromCart = async(cartItemId)=>{
  const cart_url = `https://api.elaundry.co.in/oit-elaundry/api/auth/customer/${customer_details?.storeCustomerId}/cart/${cartItemId}`
  try {
    const {data} = await axios.delete(cart_url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${user?.accessToken}`,
      }
    })

    Alert.alert(data?.message)
    const updatedCart = backendCartItems?.filter((item)=>item.id !== cartItemId)
    setBackendCartItems(updatedCart)
    
    
  } catch (error) {
    console.log(error);
  }
}


useEffect(()=>{

    getUserCartItems()

}, [refetch,data])

useEffect(() => {
  const unsubscribeFocus = navigation.addListener('focus', () => {
    refetch();
    getUserCartItems(); 
  });

  return unsubscribeFocus;
}, [navigation, refetch])


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
            customerDetails={route?.params?.customerDetails}
          />
        }
      />
      <View
        style={{
          marginTop: 30,
          marginLeft: 19,
          display: "flex",
          flexDirection: "row",
          width: "100%",
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
            backgroundColor: "#FFFFFF",
            borderRadius: 6,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Name : {route?.params?.customerDetails?.name}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 8,
            width: 180,
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
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Mobile : {route?.params?.customerDetails?.mobileNo}
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
          style={{
            backgroundColor: "#003566",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 5,
            width: "45%",
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
            Category
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Services", { customerInfo: customerInfo })
          }
          style={{
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            width: "45%",
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>Services</Text>
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
        <ActivityIndicator
          size="large"
          color="blue"
          style={{ marginTop: 20 }}
        />
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
 
      {showModal && (
        <CartModal
          showModal={showModal}
          setShowModal={setShowModal}
          key={selectedItem?.priceListId}
          closeModal={closeModal}
          selectedItem={selectedItem}
          customerDetails={route?.params?.customerDetails}
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
  input: {
    fontSize: 20,
    lineHeight: 22.5,
    marginTop: 7,
    marginLeft: 5,
    fontWeight: "400",
    textAlign: "center",
    color: "black",
    backgroundColor: "#FFFCFC",
  },
});
