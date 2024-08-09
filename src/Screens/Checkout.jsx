import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import useStore from "../GlobalStore/store";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import { getChargeByStoreId, getDiscountByStoreId } from "../../networkAPI/api";
import { Card, Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { API_URL } from "../../networkAPI/env";
import axios from "axios";
import ViewShot from "react-native-view-shot";
import { captureRef } from "react-native-view-shot";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
// import {Logo} from "../../assets/Photos/logo-1.png"
import logo from "../../assets/Photos/elaundry.png";
import { uploadFiles } from "../firebase/storage/uploadMedia";

const Checkout = () => {
  const navigation = useNavigation();
  const captureRef = useRef(null);

  const Logo = require("../../assets/Photos/elaundry.png");

  const Gst = ["NONE", "INCLUDE", "EXCLUDE"];
  const route = useRoute();

  const [charge, setCharge] = useState([]);
  const [charges, setCharges] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [uploading, setUploading] = useState(false);
  const selectedImages = useStore((state) => state.images);
  const setImagesInStore = useStore((state) => state.setImages);
  const [selectedItem, setSelectedItem] = useState("");
  const [discountSelect, setdiscountSelect] = useState("");
  const [discounteditem, setDiscounteditem] = useState("");
  const [handlegst, setHandleGst] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [backendCartItems, setBackendCartItems] = useState([]);

  // console.log(handlegst, "handlegst");
  // console.log("nehat route line 48", route.params);

  // console.log(selectedItem, "selectedItem");

  const customerName = route.params.customer_details.name;
  const customerPhoneNo = route.params.customer_details.mobileNo;
  const totalQuantityofProduct = route.params.cart_details.totalQuantity;
  const customerId = route.params.customer_details.storeCustomerId;
  const productName = route.params.productDetails;

  const getUserCartItems = async () => {
    const cart_url = `https://api.elaundry.co.in/oit-elaundry/api/auth/customer/${route.params.customer_details?.storeCustomerId}/cart`;
    try {
      const { data } = await axios.get(cart_url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${user?.accessToken}`,
        },
      });
      console.log("checkoutResponse", data);
      setBackendCartItems(data);
    } catch (error) {
      console.log(error, "error in line 43");
    }
  };

  React.useEffect(() => {
    getUserCartItems();
  }, []);

  const addedItems =
    backendCartItems && backendCartItems?.map((item) => item?.garmentName);

  const addItemPrice =
    backendCartItems && backendCartItems?.map((item) => item?.totalPrice);

  // console.log(addedItems);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const riderDetails = useStore((state) => state.riderDetails);
  const user = useStore((state) => state.user);

  // console.log('nehat',riderDetails )
  // const account = useStore((state) => state.account);

  const ChargeByStoreId = React.useCallback(async () => {
    try {
      const response = await getChargeByStoreId(
        riderDetails?.storeId,
        user?.accessToken
      );

      setCharge(response);
    } catch (error) { }
  }, []);
  const discountByStoreId = React.useCallback(async () => {
    try {
      const response = await getDiscountByStoreId(
        riderDetails?.storeId,
        user?.accessToken
      );

      setDiscount(response);
    } catch (error) { }
  }, []);

  useEffect(() => {
    ChargeByStoreId();
    discountByStoreId();
  }, []);

  const handleSelect = (item) => {
    setSelectedItem(item);
    Alert.alert("Charge Added Successfully");
    const cardData = charge.find((d) => d.name === item);
    if (cardData) {
      setCharges([cardData]);
    }
  };

  // console.log(cart);
  var totalPrice = route?.params?.totalAmount;

  // =====================================================================================================================

  const handleDiscount = (item) => {
    setdiscountSelect(item);
    Alert.alert("Discount Added Successfully");
    const discountData = discount.find((d) => d.name === item);
    if (discountData) {
      setDiscounteditem([discountData]);
    }
  };

  const RemoveCharge = () => {
    Alert.alert("Charge Removed Successfully");
    setCharges("");
  };
  const RemoveDiscount = () => {
    Alert.alert("Charge Removed Successfully");
    setDiscounteditem("");
  };

  //======================================== Calculation for Gross Amount ===============================================

  // Calculate GST based on whether it's included or excluded
  const Gstc =
    handlegst === "EXCLUDE"
      ? (parseFloat(totalPrice) * 18) / 100
      : handlegst === "INCLUDE"
        ? (parseFloat(totalPrice) * 18) / (100 + 18) // Adjusting for included GST
        : 0;

  const chargesValue = charges
    ? (charges.chargeDiscountTypeIn === "AMOUNT"
      ? parseFloat(charges?.chargeDiscount)
      : (parseFloat(totalPrice) * parseFloat(charges?.chargeDiscount)) /
      100) || 0
    : 0;

  // If you need Gstc to be a string with two decimal places for display purposes
  const GstcString = Gstc.toFixed(0);

  const discountValue = discounteditem
    ? (discounteditem.chargeDiscountTypeIn === "AMOUNT"
      ? parseFloat(discounteditem?.chargeDiscount)
      : (parseFloat(totalPrice) *
        parseFloat(discounteditem?.chargeDiscount)) /
      100) || 0
    : 0;

  const Gross =
    handlegst === "INCLUDE"
      ? (parseFloat(totalPrice) - parseFloat(Gstc)).toFixed(0)
      : (
        parseFloat(totalPrice) -
        parseFloat(discountValue) +
        parseFloat(chargesValue)
      ).toFixed(0);

  // Update taxable amount calculation
  const taxableAmount =
    handlegst === "INCLUDE"
      ? ((parseFloat(Gross) * 100) / 118).toFixed(0) // Adjusting for included GST
      : parseFloat(Gross).toFixed(0);

  // Update Grand Total calculation
  const GrandTotal =
    handlegst === "INCLUDE"
      ? parseFloat(totalPrice) // No additional calculation needed if GST is included
      : parseFloat(Gross) + parseFloat(GstcString);

  // Update the customerCart object with corrected calculations
  const customerCart = {
    storeUserId: riderDetails?.storeUserId,
    storeCustomerId: route?.params?.customer_details?.storeCustomerId,
    totalQuantity: route?.params?.cart_details?.totalQuantity,
    itemGarmentCount: route?.params?.cart_details?.totalQuantity,
    totalAmount: parseFloat(totalPrice).toFixed(0),
    gstType: handlegst,
    gstPercent: 18,
    taxableAmount: parseFloat(taxableAmount).toFixed(0),
    gstAmount: parseFloat(Gstc),
    discountAmount: parseFloat(discountValue),
    chargeAmount: parseFloat(chargesValue),
    grandTotal: parseFloat(GrandTotal),
    status: "BOOKED",
    orderSource: "BY_STORE",
    deliveryOn: moment(selectedDate).format(),
    balanceAmount: "",
    paidAmount: 0,
    paymentMode: "COD",
    urgentDelivery: false,
    deliveryRequest: false,
    paymentRefNo: "",
    remarks: "",
  };

  const getTimestamp = () => {
    const now = moment();
    return now.format("DD-MM-YYYY HH:mm:ss");
  };

  const bookOrder = async () => {
    const token = `${user?.accessToken}`;
    try {
      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/auth/order/`,
        data: customerCart,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + token,
        },
      });
      console.log(data);
      if (data?.success) {
        console.log(data?.message);

        const getTimestampUpload = () => {
          const now = moment();
          return now.format("DD-MM-YYYY");
        };

        if (selectedImages.length > 0) {
          const uploadImages = async () => {
            setUploading(true);

            const photosCaptured = selectedImages.map((item) => item.uri);
            const fileNames = photosCaptured.map(
              (_, index) =>
                `Image_${customerPhoneNo}_${getTimestampUpload()}_${customerName + customerId}_${data?.message + index}.jpg`
            );
            const subfolder = `OrderID_${data?.message}`;
            const folder = getTimestampUpload();
            const phoneNumber = customerPhoneNo;
            const storeIdFolder = riderDetails?.storeId;

            try {
              const urls = await uploadFiles(
                photosCaptured,
                storeIdFolder,
                phoneNumber,
                subfolder,
                folder,
                fileNames
              );
              console.log("Files uploaded successfully, URLs:", urls);

              console.log(urls, "urls");

              if (urls.length > 0) {
                Alert.alert(
                  "Upload successful",
                  "Images have been uploaded successfully."
                );
              } else {
                Alert.alert(
                  "Upload failed",
                  "No URLs were returned. Please try again."
                );
              }

              const newImages = [];
              setImagesInStore(newImages, route.name);
            } catch (error) {
              console.error("Upload failed:", error);
              Alert.alert(
                "Upload failed",
                "An error occurred while uploading images."
              );
            } finally {
              setUploading(false);
              navigation.navigate("Homepage", { orderId: data?.message });
            }
          };

          uploadImages();
        } else {
          // No images to upload, navigate immediately
          navigation.navigate("Homepage", { orderId: data?.message });
        }

        alert(
          `Your order has been successfully created with order id ${data?.message}`
        );
      }
    } catch (error) {
      console.log({ error }, "error in line 122");
      alert("Please Select The Delivery Date And GST Type");
    }
  }

  console.log(selectedImages, "selectedImages")
  const handleCapture = async () => {
    try {
      const uri = await captureRef?.current?.capture();
      generatePDF(uri);
    } catch (error) {
      console.error("Error capturing the screen:", error);
    }
  };
  const currentDate = new Date();

  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Set to false if you want 24-hour format
    day: "numeric",
    month: "long", // You can use 'short' or 'numeric' for different formats
    year: "numeric",
  };

  // eslint-disable-next-line no-undef
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  {
    /* <td></td>
  <td></td>
  <td></td>
  <td> ₹${
    Number(GrandTotal.toFixed(2)) ||
    Math.round(totalPrice + Number(totalPrice * 0.18) / (1.18).toFixed())
  }</td> */
  }

  const generatePDF = async (uri) => {
    console.log(uri, "uri");

    // <html><body><img src="${uri}" /></body></html>

    try {
      const options = {
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0px  120px 0px 70px;
        }
        .invoice-box {
            width: 100%;
            padding: 20px;
            margin-top: 20px;
        }
        .header, .details, .summary, .footer {
            margin-bottom: 20px;
            text-align: center;
        }
        .header h1, .header h2 {
            margin: 0;
            text-align: center;
        }
        .header h2 {
            font-size: 28px;
            color: #666;
            text-align: center;
        }
        .details, .summary {
            font-size: 24px;
            text-align: center;
        }
        .details div, .summary div {
            margin-bottom: 5px;
            text-align: center;
        }
        .footer {
            text-align: center;
            font-size: 26px;
            color: #666;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
          
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
        }
        .border{
          border-bottom : 4px dashed #000;
        }
        th{
          border-bottom : 4px dashed #000;
          border-top : 4px dashed #000;
        }
    </style>
</head>
<body>

<div class="invoice-box">
    <div class="header">
    <img src="https://elaundry.co.in/wp-content/uploads/2023/12/logo-1-1.png">
        <h1>Elaundry</h1>
        <h2 id="currentTime">Printed on: <span></span></h2>
    </div>
    <div class="details">
        <div><strong>Store Name:</strong> E-Laundry</div>
         <div><strong>Store ID:</strong> ${riderDetails?.storeId}</div>
        <div><strong>Email:</strong> support@elaundry.co.in</div>
        <div><strong>Address:</strong> H-169, Sector 63, Noida - 301302, Uttar Pradesh</div>
        <div class="border"></div>
        <div><strong>Order On:</strong> ${getTimestamp()}</div>
        <div><strong>GST No:</strong> 09AIPPB1338M2ZZ</div>
        <div class="border"></div>
        <div><strong>Customer:</strong> ${customerName}</div>
                <div><strong>Ph No.:</strong> ${customerPhoneNo}</div>
    </div>
    <div class="summary">
    <table border=${0}>
    <thead>
      <tr>
      <th>Description</th>
      <th>Total Garment</th>
      <th>Rate</th>
      </tr>
    </thead>
    
    <tbody>            
        ${backendCartItems
            ?.map(
              (item, index) => `
        <tr>
          <td key=${index}>${item.garmentName}</td>
          <td key=${index}>${item.itemGarmentCount}</td>
          <td key=${index}>${item.totalPrice}</td>
          </tr>
        `
            )
            .join("")}

     <tr>

     <td></td>
     <td>Total Amount :</td>
     
          <td> ₹${totalPrice}</td>
         
         

          </tr>
          <tr>
          
          <td></td>
          <td>SGST (9%) :</td>
          <td> ₹${Gstc.toFixed(0) / 2}</td>
       
          </tr>
          <tr>
          
          <td></td>
          <td>CGST (9%) :</td>
          <td> ₹${Gstc.toFixed(0) / 2}</td>
     
          </tr>

          <tr>
          <td></td>
          <td>Grand Total :</td>
          
          <td>  ₹${Number(GrandTotal.toFixed(0)) ||
          Math.round(
            totalPrice + Number(totalPrice * 0.18) / (1.18).toFixed(0)
          )
          }</td>
      
      
          </tr>
  </tbody>
  </table>  
  <div class="border"></div>    

    </div>
    <div class="footer">
        :: Thanks for Ordering ::
    </div>
</div>

<script>
function getCurrentDateTime() {
  // Get current date and time
  var currentDate = new Date();

  // Get day, month, year
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // January is 0
  var year = currentDate.getFullYear();

  // Get hours, minutes, seconds
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();

  // Format day, month, hours, minutes, and seconds to have leading zeros if necessary
  day = (day < 10 ? '0' : '') + day;
  month = (month < 10 ? '0' : '') + month;
  hours = (hours < 10 ? '0' : '') + hours;
  minutes = (minutes < 10 ? '0' : '') + minutes;
  seconds = (seconds < 10 ? '0' : '') + seconds;

  // Format year to have four digits
  year = String(year);

  // Check if it's AM or PM
  var period = (hours >= 12) ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time
  hours = (hours > 12) ? hours - 12 : hours;

  // Add leading zero to hours if it's less than 10
  hours = (hours < 10 ? '0' : '') + hours;

  // Return formatted date and time
  return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + period;
}

// Get current date and time in the specified format
var currentDateTime = getCurrentDateTime();
console.log(currentDateTime);

document.getElementById("currentTime").textContent = currentDateTime;

</script>

</body>
</html>

             
  `,
        fileName: `Elaundry${customerName}EstimatedReceipt`,
        directory: FileSystem.documentDirectory,
      };

      const pdfUri = await Print.printToFileAsync(options);
      savePDF(pdfUri);
      // console.log(pdfUri, "pdfUri")
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const savePDF = async (pdfUri) => {
    try {
      // Create a new directory named 'Download' if it doesn't exist
      const downloadDirectory = `${FileSystem.documentDirectory}Download/`;
      await FileSystem.makeDirectoryAsync(downloadDirectory, {
        intermediates: true,
      });

      // Move the PDF file to the 'Download' directory
      const newPdfUri = `${downloadDirectory}${customerName}EstimatedReceipt.pdf`;
      await FileSystem.moveAsync({
        from: pdfUri.uri, // Use pdfUri.uri as the source file URI
        to: newPdfUri,
      });

      await Sharing.shareAsync(newPdfUri);

      console.log("PDF saved successfully:", newPdfUri);
    } catch (error) {
      console.error("Error saving PDF:", error);
    }
  };

  console.log(route.name, "route.name")

  return (
    <SafeAreaView>
      {uploading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <ScrollView>
        <View
          style={{ height: 1140, width: "100%", backgroundColor: "#F3F1F6" }}
        >
          <View
            style={{
              marginLeft: 0,
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={32}
                color="#5D7EFC"
                style={{ marginTop: 30, marginLeft: 0 }}
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
                Checkout
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#000000",
                }}
              >
                Checkout Final Submission
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 30,
              marginLeft: 22,
              display: "flex",
              flexDirection: "row",
            }}
          ></View>

          {/* CHARGES  COMING FROM BACKEND */}

          <View style={{ top: 10, left: 30, marginBottom: 20 }}>
            <SelectDropdown
              data={charge.map(
                (item) =>
                  ` ${item.name}  ${"["} ${item.chargeDiscountType}${":"} ${item.chargeDiscount
                  }${item.chargeDiscountTypeIn === "AMOUNT" ? " Rs" : "%"
                  } ${"]"}`
              )}
              onSelect={(selectedItem, index) => {
                console.log("hola como estas", selectedItem, index);
                handleSelect(selectedItem);
                setCharges(charge[index]);
              }}
              defaultButtonText={"Add Charges"}
              buttonTextAfterSelection={() =>
                selectedItem || "Select an option"
              }
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={17}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>

          <View style={{ left: 30, marginBottom: 10 }}>
            <SelectDropdown
              data={discount.map(
                (item) =>
                  ` ${item.name}  ${"["} ${item.chargeDiscountType}${":"} ${item.chargeDiscount
                  }${item.chargeDiscountTypeIn === "AMOUNT" ? " Rs" : "%"
                  } ${"]"}`
              )}
              onSelect={(discounSelect, index) => {
                handleDiscount(discounSelect);
                setDiscounteditem(discount[index]);
              }}
              defaultButtonText={"Add Discount"}
              buttonTextAfterSelection={() =>
                discountSelect || "Select an option"
              }
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>

          <View style={{ left: 30, marginBottom: 10 }}>
            <SelectDropdown
              data={Gst}
              onSelect={(value, index) => {
                setHandleGst(value);
              }}
              defaultButtonText={"Select GST"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />

            <ScrollView style={styles.cardsContainer}>
              {charges && selectedItem && (
                <Card style={styles.card}>
                  <Text>{charges.name}</Text>
                  <View>
                    <Text>Description: {charges.description}</Text>
                    <Text>Charge: {charges.chargeDiscount} Rs</Text>
                  </View>
                  <Entypo
                    style={{ left: 300, bottom: 40 }}
                    onPress={RemoveCharge}
                    name="circle-with-cross"
                    size={24}
                    color="red"
                  />
                </Card>
              )}
            </ScrollView>
            <ScrollView style={styles.cardsContainer}>
              {discounteditem && (
                <Card style={styles.card}>
                  <View>
                    <Text>{discounteditem.name}</Text>
                  </View>
                  <View>
                    <Text>Description: {discounteditem.description}</Text>
                    <Text>Charge: {discounteditem.chargeDiscount} Rs</Text>
                  </View>
                  <Entypo
                    style={{ left: 300, bottom: 40 }}
                    onPress={RemoveDiscount}
                    name="circle-with-cross"
                    size={24}
                    color="red"
                  />
                </Card>
              )}
            </ScrollView>
          </View>
          {/* <View>
            <Text>{backendCartItems?.map(item => item.garmentImagePath)}</Text>
            <Image src={backendCartItems?.map(item => "https://elaundry.co.in/wp-content/uploads/2023/12/"+item.garmentImagePath)} width={100} height={100}  alt=""/>
          </View> */}
          <ViewShot ref={captureRef}>
            <View>
              <View
                style={{
                  width: "85%",
                  height: "auto",
                  // borderColor: "cyan",
                  borderStyle: "solid",
                  // borderWidth: 1,
                  marginTop: 14,
                  left: 30,
                  display: "flex",
                  padding: 10,
                  overflow: "hidden",

                  backgroundColor: "white",
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  Products : {productName}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  Customer Name : {customerName}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  Customer Phone No.: {customerPhoneNo}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  Total Quantity : {totalQuantityofProduct}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  Customer ID : {customerId}
                </Text>
              </View>

              <View style={{ left: 30, marginVertical: 20 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}
                >
                  {selectedDate
                    ? moment(selectedDate).format("DD/MM/YYYY")
                    : "No date selected"}
                </Text>
                <SelectDropdown
                  defaultButtonText={"Delivery Date"}
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <View>
                        <TouchableOpacity onPress={showDatePicker}>
                          <FontAwesome
                            name={isOpened ? "calendar" : "calendar"}
                            color={"#444"}
                            size={24}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  dropdownIconPosition={"right"}
                />

                <DateTimePickerModal
                  date={selectedDate}
                  isVisible={datePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>

              <View
                style={{
                  width: "85%",
                  height: "auto",
                  marginTop: 14,
                  left: 30,
                  display: "flex",
                  padding: 10,
                  overflow: "hidden",
                  backgroundColor: "white",
                  borderRadius: 12,
                }}
              >
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 20,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      Total Amount (Rs):
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                      {"\u20B9"} {totalPrice}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 20,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      Charges (Rs):
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                      {"\u20B9"}{" "}
                      {(charges.chargeDiscountTypeIn === "AMOUNT"
                        ? Number(charges?.chargeDiscount)
                        : (totalPrice * Number(charges?.chargeDiscount)) /
                        100) || 0}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 20,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      Discount (Rs):
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                      {"\u20B9"}{" "}
                      {(discounteditem?.chargeDiscountTypeIn === "AMOUNT"
                        ? Number(discounteditem?.chargeDiscount)
                        : Number(
                          parseFloat(
                            (totalPrice * discounteditem?.chargeDiscount) /
                            100
                          ).toFixed(0)
                        )) || 0}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 20,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      Taxable Amount (Rs):
                    </Text>

                    <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                      {"\u20B9"} {Gross || totalPrice}
                    </Text>
                  </View>

                  {/* <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 20,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    Gross Amount (Rs):
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                      {"\u20B9"}{" "}
                      {Number(taxableAmount) ||
                        Math.round(
                          Number(totalPrice * 0.18) / (1.18).toFixed(0)
                        )}
                    </Text>
                  </View> */}

                  {handlegst == "EXCLUDE" || handlegst == "INCLUDE" ? (
                    <View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 20,
                        }}
                      >
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                          CGST @ 9% :
                        </Text>
                        <Text
                          style={{ fontSize: 16, fontWeight: "500", top: 5 }}
                        >
                          {"\u20B9"} {Gstc.toFixed(0) / 2}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 20,
                        }}
                      >
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                          SGST @ 9% :
                        </Text>
                        <Text
                          style={{ fontSize: 16, fontWeight: "500", top: 5 }}
                        >
                          {"\u20B9"} {Gstc.toFixed(0) / 2}
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }} t>
                      Grand Total (Rs) :
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "500", top: 5 }}>
                      {"\u20B9"}{" "}
                      {Number(GrandTotal.toFixed(0)) ||
                        Math.round(
                          totalPrice +
                          Number(totalPrice * 0.18) / (1.18).toFixed(0)
                        )}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ViewShot>

          <Button
            onPress={() => bookOrder()}
            rippleColor="yellow"
            buttonColor="#002B6B"
            textColor="white"
            style={{
              width: "40%",
              left: 110,
              marginTop: 15,
              padding: 5,
              borderRadius: 12,
            }}
          >
            Booked
          </Button>

          <Button
            onPress={handleCapture}
            buttonColor="#002B6B"
            textColor="white"
            style={{
              width: "40%",
              left: 110,
              marginTop: 15,
              padding: 5,
              borderRadius: 12,
            }}
          >
            Print / Share
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },

  dropdown1BtnStyle: {
    width: "85%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginTop: 10,
  },
  dropdown1BtnTxtStyle: { color: "black", textAlign: "left", fontSize: 16 },
  dropdown1DropdownStyle: { backgroundColor: "black" },
  dropdown1RowStyle: {
    backgroundColor: "grey",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left", fontSize: 17 },

  dropdown2BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#444",
    borderRadius: 12,
  },
  dropdown2BtnTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: {
    backgroundColor: "#444",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
  dropdown2RowTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    padding: 10,
    width: "auto",
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
  },
  cardsContainer: {
    marginTop: 10,
    width: 340,
  },
  card: {
    marginBottom: 10,
    padding: 7,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Optional: Add a semi-transparent background
  },
});
