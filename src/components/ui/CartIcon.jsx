import { StyleSheet, Text, View } from 'react-native'
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { useNavigation,useRoute } from '@react-navigation/native';
import useStore from "../../GlobalStore/store";
import React, { useEffect, useState } from 'react'




const CartIcon = ({ path, cartLength, customerDetails}) => {
 
    const navigation = useNavigation()
  return (
    <View style={{position:'relative', width:40}}>
        <Text style={{position:'absolute', right:3, top:-10, fontSize:18,color:"red"}}>{cartLength}</Text>
      <AntDesign name="shoppingcart" size={30} color="#508FEF"  onPress={() => navigation.navigate(path,{'customerDetails':customerDetails} )} />
        
        </View>
  )
}

export default CartIcon

const styles = StyleSheet.create({})