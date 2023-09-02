import { View, Text ,Image,TouchableOpacity,SafeAreaView,StyleSheet,ScrollView} from "react-native";
import React from "react";
import Header from "../components/Header/Header";
import { Ionicons,AntDesign } from "@expo/vector-icons";
import useStore from "../GlobalStore/store";




const LeftBrand = ({navigator}) => {
  return (
    <TouchableOpacity onPress={navigator} >
    <AntDesign
      name="left"
      size={24}
      color="#5D7EFC"
      style={{ marginTop: 10, marginLeft: 10 }}
    />
  </TouchableOpacity>
  );
};

const RightContent = () => {
  return (
    <View style={{ flexDirection: "row", gap: 17 }}>
    
      <TouchableOpacity >
        <Ionicons name="notifications" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};


const Addcart = ({navigation}) => {
  const cart = useStore((state) => state.cart);
  console.log(cart?.[0].price)


var totalPrice = 0;

  cart.map((item) =>{
    return(
      totalPrice += item?.price
    )
   
  })

  console.log("line no 47",totalPrice);


  const navigator = () =>{
    navigation.navigate('Category')


  }
  
  return (
    <SafeAreaView style={{top:50}}>
      <View>
        <Header
          leftContent={<LeftBrand navigator={navigator}   />}
          centerContent={
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
             Cart Items
            </Text>
          }
          rightContent={
            <RightContent  />
          }
        />
      </View>
      {cart.map((item,index) => {
            return(
              <ScrollView key={index}>
              <View style={styles.card} >
             
              <View>
                <Text style={styles.name}>{item?.garmentName}</Text>
                <Text style={styles.price}>₹{item?.price}</Text>
              </View>
    
            
            </View>
            </ScrollView>

            )

          })}
      <View style= {{padding:20,display:"flex",justifyContent:"center",backgroundColor:"yellow"}}>  
       <Text style={{fontSize:20,textAlign:"center"}}> Total Price:  ₹{totalPrice}</Text>
      </View> 
     

    
    </SafeAreaView>
  ); 
};

export default Addcart;

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