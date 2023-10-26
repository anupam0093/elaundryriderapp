import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { useNavigation } from '@react-navigation/native';
const CartIcon = ({ path, cartLength, customerDetails}) => {
    const navigation = useNavigation()
  return (
    <View style={{position:'relative', width:40}}>
        <Text style={{position:'absolute', right:3, top:-10, fontSize:16}}></Text>
      <AntDesign name="shoppingcart" size={30} color="black"  onPress={() => navigation.navigate(path,{'customerDetails':customerDetails} )} />
    </View>
  )
}

export default CartIcon

const styles = StyleSheet.create({})