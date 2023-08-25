
import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

export default function CustomButton({btnTittle,bg,_onPress,_width, textColor}) {
  
  return (
    <TouchableOpacity onPress ={_onPress}
     style={{paddingHorizontal:16,paddingVertical:13,backgroundColor:bg,borderRadius:9,width:_width}}>
      <Text style={{textAlign:"center",fontSize:20, fontWeight:"500", color:textColor}}>{btnTittle}</Text>
    </TouchableOpacity>
  )
}