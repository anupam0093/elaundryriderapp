import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
  } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import useStore from "../GlobalStore/store";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";
import { searchAllDeliverybystoreId } from "../../networkAPI/api";
import DeliveryCard from "../components/ui/DeliveryCard";
import axios from "axios";

// interface NavigationProps {
//   navigation?: any;
// }

const OrderDelevery = ({ navigation }) => {
  const [delivery, setDelivery] = useState([]);
  const { navigate } = useNavigation();
  const riderDetails = useStore((state) => state.riderDetails);
  const user = useStore((state) => state.user);
  const [loading, setIsloading] = useState(false);

  const router = useRoute();
  console.log(router?.params?.orderId)


  const endDate = new Date();
  endDate.setDate(endDate.getDate()); 
  const startDate = new Date(endDate);
  startDate.setMonth(startDate.getMonth() - 1);

  
  const formattedStartDate = startDate.toISOString().slice(0, 10);
  const formattedEndDate = endDate.toISOString().slice(0, 10);

  // console.log('formattedStartDate', formattedEndDate)


  useEffect(()=>{
      if(router?.params?.orderId && delivery?.length > 0){
        const filteredData = delivery?.filter((item)=>item?.id != router?.params?.orderId)
        setDelivery(filteredData)  
      }
  }, [router?.params?.orderId])


    const getDeliverys = async (storeid)=>{
    setIsloading(true)
    try {
      const {data} = await axios.get(`https://api.elaundry.co.in/oit-elaundry/api/auth/store/5/store-order/${formattedStartDate}/${formattedEndDate}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${user?.accessToken}`,
        },})
        if (data){
          const fitleredData = data?.filter((item)=>item?.orderPaymentStatus === "UNPAID")
          setDelivery(fitleredData)
        }
        setIsloading(false)
    } catch (error) {
      console.log('nehat error', error)
      setIsloading(false)
    }
   

      
  }


  // const getDeliverys = async (storeid)=>{
  //   setIsloading(true)
  //   try {
  //     const {data} = await axios.post(`https://api.elaundry.co.in/oit-elaundry/api/auth/store/5/store-order-by-status`, {
  //       "startDate": "2023-06-06",
  //       "endDate": "2023-12-06",
  //       "recordType": "DeliveryOn",
  //       "storeId": riderDetails?.storeId,
  //       "statusIn": [
  //           "BOOKED",
  //           "INPROCESS",
  //           "PROCESSED",
  //           "UNPROCESSED",
  //           "OUT_FOR_DELIVERY",
  //           "DELAY"
  //       ]
  //     }, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Basic ${user?.accessToken}`,
  //       },})
  //       if (data){
  //         const fitleredData = data?.filter((item)=>item?.orderPaymentStatus === "UNPAID")
  //         setDelivery(fitleredData)
  //       }
  //       setIsloading(false)
  //   } catch (error) {
  //     console.log('nehat error', error)
  //     setIsloading(false)
  //   }
   

      
  // }

  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["delivery", riderDetails?.storeId, user?.accessToken],
  //   queryFn: async () => await getDeliverys(storeId, user?.accessToken),
  //     // await searchAllDeliverybystoreId(
  //     //   riderDetails?.storeId,
  //     //   user?.accessToken,
  //     //   riderDetails?.storeUserId
  //     // ),
  //   onSuccess: (data) => setDelivery(data),
  //   refetchOnMount: true,
  //   staleTime: 0,
  // });

  useEffect(() => {
    getDeliverys(riderDetails?.storeId)
  },[] );


  


  return (
   
      <SafeAreaView>
        <View
          style={{ height: 970, width: "100%", backgroundColor: "#F3F1F6" }}
        >
          <View
            style={{
              marginLeft: 5,
              marginTop: 20,
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
                size={30}
                color="#5D7EFC"
                style={{ marginTop: 27, marginLeft: 10 }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 242,
                marginTop: 16,

              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "600",
                  color: "#002B6B",
                }}
              >
                Order Delivery 
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#000000",
                }}
              >
                Select Order to Deliver
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PickupFilter");
              }}
            >
              <MaterialIcons
                name="filter-list-alt"
                size={35}
                color="#5D7EFC"
                style={{ marginTop: 28, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: 340,
              height: 60,
              display: "flex",
              flexDirection: "row",
              marginTop: 20,
              marginLeft: 25,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{ fontSize: 20, fontWeight: "600", color: "#000000" }}
              >
                Latest Order
              </Text>
            </View>
            
            <TouchableOpacity >
               <View>
              <Text
                style={{
                  color: "#003566",
                  fontSize: 17,
                  marginRight: 14,
                  textDecorationLine: "underline",
                }}
              >
                View all orders
              </Text>
            </View>
            </TouchableOpacity>
           
          </View>

          {loading && (
            <ActivityIndicator
              size="large"
              color="blue"
              style={{ marginTop: 20 }}
            />
          )}
          
       
        
          {delivery && (
          <FlatList
          data={delivery}
          renderItem={({item})=><DeliveryCard item={item} />}
          keyExtractor={(item) => item.id}
        />
        )}

        </View>
      </SafeAreaView>
   
  );
};

export default OrderDelevery;
