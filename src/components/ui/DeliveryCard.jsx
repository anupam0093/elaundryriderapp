import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import moment from "moment";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const DeliveryCard = ({item}) => {
  const { navigate } = useNavigation();

const customerData = {
  name:item?.deliveryRequest?.customerDTO?.firstName, 
  mobileNo:item?.deliveryRequest?.customerDTO?.mobileNo
}


  return (
    <TouchableOpacity 
    onPress={() => {
      navigate("deliveryPayment",{'customerDetails':customerData});
    }}
    >
    <View
    style={{
      width: 360,
      height: 97,
      borderColor: "#003566",
      borderStyle: "solid",
      borderWidth: 1,
      marginLeft: 20,
      display: "flex",
      flexDirection: "row",
      borderRadius: 11,
      marginBottom: 10,
      justifyContent:"center",
      
    }}
  >
    <View
      style={{
        width: 30,
        height: 30,
        borderRadius: 30,
        marginTop: 8,
        marginLeft: 8,
        borderColor:"grey",
        borderWidth:1,
        borderStyle:"solid",
        justifyContent:"center",
      
        
      }}
    >
     
      <MaterialIcons name="delivery-dining" size={23} color="black" style={{left:3}} />
    </View>

    <View
      style={{
        width: 150,
        height: 100,
        marginLeft: 12,
        marginTop: 10,
      }}
    >
      <Text
        style={{ fontSize: 13, fontWeight: "600", marginLeft: 4,color:"blue" }}
      >
        {/* Picking Up Order */}
        {item?.["deliveryRequest"]?.["deliveryStatus"]}
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "400",
          color: "#646060",
          marginLeft: 4,
        }}
      >
        Placed On:{" "}
        <Text
          style={{
            color: "#2F2D2D",
            fontSize: 10,
            fontWeight: "600",
          }}
        >
          {/* 12th Jan 2023 */}
          {moment(item?.["deliveryRequest"]?.["requestOn"]).format(
            "Do-MMM-YYYY"
          )}
        </Text>{" "}
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "400",
          color: "#646060",
          marginLeft: 4,
        }}
      >
        Deliver On:{" "}
        <Text
          style={{
            color: "#2F2D2D",
            fontSize: 10,
            fontWeight: "600",
          }}
        >
          {/* 12th Jan 2023 */}
          {moment(item?.["deliveryRequest"]?.["deliveryDate"]).format(
            "Do-MMM-YYYY"
          )}
        </Text>{" "}
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "400",
          color: "#646060",
          marginLeft: 4,
        }}
      >
        Placed At:{" "}
        <Text
          style={{
            color: "#2F2D2D",
            fontSize: 10,
            fontWeight: "600",
          }}
        >
          {/* East Patel Nagar */}
          {item?.["pickupRequest"]?.["customerDTO"]
                ?.address === null
                ? "Adress not Available"
                : item?.["deliveryRequest"]?.["customerDTO"]
                    ?.address?.addressLine1}
        </Text>{" "}
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "400",
          color: "#646060",
          marginLeft: 4,
        }}
      >
        Name :{" "}
        <Text
          style={{
            color: "#2F2D2D",
            fontSize: 10,
            fontWeight: "600",
          }}
        >
          
          {item?.["deliveryRequest"]?.["customerDTO"]?.firstName}{" "}
              {item?.["deliveryRequest"]?.["customerDTO"]?.lastName}
        </Text>{" "}
      </Text>
    </View>
    <View
      style={{
        width: 80,
        height: 60,
        marginLeft: 80,
        marginTop: 7,
      }}
    >
      <Text
        style={{
          fontSize: 10,
          fontWeight: "400",
          color: "#646060",
          textAlign: "center",
        }}
      >
        Details
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "600",
          color: "#322F2F",
          textAlign: "center",
        }}
      >
        Men
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "600",
          color: "#322F2F",
          textAlign: "center",
        }}
      >
        Household
      </Text>
    </View>
  </View>
    </TouchableOpacity>

  )
}

export default DeliveryCard