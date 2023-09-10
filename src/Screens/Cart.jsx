import { FlatList, Image, SafeAreaView,  ScrollView,  StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import Header from '../components/Header/Header'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import CartCard from '../components/ui/CartCard';
import useStore from '../GlobalStore/store';



const Cart = () => {
  const navigation = useNavigation()
  const cart = useStore((state)=>state.cart)
  

  
  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#D9D9D9',}}>
      <StatusBar style='auto'/>
        <Header
        leftContent={<Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.goBack()} />}
        centerContent={<Text style={{ fontSize: 18, fontWeight: "bold" }}>Cart</Text>}
        rightContent={<Text></Text>}
        />

        {cart?.length < 1 &&(
          <View style={{justifyContent:'center', alignItems:'center', marginTop:'20%'}}>
            <Text style={{fontSize:30, fontWeight:400}}>No Items In the cart</Text>
          </View>
        )}
        {cart && (
            <View style={{ height:'60%'}}>
            <FlatList
            data={cart}
            style={{marginTop:10}}
            renderItem={({item})=><CartCard item={item}/>}
            keyExtractor={(item) => item?.priceListId}
            />
          </View>
        )}

        

          {cart?.length > 0 && (
            <View style={{height:'30%', justifyContent:'flex-end'}}>
            <View style={{ marginTop:20, marginHorizontal:15, gap:10, }}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:18}}>Subtotol:</Text>
                <Text style={{fontSize:16}}>{'\u20B9'} 9000</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:18, fontWeight:400}}>Delivery:</Text>
                <Text style={{fontSize:16}}>Free</Text>
              </View>

              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:18, fontWeight:400}} >Total:</Text>
                <Text style={{fontSize:16}}>{'\u20B9'} 9000</Text>
              </View>
          </View>
          <TouchableOpacity style={{backgroundColor: '#003566', marginHorizontal:15, paddingHorizontal:15, paddingVertical:10, borderRadius:20, marginTop:20}}>
                    <Text style={{ color:'white', textAlign:'center', fontSize:20}}>Checkout</Text>
              </TouchableOpacity>
          </View>
        )}

    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({})