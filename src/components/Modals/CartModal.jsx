import { View, Text, TouchableOpacity, TextInput, StyleSheet , Keyboard, TouchableWithoutFeedback, Image, Alert} from 'react-native'
import React, { useCallback, useState } from 'react'
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropdownComp from '../Dropdown/DropdownComp';
import { Camera, CameraType } from 'expo-camera';
import { ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CamModal from '../cam/CamModal';
import useStore from '../../GlobalStore/store';


const data = [
    { label: 'RED', value: '1' },
    { label: 'GREEN', value: '2' },
    { label: 'BLUE', value: '3' },
    { label: 'YELLOW CHECK', value: '4' },
    { label: 'BLACK', value: '5' },
    { label: 'SILK', value: '6' },
    { label: 'PINK', value: '7' },
    { label: 'PURPLE', value: '8' },
    { label: 'WHITE', value: '9' },
    { label: 'SKY BLUE', value: '10' },
    { label: 'CREAM', value: '11' },
    { label: 'PEACH', value: '12' },
    { label: 'LIGHT BLUE', value: '13' },
    { label: 'NAVY BLUE', value: '14' },
    { label: 'YELLOW', value: '15' },
    { label: 'YELLOW STRIPES', value: '16' },
    { label: 'BROWN', value: '17' },
    { label: 'GREY', value: '18' },
    { label: 'GOLD', value: '19' },
    { label: 'HARLEQUIN', value: '20' },
    { label: 'INDIGO', value: '21' },
    { label: 'LAVENDER', value: '22' },
    { label: 'LEMON', value: '23' },
    { label: 'MAGENTA', value: '24' },
    { label: 'MAROON', value: '25' },
    { label: 'ORANGE', value: '26' },
    { label: 'PURPLE', value: '27' },
    { label: 'SILVER', value: '28' },
    { label: 'VIOLET', value: '29' },
    { label: 'SKIN', value: '30' },
    { label: 'COFEE', value: '31' },
    { label: 'OLIVE', value: '32' },
    { label: 'DARK PINK', value: '33' },
  ];

  const defect = [
    { label: 'RAFU ALREADY ', value: '1' },
    { label: 'RING MISSING', value: '2' },
    { label: 'BURN HOLE', value: '3' },
    { label: 'BUTTON-LOOSE', value: '4' },
    { label: 'FABRIC WEAK', value: '5' },
    { label: 'GREECE STAINS', value: '6' },
    { label: 'COLOR BLEED', value: '7' },
    { label: 'BURN MARKS', value: '8' },
    { label: 'COLOR BLEED UNDER-ARM', value: '9' },
    { label: 'TORN', value: '10' },
    { label: 'OIL STAINS', value: '11' },
    { label: 'PEACH', value: '12' },
    { label: 'STICH OPEN', value: '13' },
    { label: 'COLOR FADE', value: '14' },
    { label: 'PRESS MARK', value: '15' },
    { label: 'BUTTON-BROKEN', value: '16' },
    { label: 'HUK MISSING', value: '17' },
    { label: 'SHINING MARKS', value: '18' },
    { label: 'BUTTON-MISSING', value: '19' },
    { label: 'COLOR MARK', value: '20' },
    { label: 'INDIGO', value: '21' },
    { label: 'LINING INCREASED ALREADY', value: '22' },
    { label: 'PIN HOLES', value: '23' },
    { label: 'CUTTING', value: '24' },
    { label: 'FALL OPEN', value: '25' },
    { label: 'YELLOW STAIN', value: '26' },

  ];



const CartModal = ({showModal, setShowModal, closeModal, selectedItem}) => {
    const [value, setValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [showCameModal, setShowCamModal]= useState(false)
    const [capturedImage, setCapturedImage] = useState()
    const [qty, setQty] = useState()

    const addToCart = useStore((state)=>state.addToCart)

    const _addtoCart = ()=>{
        selectedItem.qty=Number(qty)
        selectedItem.color = value
        if(capturedImage){
          selectedItem.defectImage = capturedImage
        }   
        addToCart(selectedItem)
        closeModal()
        Alert.alert('Item Added Successfully')
    }
    console.log(qty)
    
    
    
  return (
    <Modal
    isVisible={showModal} 
    avoidKeyboard={true}
    animationIn='fadeInUp'
    animationOut='fadeOutDown'
    // onBackdropPress={()=>setShowModal(false)}
  >
  <TouchableWithoutFeedback style={{ justifyContent:'center', alignItems:'center',}} onPress={()=>Keyboard.dismiss()}>
        <View style={{width:'100%', backgroundColor:'#FAFAFA', padding:20,  borderRadius:30, gap:10}}>
            <Text style={{fontSize:22, fontWeight:500, textTransform:'uppercase',alignSelf:'center'}}>{selectedItem?.garmentName}</Text>
            <View style={{ gap:20}}>
                <ScrollView>
                    <Text style={{fontSize:16, marginBottom:6}}>Item Quantity</Text>
                    <TextInput
                     inputMode='numeric'
                     placeholder='Enter Item Quantity'
                     placeholderTextColor='black'
                     keyboardShouldPersistTaps='never'
                     value={qty}
                     onChangeText={setQty}
                     style={{height:50, paddingLeft:20,  borderWidth:1, padding:1, borderRadius:10,  backgroundColor:'white', fontSize:20}}/>
                </ScrollView>
                <View>
                    <Text style={{fontSize:16, marginBottom:6}}>Choose Defect</Text>
                    <DropdownComp
                    value={value}
                    setValue={setValue}
                    isFocus={isFocus}
                    setIsFocus={setIsFocus}
                    data={defect}
                    />
                </View>
                <View style={{justifyContent:'flex-end', flexDirection:'row', alignItems:'center', gap:15}}>
                    <Image source={{uri: "data:image/jpg;base64," + capturedImage?.base64}} style={{width:40, height:40, resizeMode:'cover'}}/>
                    <TouchableOpacity style={{paddingHorizontal:10, paddingVertical:10, borderRadius:10,  backgroundColor:'#003566', width:'55%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} onPress={()=>setShowCamModal(true)}>
                        <Text style={{color:'white', textAlign:'center', fontSize:20}}>Item Image</Text>
                        <AntDesign name="camera" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal Actions */}
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, marginBottom:10}}>
                
                <TouchableOpacity  onPress={()=>_addtoCart()} style={{borderWidth:1, paddingHorizontal:10, paddingVertical:10, borderRadius:10, backgroundColor:'#D9D9D9'}} >             
                    <Text style={{alignSelf:'center', fontSize:18, textTransform:'uppercase'}}>Add To Cart</Text> 
                </TouchableOpacity>


                <TouchableOpacity  onPress={()=>closeModal()} style={{borderWidth:1, paddingHorizontal:10, paddingVertical:10, borderRadius:10}} >             
                    <Text style={{alignSelf:'center', fontSize:18, textTransform:'uppercase'}}>Close</Text> 
                </TouchableOpacity>
                </View>
            {/* End Modal Actions */}
           
        </View>

  </TouchableWithoutFeedback>
  {showCameModal && (
    <CamModal showCameModal={showCameModal} setShowCamModal={setShowCamModal} setCapturedImage={setCapturedImage}/>
  )}
  </Modal>
  )
}

const styles = StyleSheet.create({
    
  });

export default CartModal