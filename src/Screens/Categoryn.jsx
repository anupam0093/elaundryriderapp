import { View, SafeAreaView, TouchableOpacity, Text,FlatList } from "react-native";
import { Button } from "native-base";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Modal from "react-native-modal";
import { searchGarmentByStoreId } from "../../networkAPI/api";
import { getStoreId } from "../../networkAPI/services/auth.service";
import { SwipeListView } from "react-native-swipe-list-view";
import useStore from "../GlobalStore/store";
import CategoryButton from "../components/CategoryButton";

const categories = [
  { id: "1", title: "Men" },
  { id: "2", title: "Women" },
  { id: "3", title: "Kids" },
  { id: "4", title: "Household" },
  { id: "5", title: "Institutional" },
  { id: "6", title: "Others" },
  { id: "7", title: "Office" },
  { id: "8", title: "Kids Girls" },
  { id: "9", title: "Kids Boys" },
  // Add more categories as needed
];

const Categoryn = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
    // Handle the logic for category selection if needed
  };

  const renderItem = ({ item }) => (
    <CategoryButton
      title={item.title}
      onPress={() => handleCategoryPress(item.id)}
    />
  );

  const riderDetails = useStore((state) => state.riderDetails);

  return (
    <SafeAreaView>
      <View style={{ height: 1026, width: "100%", backgroundColor: "#F3F1F6" }}>
        <View
          style={{
            marginLeft: 5,
            marginTop: 30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Homepage");
            }}
          >
            <AntDesign
              name="left"
              size={24}
              color="#5D7EFC"
              style={{ marginTop: 30, marginLeft: 10 }}
            />
          </TouchableOpacity>

          <View
            style={{
              width: 242,
              height: 34,
              marginTop: 16,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                lineHeight: 44,
                fontWeight: "600",
                color: "#002B6B",
              }}
            >
              Pickup
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "#000000",
              }}
            >
              Book Now
            </Text>
          </View>

          <AntDesign
            name="shoppingcart"
            size={26}
            color="#5D7EFC"
            style={{ marginTop: 30, marginRight: 30 }}
          />
        </View>
        {/* data coming from backend */}
        <View
          style={{
            marginTop: 30,
            marginLeft: 19,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              marginLeft: 6,
              width: "40%",
              height: 38,
              borderColor: "#FFFF",
              borderStyle: "solid",
              borderWidth: 1,
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "400",
              }}
            >
              Name : {riderDetails?.firstName}
              {riderDetails?.lastName}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 8,
              width: 178,
              height: 38,
              borderColor: "#FFFF",
              borderStyle: "solid",
              borderWidth: 1,
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "400",
              }}
            >
              Mobile : {riderDetails?.mobileNo}
            </Text>
          </View>
        </View>
        {/* <View style={{ display: "flex" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            gap: 5,
            marginLeft: 20,
          }}>
          <Button
            variant=""
            width="171px"
            height="48px"
            colorScheme="darkText"
            borderRadius="xl"
            backgroundColor="#D9D9D9">
            Normal Booking
          </Button>
          <Button
            variant="solid"
            backgroundColor="#002B6B"
            width="171px"
            height="48px"
            borderRadius="xl">
            ONLINE
          </Button>
        </View>
      </View> */}
        <View
          style={{
            display: "flex",
            width: 382,
            height: 40,
            justifyContent: "center",
            marginTop: 6,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 2,
              gap: 8,
              marginLeft: 15,
            }}
          >
            <Button
              variant="solid"
              width="179px"
              height="40px"
              backgroundColor="#002B6B"
            >
              Category
            </Button>

            <Button
              variant=""
              backgroundColor="#FFFFFF"
              colorScheme="darkText"
              width="179px"
              height="40px"
              onPress={() => {
                navigation.navigate("Services");
              }}
            >
              Services
            </Button>
          </View>

        </View>
        <View>
            <FlatList
              data={categories}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          </View>
      </View>
    </SafeAreaView>
  );
};

export default Categoryn;
