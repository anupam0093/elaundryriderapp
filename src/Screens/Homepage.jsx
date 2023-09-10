import { View, SafeAreaView, Image, TouchableOpacity,Text, StatusBar } from "react-native";
import {  Button } from "native-base";
import { homepage } from "../../Components/Styles/homepage";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import useStore from "../GlobalStore/store";
import CustomButton from "../../Components/CommonComponent/CustomButton";
import Header from "../components/Header/Header";
import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from "@tanstack/react-query";
import { getAccountInfo } from "../../networkAPI/api";



// const SCREEN_WIDTH = Dimensions.get('window').width;


const LeftBrand = () => {
  return (
    <Image
      style={{ width: 40, height: 40, borderRadius: 20, resizeMode: 'cover' }}
      source={{
        uri: "https://lh3.googleusercontent.com/ogw/AOLn63Gvcqud18bpZN8SVHtRZYQQ-49QfjkzyNVWHyrW8w=s32-c-mo",
      }}
    />
  )
}

const RightContent = ({ setLogOutUser,navigator }) => {
  return (
    <View style={{ flexDirection: 'row', gap: 17 }}>
      <TouchableOpacity onPress={setLogOutUser}>
        <MaterialIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigator}>
        <Ionicons name="notifications" size={24} color="black" />
      </TouchableOpacity>
    </View>

  )
}

const Homepage = ({ navigation }) => {
  const user = useStore(state=>state.user)
  const riderDetails = useStore(state=>state.riderDetails)
  const setLogOutUser = useStore(state => state.setLogOutUser) 

  const navigator = () =>{
    navigation.navigate('Notification')
  }
  
  
  return (
    <SafeAreaView style={{top:35}}>
      <StatusBar style="auto" />
      <Header  leftContent={<LeftBrand />} centerContent={<Text style={{fontSize:18,fontWeight:"bold"}}>Welcome Rider 😎</Text>} rightContent={<RightContent setLogOutUser={setLogOutUser} navigator={navigator} />} />
      <View style={homepage.container}>

        {/* data coming from backend */}
        <View style={{ left: 160 }}>
          <Text
            style={{
              marginLeft: 19,
              fontSize: 16,
              fontWeight: "700",
              color: "#0000008F",
              borderStyle: "solid",
              borderColor: "#002B6B1F",
              borderWidth: 1,
              width: 191,
              padding: 10,
              height: 35,
              borderRadius: 7,
              textAlign: "center",
              lineHeight: 14,
              backgroundColor: "#FFFFFF",
              marginTop: 10,
            }}
          >
            {/* data coming from backend */}
            {riderDetails?.userName}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              gap: 5,
              marginLeft: 1,
            }}
          >
            <Button
              variant=""
              width="171px"
              height="48px"
              borderRadius="xl"
              backgroundColor="#D9D9D9"
            >
              OFFLINE
            </Button>
            <Button
              fontSize="20"
              variant="solid"
              backgroundColor="#002B6B"
              width="171px"
              height="48px"
              borderRadius="xl"
            >
              ONLINE
            </Button>
          </View>
        </View>
        <View style={{ marginTop: 20, marginLeft: 40 }}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
              textDecorationLine: "underline",
            }}
          >
            Service
          </Text>
        </View>

        {/* order container starts here */}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            gap: 7,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("NewOrder");
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                marginTop: 10,
                borderStyle: "solid",
                borderColor: "#002B6B1F",
                height: 262,
                width: 177,
                borderWidth: 1,
                borderRadius: 18,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#002B6B",
                  marginTop: 15,
                  marginLeft: 13,
                }}
              >
                New Order
              </Text>
              <View style={{ height: 262, width: 177, right: 10 }}>
                <Image
                  alt="image-2"
                  style={{ marginTop: 30 }}
                  source={require("../../assets/Photos/laundry-1.png")}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OrderDelevery");
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                marginTop: 10,

                borderStyle: "solid",
                borderColor: "#002B6B1F",
                height: 262,
                width: 177,
                borderWidth: 1,
                borderRadius: 18,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#ED4137",
                  marginTop: 15,
                  marginLeft: 13,
                }}
              >
                Delivery
              </Text>
              <View style={{ height: 60, width: 79 }}>
                <Image
                  alt="imagee-3"
                  style={{ marginLeft: 97 }}
                  source={require("../../assets/Photos/sun.png")}
                />
              </View>
              <View style={{ height: 169, width: 211, right: 10 }}>
                <Image
                  alt="image-2"
                  style={{ right: 10, height: 160, width: 211 }}
                  source={require("../../assets/Photos/scooter.png")}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginTop: 10,
            justifyContent: "center",
            gap: 7,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserProfile");
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderStyle: "solid",
                borderColor: "#002B6B1F",
                height: 262,
                width: 177,
                borderWidth: 1,
                borderRadius: 18,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#11A7E1",
                  marginTop: 15,
                  marginLeft: 13,
                }}
              >
                User Profile
              </Text>
              <View style={{ height: 167, width: 172, right: 3, marginTop: 87 }}>
                <Image
                  alt="image-3"
                  style={{ height: 127 }}
                  source={require("../../assets/Photos/user.png")}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Pickup");
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderStyle: "solid",
                borderColor: "#002B6B1F",
                height: 262,
                width: 177,
                borderWidth: 1,
                borderRadius: 18,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#FFF500",
                  marginTop: 15,
                  marginLeft: 13,
                }}
              >
                Pickup
              </Text>
              <View style={{ height: 262, width: 177 }}>
                <Image
                  alt="image-4"
                  style={{ marginTop: 10 }}
                  source={require("../../assets/Photos/coconut.png")}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Homepage;
