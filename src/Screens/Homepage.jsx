import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import useStore from "../GlobalStore/store";
import Header from "../components/Header/Header";
import axios from "axios";
import { homepage } from "../../Components/Styles/homepage";

const LeftBrand = () => {
  return (
    <Image
      style={{ width: 40, height: 40, borderRadius: 20, resizeMode: "cover" }}
      source={{
        uri: "https://lh3.googleusercontent.com/ogw/AOLn63Gvcqud18bpZN8SVHtRZYQQ-49QfjkzyNVWHyrW8w=s32-c-mo",
      }}
    />
  );
};

const RightContent = ({ setLogOutUser, navigator }) => {
  return (
    <View style={{ flexDirection: "row", gap: 20 }}>
      <TouchableOpacity onPress={setLogOutUser}>
        <FontAwesome name="sign-out" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigator}>
        <Ionicons name="notifications" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};


const LogoutModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirm Logout</Text>
          <Text style={styles.modalText}>Are you sure you want to log out?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const Homepage = ({ navigation }) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const user = useStore((state) => state.user);
  const riderDetails = useStore((state) => state.riderDetails);
  const setRiderDetails = useStore((state) => state.setRiderDetails);
  const setLogOutUser = useStore((state) => state.setLogOutUser);

  const navigator = () => {
    navigation.navigate("Notification");
  };

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
  
    setLogoutModalVisible(false);
    setLogOutUser();
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const fetchRiderDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.elaundry.co.in/oit-elaundry/api/home/loginsuccess`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user?.tokenType + " " + user?.accessToken,
          },
        }
      );
      if (response) {
        setRiderDetails(response?.data);
      }
    } catch (error) {
      Alert.alert("Full authentication is required to access this resource");
      setLogOutUser();
    }
  };

  useEffect(() => {
    fetchRiderDetails();
  }, []);

  return (
    <SafeAreaView style={{ top: 35 }}>
      <StatusBar style="auto" />
      <Header
        leftContent={<LeftBrand />}
        centerContent={
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Welcome Rider 😎
          </Text>
        }
        rightContent={
          <RightContent setLogOutUser={handleLogout} navigator={navigator} />
        }
      />
      {/* ... Your content ... */}

      <LogoutModal
        visible={isLogoutModalVisible}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
<View style={homepage.container}>
        {/* data coming from backend */}
        <View
          style={{
            left: 200,
            top: 20,
            width: 150,
            height: 45,
            color: "#0000008F",
            borderStyle: "solid",
            borderColor: "#00000059",
            borderWidth: 2,
            borderRadius: 8,
            
          }}
        >
          <Text
            style={{
              marginLeft: 8,
              fontSize: 20,
              fontWeight: "700",
              justifyContent: "center",
              marginTop: 7,
              textAlign: "center",
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
            {/* <Button color="blue" title="OFFLINE"></Button>
            <Button color="blue" title="ONLINE"></Button> */}
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
              <View
                style={{ height: 167, width: 172, right: 3, marginTop: 87 }}
              >
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
                  color: "green",
                  marginTop: 15,
                  marginLeft: 13,
                }}
              >
                Pickup
              </Text>
              <View style={{ height: 262, width: 177 }}>
                <Image
                  alt="image-4"
                  style={{ marginTop: 1 }}
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


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap:20
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});