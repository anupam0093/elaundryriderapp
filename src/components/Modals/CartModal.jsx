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
    { label: 'Red', value: '1' },
    { label: 'Green', value: '2' },
    { label: 'Blue', value: '3' },
    { label: 'Yellow', value: '4' },
    { label: 'Black', value: '5' },
    { label: 'Silk', value: '6' },
    { label: 'Pink', value: '7' },
    { label: 'Purple', value: '8' },
    { label: 'Others', value: '9' },
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
                    <Text style={{fontSize:16, marginBottom:6}}>Choose Color</Text>
                    <DropdownComp
                    value={value}
                    setValue={setValue}
                    isFocus={isFocus}
                    setIsFocus={setIsFocus}
                    data={data}
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