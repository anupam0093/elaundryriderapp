import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, Image, Alert, ActivityIndicator, FlatList } from 'react-native';
import Modal from "react-native-modal";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ScrollView } from 'native-base';
import useStore from '../../GlobalStore/store';
import { GarmentsColors } from '../../constans/GarmentColors';
import DropdownCompColor from '../Dropdown/DropdownComp_Color';
import DropdownCompDefect from '../Dropdown/DropdownCompDefect';
import { GarmentDefects } from '../../constans/GarmentDefect';
import DropdownCompBrand from '../Dropdown/DropdownCompBrand';
import { GarmentBrands } from '../../constans/GarmentBrand';
import axios from 'axios';
import CamModal from '../cam/CamModal';

const CartModal = ({ showModal, setShowModal, closeModal, setFinalImage, selectedItem, customerDetails }) => {
  const riderDetails = useStore((state) => state.riderDetails);
  const user = useStore((state) => state.user);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [colorValue, setColorValue] = useState('');
  const [garmentBrand, setGarmentBrand] = useState('');
  const [brandIsFocus, setBrandIsFocus] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [colorIsFocus, setColorIsFocus] = useState(false);
  const [showCamModal, setShowCamModal] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const [qty, setQty] = useState(1);

  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = async () => {
    setLoading(true);
    const cartUrl = `https://api.elaundry.co.in/oit-elaundry/api/auth/customer/${customerDetails?.storeCustomerId}/cart`;
    const payload = {
      priceListId: selectedItem?.priceListId,
      status: 'ADD',
      storeUserId: riderDetails?.storeUserId,
      storeCustomerId: customerDetails?.storeCustomerId,
      itemGarmentCount: Number(qty) || 1,
      garmentBrandId: garmentBrand?.id || '0',
      garmentColorId: colorValue?.id || '0',
      garmentDefectId: value?.id || '0',
      garmentPackId: null,
      count: Number(qty) || 1,
      countGram: 0.0,
      offerPrice: 0.0,
      totalPrice: selectedItem?.price * Number(qty),
    };

    try {
      const response = await axios.post(cartUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${user?.accessToken}`,
        },
      });

      setLoading(false);
      setFinalImage(capturedImages);
      Alert.alert('Item Added Successfully');
      closeModal();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   setFinalImage(capturedImages);
  // }, [capturedImages]);

  return (
    <Modal
      isVisible={showModal}
      avoidKeyboard={true}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{selectedItem?.garmentName}</Text>
          <View style={styles.contentContainer}>
            <ScrollView>
              <Text style={styles.label}>Item Quantity</Text>
              <TextInput
                inputMode="numeric"
                placeholder="1"
                placeholderTextColor="black"
                value={qty.toString()}
                onChangeText={setQty}
                style={styles.input}
              />
            </ScrollView>

            <View>
              <Text style={styles.label}>Choose Colors</Text>
              <DropdownCompColor
                value={colorValue}
                setValue={setColorValue}
                isFocus={colorIsFocus}
                setIsFocus={setColorIsFocus}
                data={GarmentsColors}
              />
            </View>

            <View>
              <Text style={styles.label}>Choose Defect</Text>
              <DropdownCompDefect
                value={value}
                setValue={setValue}
                isFocus={isFocus}
                setIsFocus={setIsFocus}
                data={GarmentDefects}
              />
            </View>

            <View>
              <Text style={styles.label}>Choose Brand</Text>
              <DropdownCompBrand
                value={garmentBrand}
                setValue={setGarmentBrand}
                isFocus={brandIsFocus}
                setIsFocus={setBrandIsFocus}
                data={GarmentBrands}
              />
            </View>

            <View style={styles.imageContainer}>
              <FlatList
                horizontal
                data={capturedImages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: 'data:image/jpg;base64,' + item.base64 }}
                    style={styles.image}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                scrollToOverflowEnabled={true}
              />

              {value && (
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={() => setShowCamModal(true)}
                >
                  <Text style={styles.cameraButtonText}>
                    {capturedImages.length !== 0 ? "Add More" : "Item Image"}
                  </Text>
                  <AntDesign name="camera" size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <>
                <TouchableOpacity onPress={handleAddToCart} style={styles.button}>
                  <Text style={styles.buttonText}>Add To Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={styles.button}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      {showCamModal && (
        <CamModal
          showCameModal={showCamModal}
          setShowCamModal={setShowCamModal}
          setCapturedImage={setCapturedImages}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    padding: 20,
    borderRadius: 12,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  contentContainer: {
    gap: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    height: 50,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 20,
  },
  imageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,

  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10,
    marginBottom: 15
  },
  cameraButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#003566',
    width: '55%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default CartModal;
