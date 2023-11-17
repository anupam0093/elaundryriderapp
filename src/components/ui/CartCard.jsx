import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import useStore from '../../GlobalStore/store';
import { getBrandName, getDefectName, getItemColor } from '../../utils';

const CartCard = ({item, deleteItemFromCart}) => {
  const removeItemFromCart = useStore((state)=>state.removeItemFromCart)
  const increment = useStore((state)=>state.increment)
  const decrement = useStore((state)=>state.decrement)
  const IMAGE_BASE_URL = 'https://nehat.pythonanywhere.com/media/garment-images/'

 


  return (
    <View style={{ flexDirection: 'row', margin:8,  height:150, marginHorizontal: 15, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around', elevation: 2, borderRadius: 5 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
     
     
      {/* {item?.defectImage ? (
        <Image source={{ uri: "data:image/jpg;base64," + item?.defectImage?.base64 }} style={{ width: 70, height: 70, resizeMode: 'contain' }} />
      ): ( */}

        <Image source={{ uri: `${IMAGE_BASE_URL}${item?.garmentImagePath}` }} style={{ width: 70, height: 70, resizeMode: 'contain' }} /> 
      {/* )} */}
      <View style={{ gap: 10, width:'80%' }}>
        <Text style={{ fontSize: 16, fontWeight: 600 }} numberOfLines={3} adjustsFontSizeToFit={true}>{item?.garmentName}</Text>
        <Text style={{ fontSize: 16, fontWeight: 400, }}>{'\u20B9'} {item?.totalPrice}</Text>
        <View style={{flexDirection:'row', flexWrap:'wrap', gap:6}}>
            <Text style={{ fontSize: 14, fontWeight: 600,color:"#508FEF" }}> Defect: {getDefectName(item?.garmentDefectId)} </Text>
            <Text style={{ fontSize: 14, fontWeight: 600,color:"#508FEF" }}> Color: {getItemColor(item?.garmentColorId)}</Text>
            <Text style={{ fontSize: 14, fontWeight: 600,color:"#508FEF" }}> Brand: {getBrandName(item?.garmentBrandId)}</Text>
        </View>
        <View style={{flexDirection:'row',}}>
        {item?.defectImage && (
          <View style={{flexDirection:'row', gap:4,}}>
            <Image source={{ uri: "data:image/jpg;base64," + item?.defectImage?.base64 }} style={{ width: 30, height: 30, borderRadius:4,  resizeMode: 'cover' }} />
            {/* <Image source={{ uri: "data:image/jpg;base64," + item?.defectImage?.base64 }} style={{ width: 30, height: 30, borderRadius:4,  resizeMode: 'cover' }} />
            <Image source={{ uri: "data:image/jpg;base64," + item?.defectImage?.base64 }} style={{ width: 30, height: 30, borderRadius:4,  resizeMode: 'cover' }} />
            <Image source={{ uri: "data:image/jpg;base64," + item?.defectImage?.base64 }} style={{ width: 30, height: 30, borderRadius:4,  resizeMode: 'cover' }} /> */}
        </View>
      )}
        </View>

        
      </View>
    </View>
    
    <View style={{justifyContent:'space-between', height:'100%'}} >
      <TouchableOpacity style={{alignSelf:'flex-end', paddingRight:10}} onPress={()=>deleteItemFromCart(item?.id)}>
          <AntDesign name="close" size={24} color="red" />
          
      </TouchableOpacity>
      <View>
        
        {/* <View style={{flexDirection:'row', alignItems:'center', gap:15, paddingRight:10}}>
          
          <TouchableOpacity style={{backgroundColor: '#D9D9D9', padding:2, borderRadius:12}} >
          <AntDesign name="minus" size={24} color="black" />
          </TouchableOpacity>

          <Text style={{fontSize:20, fontWeight:600}}>{item?.qty}</Text>

          <TouchableOpacity style={{backgroundColor: '#D9D9D9',  padding:2, borderRadius:12}}>
              <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
</View>
  )
}

export default CartCard

const styles = StyleSheet.create({})