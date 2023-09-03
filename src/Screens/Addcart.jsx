import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import React from "react";
import Header from "../components/Header/Header";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import useStore from "../GlobalStore/store";
import ModalDropdown from "react-native-modal-dropdown";
import { useState, useRef } from "react";
import { RNCamera } from "react-native-camera";

const LeftBrand = ({ navigator }) => {
  return (
    <TouchableOpacity onPress={navigator}>
      <AntDesign
        name="left"
        size={24}
        color="#5D7EFC"
        style={{ marginTop: 10, marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
};

const RightContent = () => {
  return (
    <View style={{ flexDirection: "row", gap: 17 }}>
      <TouchableOpacity>
        <Ionicons name="notifications" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const Addcart = ({ navigation }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedDefect, setSelectedDefect] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const cameraRef = useRef(null);


  //===================================  defect , color choosen ==================================

  const colors = [
    "RED",
    "GREEN",
    "BLUE",
    "SKY BLUE",
    "PINK",
    "CREAM",
    "PEACH",
    "YELLOW",
    "NAVY BLUE",
    "GOLD",
  ];
  const defects = [
    "RAFU ALREADY",
    "RINGS MISSING",
    "BURN HOLES",
    "TORN",
    "BUTTON-BROKEN",
    "HUK MISSING",
    "PEACH",
    "PIN HOLES",
    "CUTTING",
    "FALL OPEN",
  ];

  //
  const addToCart = () => {
  if (selectedColor && selectedDefect && selectedImage) {
    // Add the selected item with options and image to the cart.
    const selectedItem = {
      color: selectedColor,
      defect: selectedDefect,
      image: selectedImage.uri, // You can save the image URL or base64 data here.
    };

    // Perform cart manipulation here, such as adding to a cart state or context.
    console.log("Added to cart:", selectedItem);
  } else {
    console.log("Please select color and defect before adding to cart.");
  }

};
  // camera access add for the Image upload for defect==========================================================

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setSelectedImage({ uri: data.uri });
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const cart = useStore((state) => state.cart);
  console.log(cart?.[0].price);

  var totalPrice = 0;

  cart.map((item) => {
    return (totalPrice += item?.price);
  });

  console.log("line no 47", totalPrice);

  const navigator = () => {
    navigation.navigate("Category");
  };

  return (
    <SafeAreaView style={{ top: 50 }}>
      <View>
        <Header
          leftContent={<LeftBrand navigator={navigator} />}
          centerContent={
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cart Items</Text>
          }
          rightContent={<RightContent />}
        />
      </View>
      {cart.map((item, index) => {
        return (
          <ScrollView key={index}>
            <View style={styles.card}>
              <View>
                <Text style={styles.name}>{item?.garmentName}</Text>
                <Text style={styles.price}>₹{item?.price}</Text>
              </View>

              <View>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Colors
                  <AntDesign name="down" size={20} color="black" />
                </Text>
                <ModalDropdown
                  options={colors}
                  onSelect={(index, value) => setSelectedColor(value)}
                />
              </View>

              <View>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Defect
                  <AntDesign name="down" size={20} color="black" />
                </Text>
                <ModalDropdown
                  options={defects}
                  onSelect={(index, value) => setSelectedDefect(value)}
                />
              </View>
              {/* 
              <TouchableOpacity>
                <Text>Defect Image</Text>
              </TouchableOpacity>
              {selectedImage && (
                <Image
                  source={selectedImage}
                  style={{ width: 100, height: 100 }}
                />
              )} */}

              <View>
                <RNCamera
                  ref={cameraRef}
                  style={{ flex: 1, width: "100%", height: 400 }}
                />
                <Button title=" Defect Image" onPress={takePicture} />
              </View>
            </View>
          </ScrollView>
        );
      })}

      <View
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "yellow",
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          {" "}
          Total Price: ₹{totalPrice}
        </Text>
      </View>
      <Button title="Add to Cart" onPress={addToCart} />
    </SafeAreaView>
  );
};

export default Addcart;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    widt: "100%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 5,
  },
  image: {
    width: 90,
    height: 80,
    borderRadius: 10,
    borderColor: "cyan",
    borderWidth: 2,
  },
  name: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  price: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
  },
});
