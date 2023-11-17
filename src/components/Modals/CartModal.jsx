import { View, Text, TouchableOpacity, TextInput, StyleSheet , Keyboard, TouchableWithoutFeedback, Image, Alert, ActivityIndicator} from 'react-native'
import React, { useCallback, useState } from 'react'
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropdownComp from '../Dropdown/DropdownCompDefect';
import { Camera, CameraType } from 'expo-camera';
import { ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CamModal from '../cam/CamModal';
import useStore from '../../GlobalStore/store';
import { GarmentsColors } from '../../constans/GarmentColors';
import DropdownCompColor from '../Dropdown/DropdownComp_Color';
import DropdownCompDefect from '../Dropdown/DropdownCompDefect';
import { GarmentDefects } from '../../constans/GarmentDefect';
import DropdownCompBrand from '../Dropdown/DropdownCompBrand';
import { GarmentBrands } from '../../constans/GarmentBrand';
import axios from 'axios';



const CartModal = ({showModal, setShowModal, closeModal, selectedItem, customerDetails}) => {
    const riderDetails = useStore((state)=>state.riderDetails)
    const user = useStore((state)=>state.user)
    const [loading, setLoading] = useState(false)

    const [value, setValue] = useState("");
    const [colorValue, setColorValue] = useState("");
    const [garmentBrand, setGarmentBrand] = useState("")
    const [brandisFocus, setBrnadIsFocus] = useState(false)
    

    const [isFocus, setIsFocus] = useState(false);
    const [colorIsFocus, setColorIsFocus] = useState(false)
    const [showCameModal, setShowCamModal]= useState(false)
    const [capturedImage, setCapturedImage] = useState()
    const [qty, setQty] = useState(1)

    const addToCart = useStore((state)=>state.addToCart)

 
    const _addtoCart = async()=>{
        setLoading(true)
      const cart_url = `https://api.elaundry.co.in/oit-elaundry/api/auth/customer/${customerDetails?.storeCustomerId}/cart`
      const payload = {
        "priceListId": selectedItem?.priceListId,
        "status": "ADD",
        "storeUserId": riderDetails?.storeUserId,
        "storeCustomerId": customerDetails?.storeCustomerId, 
        "itemGarmentCount": Number(qty)|| 1,
        "garmentBrandId": garmentBrand?.id || "0",
        "garmentColorId": colorValue?.id || "0",
        "garmentDefectId": value?.id || "0",
        "garmentPackId": null,
        "count": Number(qty) || 1,
        "countGram": 0.0,
        "offerPrice": 0.0,
        "totalPrice": selectedItem?.price * Number(qty)
      }


      try {
        const response = await axios.post(cart_url, payload, {
          headers:{
            "Content-Type": "application/json",
            Authorization: `Basic ${user?.accessToken}`,
          }
        })
        
        console.log(response?.data)
        setLoading(false)
        Alert.alert('Item Added Successfully')
        closeModal()
        
      } catch (error) {
        console.log(error);
        setLoading(false)
       
      }

        // selectedItem.qty=Number(qty)
        // selectedItem.color = value
        // if(capturedImage){
        //   selectedItem.defectImage = capturedImage
        // }   


        // addToCart(selectedItem)
        // closeModal()

       
        // console.log('nehat cart payload', payload)
    }
    // console.log('nehat color', user)

    
    
    
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
                     placeholder='1'
                     placeholderTextColor='black'
                     keyboardShouldPersistTaps='never'
                     value={qty}
                     onChangeText={setQty}
                     style={{height:50, paddingLeft:20,  borderWidth:1, padding:1, borderRadius:10,  backgroundColor:'white', fontSize:20}}/>
                </ScrollView>

                


                <View>
                    <Text style={{fontSize:16, marginBottom:6}}>Choose Colors</Text>
                    <DropdownCompColor
                    value={colorValue}
                    setValue={setColorValue}
                    isFocus={colorIsFocus}
                    setIsFocus={setColorIsFocus}
                    data={GarmentsColors}
                    />
                </View>
                <View>
                    <Text style={{fontSize:16, marginBottom:6}}>Choose Defect</Text>
                    <DropdownCompDefect
                    value={value}
                    setValue={setValue}
                    isFocus={isFocus}
                    setIsFocus={setIsFocus}
                    data={GarmentDefects}
                    />
                </View>

                <View>
                    <Text style={{fontSize:16, marginBottom:6}}>Choose Brand</Text>
                    <DropdownCompBrand
                    value={garmentBrand}
                    setValue={setGarmentBrand}
                    isFocus={brandisFocus}
                    setIsFocus={setBrnadIsFocus}
                    data={GarmentBrands}
                    />
                </View>
                


                <View style={{justifyContent:'flex-end', flexDirection:'row', alignItems:'center', gap:10}}>
                    <Image source={{uri: "data:image/jpg;base64," + capturedImage?.base64}} style={{width:40, height:40, resizeMode:'cover'}}/>

                    <TouchableOpacity style={{paddingHorizontal:10, paddingVertical:10, borderRadius:10,  backgroundColor:'#003566', width:'55%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} onPress={()=>setShowCamModal(true)}>
                        <Text style={{color:'white', textAlign:'center', fontSize:20}}>Item Image</Text>
                        <AntDesign name="camera" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal Actions */}
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, marginBottom:10}}>
                {loading  &&(
                   <ActivityIndicator size="large" color="#00ff00" />
                )}
                {!loading && (
                  <TouchableOpacity  onPress={()=>_addtoCart()} style={{borderWidth:1, paddingHorizontal:10, paddingVertical:10, borderRadius:10, backgroundColor:'#D9D9D9'}} >             
                      <Text style={{alignSelf:'center', fontSize:18, textTransform:'uppercase'}}>Add To Cart</Text> 
                  </TouchableOpacity>
                )}


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