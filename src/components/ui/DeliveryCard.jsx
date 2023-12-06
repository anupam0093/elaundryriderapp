import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DeliveryCard = ({ item }) => {
  const { navigate } = useNavigation();

  const customerData = {
    name: item?.customer?.firstName  ,
    nameL: item?.customer?.lastName,
    mobileNo: item?.customer?.mobileNo,
    storeCustomerId: item?.storeCustomerId,
    orderId: item?.id,
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigate('deliveryPayment', { customerDetails: customerData });
      }}
    >
      <View
        style={{
          width: '90%', // Adjusted width to make it more responsive
          borderColor: '#003566',
          borderStyle: 'solid',
          borderWidth: 1,
          marginHorizontal: '5%', // Center horizontally
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 11,
          alignItems: 'center', // Vertically center the content
          padding: 10, // Added padding for better spacing
        }}
      >
        <View
          style={{
            width: 40,
            height: 40, // Adjusted size for responsiveness
            borderRadius: 20, // Adjusted to make it round
            borderColor: 'grey',
            borderWidth: 1,
            borderStyle: 'solid',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialIcons name="delivery-dining" size={23} color="black" />
        </View>

        <View
          style={{
            flex: 1, // Takes up remaining space
            marginLeft: 12,
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: '600', color: 'blue' }}>
            {/* {item?.deliveryRequest?.deliveryStatus.replace(/_/g, " ")} */}
          </Text>

          <Text style={{ fontSize: 10, fontWeight: '400', color: '#646060' }}>
          orderId:{' '}
            <Text style={{ color: '#2F2D2D', fontSize: 10, fontWeight: '600' }}>
              {item?.id}
            </Text>
          </Text>
          <Text style={{ fontSize: 10, fontWeight: '400', color: '#646060' }}>
            Placed On:{' '}
            <Text style={{ color: '#2F2D2D', fontSize: 10, fontWeight: '600' }}>
              {moment(item?.deliveryRequest?.requestOn).format('Do-MMM-YYYY')}
            </Text>
          </Text>
          <Text style={{ fontSize: 10, fontWeight: '400', color: '#646060' }}>
            Deliver On:{' '}
            <Text style={{ color: '#2F2D2D', fontSize: 10, fontWeight: '600' }}>
              {moment(item?.deliveryRequest?.deliveryDate).format('Do-MMM-YYYY')}
            </Text>
          </Text>
          <Text style={{ fontSize: 10, fontWeight: '400', color: '#646060' }}>
            Placed At:{' '}
            <Text style={{ color: '#2F2D2D', fontSize: 10, fontWeight: '600' }}>
              {item?.address
                ? item?.address
                : 'Address not Available'}
            </Text>
          </Text>
          <Text style={{ fontSize: 10, fontWeight: '400', color: '#646060' }}>
            Name:{' '}
            <Text style={{ color: '#2F2D2D', fontSize: 10, fontWeight: '600' }}>
              {item?.customer?.firstName}{' '}
              {item?.customer?.lastName}
            </Text>
          </Text>


          <Text style={{ fontSize: 10, fontWeight: '400', color: '#646060' }}>
            Status:{' '}
            <Text style={{ color: '#2F2D2D', fontSize: 10, fontWeight: '600' }}>
              {item?.orderPaymentStatus}
            </Text>
          </Text>

        </View>
        <View style={{ width: '20%', alignItems: 'center' }}>
          <Text style={{ fontSize: 10, fontWeight: '400', textAlign: 'center' }}>
            Details
          </Text>
          <Text style={{ fontSize: 10, fontWeight: '600', textAlign: 'center' }}>
            Men
          </Text>
          <Text style={{ fontSize: 10, fontWeight: '600', textAlign: 'center' }}>
            Household
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DeliveryCard;
