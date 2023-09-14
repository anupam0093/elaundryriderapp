import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import useStore from '../../GlobalStore/store';

const CartCard = ({item}) => {
  const removeItemFromCart = useStore((state)=>state.removeItemFromCart)
  const increment = useStore((state)=>state.increment)
  const decrement = useStore((state)=>state.decrement)
  return (
    <View style={{ flexDirection: 'row', margin:8,  height:120, marginHorizontal: 15, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around', elevation: 2, borderRadius: 5 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
      {item?.defectImage ? (
        <Image source={{ uri: "data:image/jpg;base64," + item?.defectImage?.base64 }} style={{ width: 70, height: 70, resizeMode: 'contain' }} />
      ): (

        <Image source={{ uri: 'https://gildan.my/wp-content/uploads/2020/02/76000B-24C-Gold.png' }} style={{ width: 70, height: 70, resizeMode: 'contain' }} /> 
      )}
      <View style={{ gap: 10, width:'60%' }}>
        <Text style={{ fontSize: 16, fontWeight: 600 }} numberOfLines={3} adjustsFontSizeToFit={true}>{item?.garmentName}</Text>
        <Text style={{ fontSize: 16, fontWeight: 400, }}>{'\u20B9'} {item?.price} x {item?.qty}</Text>
        <View style={{flexDirection:'row'}}>
            <Text style={{ fontSize: 14, fontWeight: 400, }}> Defect: </Text>
            <Text style={{ fontSize: 14, fontWeight: 400, }}>{item?.color}</Text>
        </View>
        
      </View>
    </View>
    <View style={{justifyContent:'space-between', height:'100%'}} >
      <TouchableOpacity style={{alignSelf:'flex-end', paddingRight:10}} onPress={()=>removeItemFromCart(item?.priceListId)}>
          <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <View>
        <View style={{flexDirection:'row', alignItems:'center', gap:15, paddingRight:10}}>

          <TouchableOpacity style={{backgroundColor: '#D9D9D9', padding:2, borderRadius:12}} onPress={()=>decrement(item?.priceListId)}>
          <AntDesign name="minus" size={24} color="black" />
          </TouchableOpacity>

          <Text style={{fontSize:20, fontWeight:600}}>{item?.qty}</Text>

          <TouchableOpacity style={{backgroundColor: '#D9D9D9',  padding:2, borderRadius:12}} onPress={()=>increment(item?.priceListId)}>
              <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
</View>
  )
}

export default CartCard

const styles = StyleSheet.create({})