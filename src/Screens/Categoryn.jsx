import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import useStore from "../GlobalStore/store";
import CategoryButton from "../components/CategoryButton";
import { searchGarmentByStoreId } from "../../networkAPI/api";
import Header from "../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import CartModal from "../components/Modals/CartModal";
import GamentsCard from "../components/ui/GamentsCard";
import CartIcon from "../components/ui/CartIcon";

const categories = [
  { id: "1", title: "MEN" },
  { id: "2", title: "WOMEN" },
  { id: "3", title: "KIDS" },
  { id: "4", title: "HOUSEHOLDS" },
  { id: "5", title: "INSTITUTIONAL" },
  { id: "6", title: "OTHERS" },
  { id: "7", title: "OFFICE" },
  { id: "8", title: "KIDS GIRLS" },
  { id: "9", title: "KIDS BOYS" },
  // Add more categories as needed
];

const Categoryn = () => {

  const account = useStore(state => state.account)
  const riderDetails = useStore(state => state.riderDetails)
  const user = useStore((state) => state.user);
  const cart = useStore((state) => state.cart);
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [showModal, setShowModal] = useState(false)
  const [garments, setGarments] = useState([])
  const [selectedItem, setSelectedItem] = useState()



  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['garments'],
    queryFn: async () => await searchGarmentByStoreId(riderDetails?.storeId, user?.accessToken),
    onSuccess: (data) => setGarments(data?.filter((item) => item?.["categoryName"] == selectedCategory && item?.price !==0))
  })

  const filterGarments = useCallback((categoryName)=>{
    setLoading(true)
    const sortedGarments = data?.sort((a, b) =>
    a.garmentName.localeCompare(b.garmentName)
  );
    const newFilteredGarments = sortedGarments?.filter((item) => {
      return item?.["categoryName"] == categoryName && item?.["price"] !== 0
    })
    setGarments(newFilteredGarments);
    setSelectedCategory(categoryName)
    setLoading(false)
  }, [data, setGarments, setSelectedCategory, garments])


  const openModal= useCallback((item)=>{
    setSelectedItem(item)
    setShowModal(true);
  }, [])

  const closeModal = useCallback(()=>{
    setSelectedItem(null)
    setShowModal(false);
  }, [])
  



  return (
    <SafeAreaView style={{ flex: 1,marginTop:30 }}>
      <Header
        leftContent={<Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.goBack()} />}
        centerContent={<Text style={{ fontSize: 18, fontWeight: "bold" }}>Book Now</Text>} 
        rightContent={<CartIcon path='Cart' cartLength={cart?.length}/>} />
      <View
        style={{ marginTop: 30, marginLeft: 19, display: "flex", flexDirection: "row", }}>
        <View style={{
          marginLeft: 6, width: "40%", height: 38, borderColor: "#FFFF", borderStyle: "solid", borderWidth: 1, justifyContent: "center", backgroundColor: "#FFFFFF", borderRadius: 6,
        }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Name : {account?.firstName} {account?.lastName}
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
            Mobile : {account?.mobileNo}
          </Text>
        </View>
      </View>

      {/* Tabs Button  */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#D9D9D9', marginHorizontal: 15, marginTop: 10 }}>
        <TouchableOpacity 
        style={{ backgroundColor: '#003566', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 5, width: '45%' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>Category</Text>
        </TouchableOpacity>

        <TouchableOpacity   onPress={() => navigation.navigate('Services')}
         style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, width: '45%' }}>
          <Text style={{ fontSize: 20, textAlign: 'center' }}>Services</Text>
        </TouchableOpacity>
      </View>
      {/* Tabs Button End */}

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
        <ActivityIndicator size='large' color='red' style={{ marginTop: 20 }} />
      )}
      

        {/* Data */}

        {data && (
          <FlatList
          data={garments}
          renderItem={({item})=><GamentsCard item={item} setShowModal={setShowModal} openModal={openModal}/>}
          keyExtractor={(item) => item?.priceListId}
        />
        )}
        {/* <GamentsCard setShowModal={setShowModal}/> */}
      {showModal && (
        <CartModal showModal={showModal} setShowModal={setShowModal} key={selectedItem?.priceListId} closeModal={closeModal} selectedItem={selectedItem} />
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
    resizeMode: 'contain'

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
});
