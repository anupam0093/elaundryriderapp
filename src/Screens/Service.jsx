import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button } from "native-base";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import useStore from "../GlobalStore/store";
import CategoryButton from "../components/CategoryButton";
import { Ionicons } from "@expo/vector-icons";
import { searchGarmentByStoreId } from "../../networkAPI/api";
import Category from './Category';
import Addcart from './Cart';

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

const Categoryn = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [showGarments, setshowGarments] = React.useState([]);
  const [cart, setCart] = React.useState([]);

  const handleCategoryPress = (categoryId) => {
   setSelectedCategory(categoryId);
 
  };
 
  console.log("category Pressed",{selectedCategory} )

  // const renderItem = ({ item }) => <CategoryButton />;

  const riderDetails = useStore((state) => state.riderDetails);

  const user = useStore((state) => state.user);

  const getsearchGarmentByStoreId = React.useCallback(async () => {
    try {
      const response = await searchGarmentByStoreId(
        riderDetails?.storeId,
        user?.accessToken
      );
    
      setshowGarments(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

//  const setAddCart = useStore((state) => state.setUser)


 


  React.useEffect(() => {
    getsearchGarmentByStoreId();
  }, []);


  // calculation for dynamic data rendering ///
  
  
      const MenItem = showGarments?.filter(item =>item?.[ "categoryName" ] === selectedCategory);
      const [ startIndex, setStartIndex ] = useState(0);
      const itemsPerPage = 7
      const LimitItem = MenItem.slice(startIndex, startIndex + itemsPerPage)
    
      console.log({ LimitItem }, "filtered item ")




      const [cartItems, setCartItems] = useState([]);
      const addToCart = (item) => {
        // Create a copy of the cart items and add the selected item
        const updatedCart = [...cartItems, item];
        setCartItems(updatedCart);
      };
     
      console.log("cart added",cartItems.length);
      console.log(cartItems)



 
 

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={{ height: 1040, width: "100%", backgroundColor: "#F3F1F6" }}>
        <View
          style={{
            marginLeft: 5,
            marginTop: 30,
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
              Pickup
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "#000000",
              }}
            >
              Book Now
            </Text>
          </View>
          
          <TouchableOpacity
           onPress={() => {
            navigation.navigate("Homepage");
          }}
          >
              <AntDesign
            name="shoppingcart"
            size={26}
            color="#5D7EFC"
            style={{ marginTop: 30, marginRight: 30 }}
            
          />
          </TouchableOpacity>
          <Text style={{top:40,right:40,fontWeight:"bold"}}>{cartItems.length}</Text>
          
        </View>
        
        {/* data coming from backend */}
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
                fontSize: 15,
                fontWeight: "400",
              }}
            >
              Name : {riderDetails?.firstName}
              {riderDetails?.lastName}
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
                fontSize: 15,
                fontWeight: "400",
              }}
            >
              Mobile : {riderDetails?.mobileNo}
            </Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            width: 382,
            height: 40,
            justifyContent: "center",
            marginTop: 6,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 2,
              gap: 8,
              marginLeft: 15,
            }}
          >
            <Button
            
              variant="solid"
              width="179px"
              height="40px"
              backgroundColor="#002B6B"
            >
              Category
            </Button>

            <Button
              variant=""
              backgroundColor="#FFFFFF"
              colorScheme="darkText"
              width="179px"
              height="40px"
              onPress={() => {
                navigation.navigate("Services");
              }}
            >
              Services
            </Button>
          </View>
        </View>
        <View>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <CategoryButton
                item={item}
                _onPress={ () => handleCategoryPress(item.title)}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>

          {LimitItem.map((item,index) => {
            return(
              <ScrollView key={index}>
              <View style={styles.card} >
              <View>
                <Image source={item?.garmentImagePath} alt="No-image" style={styles.image} />
              </View>
              <View>
                <Text style={styles.name}>{item?.garmentName}</Text>
                <Text style={styles.price}>₹{item?.price}</Text>
              </View>
    
              <Button onPress={() => addToCart(item)} >
                <Ionicons name="cart-outline" size={24} color="white" />
              </Button>
            </View>
            </ScrollView>

            )

          })}
       
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categoryn;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    widt:"100%",
    height:100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 5,
  },
  image: {
    width: 90,
    height: 80,
    borderRadius: 10,
    borderColor:"cyan",
    borderWidth:2
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
