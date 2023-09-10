import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react'

const GamentsCard = ({setShowModal, item, openModal}) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 15, paddingVertical: 10, paddingHorizontal: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', elevation: 10, borderRadius: 5 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
      <Image source={{ uri: 'https://gildan.my/wp-content/uploads/2020/02/76000B-24C-Gold.png' }} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
      <View style={{ gap: 10, width:'60%' }}>
        <Text style={{ fontSize: 16, fontWeight: 600 }} numberOfLines={3} adjustsFontSizeToFit={true}>{item?.garmentName}</Text>
        <Text style={{ fontSize: 16, fontWeight: 400 }}>{'\u20B9'} {item?.price}</Text>
      </View>
    </View>
    <TouchableOpacity onPress={() => openModal(item)}>
      <MaterialIcons name="add-shopping-cart" size={30} color="black" />
    </TouchableOpacity>
  </View>
  )
}

export default GamentsCard

const styles = StyleSheet.create({})