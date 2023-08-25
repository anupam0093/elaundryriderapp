import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Text


} from "react-native";
// import Modal from 'react-native-modal'
import { Button } from "native-base";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import Entypo from "@expo/vector-icons/build/Entypo";
import Swipelist from "react-native-swipeable-list-view";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Modal from "react-native-modal";
import { searchGarmentByStoreId } from "../../networkAPI/api";
import { getStoreId } from "../../networkAPI/services/auth.service";
import { SwipeListView } from 'react-native-swipe-list-view';

const SCREEN_WIDTH = Dimensions.get("window").width;

// interface NavigationProps {
//   navigation?: any;
// }

const Category = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [ showGarments, setshowGarments ] = React.useState([]);

  const getsearchGarmentByStoreId = React.useCallback(async () => {
    try {
      const response = await searchGarmentByStoreId(

        //@ts-expect-error
        getStoreId()
      );
      setshowGarments(response)

      console.log({ response })


    } catch (error) {
      console.log(error);
    }
  }, []);



  // const [ cat, setCat ] = React.useState("Men");
  // console.log(showGarments[ 0 ], "Category Screen");


  // filter for Mens section
  const MenItem = showGarments.filter(item =>
    item?.[ "categoryName" ] === "Men");

  const [ startIndex, setStartIndex ] = useState(0);
  const itemsPerPage = 6
  const LimitMenItem = MenItem.slice(startIndex, startIndex + itemsPerPage)

  console.log({ LimitMenItem }, "filtered item for Men Item")

  //================= filter for Women's==========================================================================

  const WomenItem = showGarments.filter(item =>
    item?.[ "categoryName" ] === "Women")

  const LimitWomenItem = WomenItem.slice(startIndex, startIndex + itemsPerPage)

  console.log({ LimitWomenItem }, "filtered item for Women Item")
  // console.log({ modalData }, "filtered item for Women Item")


  //======================= filter for Kid's====================================================================
  const KidsItem = showGarments.filter(item =>
    item?.[ "categoryName" ] === "Kids")

  const LimitKidsItem = KidsItem.slice(startIndex, startIndex + itemsPerPage)

  console.log({ LimitKidsItem }, "filtered item for Kids Item")

  //======================= filter for Household's====================================================================
  const HouseholdItem = showGarments.filter(item =>
    item?.[ "categoryName" ] === "Household")

  const LimitHouseholdItem = HouseholdItem.slice(startIndex, startIndex + itemsPerPage)

  console.log({ LimitHouseholdItem }, "filtered item for Household Item")



// ======================== filter for Institution ==================================================================
const InstitutionalItem = showGarments.filter(item =>
  item?.[ "categoryName" ] === "Institutional")

const LimitInstitutionalItem = InstitutionalItem.slice(startIndex, startIndex + itemsPerPage)

console.log({ LimitInstitutionalItem }, "filtered item for Institutional Item")



// ======================== filter for Others ==================================================================
const OthersItem = showGarments.filter(item =>
  item?.[ "categoryName" ] === "Others")

const LimitOthersItem = OthersItem.slice(startIndex, startIndex + itemsPerPage)

console.log({ LimitOthersItem }, "filtered item for Others Item")


// ======================== filter for KIDS Girls ==================================================================
const KidsGirlsItem = showGarments.filter(item =>
  item?.[ "categoryName" ] === "Kids Girls")

const LimitKidsGirlsItem = KidsGirlsItem.slice(startIndex, startIndex + itemsPerPage)

console.log({ LimitKidsGirlsItem }, "filtered item for Kids Girls Item")


// ======================== filter for KIDS Boys ==================================================================
const KidsBoysItem = showGarments.filter(item =>
  item?.[ "categoryName" ] === "Kids Boys")

const LimitKidsBoysItem = KidsBoysItem.slice(startIndex, startIndex + itemsPerPage)

console.log({ LimitKidsBoysItem }, "filtered item for Kids Boys Item")












  React.useEffect(() => {
    getsearchGarmentByStoreId()
  }, [])


  const [ index, setIndex ] = React.useState(0);
  const [ routes ] = React.useState([
    { key: "mens", title: "Mens" },
    { key: "womens", title: "Womens" },
    { key: "kids", title: "Kids" },
    { key: "household", title: "Households" },
    { key: "institutional", title: "Institutional" },
    { key: "others", title: "Others" },
    { key: "kidsGirls", title: "Kids Girls" },
    { key: "kidsBoys", title: "Kids Boys" },
  ]);
  const renderScene = SceneMap({
    mens: MensComponent,
    womens: WomenComponent,
    kids: KidsComponent,
    household: HouseholdComponent,
    institutional: InstitutionalComponent,
    others: OthersComponent,
    kidsGirls: KidsGirlsComponent,
    kidsBoys: KidsBoysComponent, 
  });



  const initialLayout = { width: Dimensions.get("window").width };
 
  return (
    <ScrollView>
      <SafeAreaView>
        <View
        
          style={{ height: 1026, width: "100%", backgroundColor: "#F3F1F6" }}>
          <View
            style={{
              marginLeft: 5,
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Homepage");
              }}>
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
              }}>
              <Text
                style={{
                  fontSize: 24,
                  lineHeight: 44,
                  fontWeight: "600",
                  color: "#002B6B",
                }}>
                Pickup
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#000000",
                }}>
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
            }}>
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
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "400",
                }}>
                Name : Aksha Tiyagi
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
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "400",
                }}>
                Mobile No 9870765790
              </Text>
            </View>
          </View>
          <View style={{ display: "flex" }}>
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
          </View>
          <View
            style={{
              display: "flex",
              width: 382,
              height: 40,
              justifyContent: "center",
              marginTop: 6,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 2,
                gap: 8,
                marginLeft: 15,
              }}>
              <Button
                variant="solid"
                width="179px"
                height="40px"
                backgroundColor="#002B6B">
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
                }}>
                Services
              </Button>
            </View>
          </View>

          <TabView
            navigationState={{ index, routes }}
            renderTabBar={(props) => (
              <TabBar
                scrollEnabled={true}
                {...props}
                renderLabel={({ route }) => (
                  <Text style={{ color: "white" }}>{route.title}</Text>
                )}
                style={{ backgroundColor: "#002B6B" }}
              />
            )}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            swipeEnabled={false}
            style={{ marginTop: 10 }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );

  //==================================Men Components ===========================================================
  function MensComponent () {
    // const { addToCart } = useCart();


    // first modal usestate
    const [ isVisible, setIsVisible ] = useState(false);

    // second modal use state //
    const [ visibleSecondModal, setVisibleSecondModal ] = useState(false);

    const [ count, setCount ] = useState(0);

    const incrementCount = () => {
      setCount(count + 1);
    };
    const decrementCount = () => {
      setCount(count - 1);
    };
    const [ datas, setdatas ] = React.useState({})


    const handleAddCart = (item) => {
      // addToCart(item)
      setIsVisible(true);
      setdatas(item);

    };

    console.log("line347", datas)

    const handlePacking = () => {
      setVisibleSecondModal(true);
    };

    const handleCloseModal = () => {
      setIsVisible(false);
    };

    const handleCloseSecondModal = () => {
      setVisibleSecondModal(false);
    };



    const RightSwipe = () => {



      return (
        <Modal
          key={index}
          isVisible={isVisible}
          animationIn="bounce"
          backdropColor="transparent">

          <View
            style={{
              width: 330,
              height: 720,
              left: 15,
              top: 0,
              borderColor: "#FFFFFF",
              borderWidth: 2,
              borderStyle: "solid",
              margin: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            }}>
            <View
              style={{
                width: 310,
                height: 50,
                backgroundColor: "green",
                left: 8,
                top: 40,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  marginTop: 15,
                  color: "#FFFFFF",
                }}>
                Garments Details
              </Text>
            </View>
            <View style={{ top: 130, left: 14 }}>
              <View>
                <Text style={{ left: 6 }}>Price</Text>
                <TextInput
                  style={styles.input1}
                  keyboardType="number-pad"
                  // @ts-ignore
                  placeholder={`₹ ${datas?.price}`}
                  placeholderTextColor="black"

                />
              </View>
              <View>
                <Text style={{ top: 20, left: 6 }}>Quantity</Text>
                <TextInput
                  style={styles.input2}
                  keyboardType="number-pad"
                  placeholder="1"
                  placeholderTextColor="black"
                />
              </View>
            </View>
            <View style={{ top: 150, left: 6 }}>
              <TouchableOpacity onPress={handlePacking}>
                <Text style={{ marginBottom: 16, fontSize: 16 }}>
                  Packing
                </Text>
                <Modal
                isVisible={visibleSecondModal}
                animationIn="bounce"
                backdropColor="transparent">
                <View
                  style={{
                    width: 200,
                    height: 300,
                    left: 35,
                    top: 70,
                    borderColor: "#DCDCDE",
                    borderWidth: 2,
                    borderStyle: "solid",
                    margin: "auto",
                    backgroundColor: "#DCDCDE",
                    borderRadius: 15,
                  }}>
                  <ScrollView>
                    <Button
                      style={{ backgroundColor: "red" }}
                      onPress={handleCloseSecondModal}>
                      Close
                    </Button>

                    <Text style={{ fontSize: 20 }}>HANGER</Text>
                    <Text style={{ fontSize: 20 }}>NONE</Text>
                    <Text style={{ fontSize: 20 }}>FOLD</Text>
                    <Text style={{ fontSize: 20 }}>HALF/BOLD</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                  </ScrollView>
                </View>
              </Modal>
              </TouchableOpacity>

              
                 <TouchableOpacity onPress={handlePacking}>
                  <Text style={{ marginBottom: 16, fontSize: 16 }}>Brand</Text>

                   <Modal
                isVisible={visibleSecondModal}
                animationIn="bounce"
                backdropColor="transparent">
                <View
                  style={{
                    width: 200,
                    height: 300,
                    left: 35,
                    top: 70,
                    borderColor: "#DCDCDE",
                    borderWidth: 2,
                    borderStyle: "solid",
                    margin: "auto",
                    backgroundColor: "#DCDCDE",
                    borderRadius: 15,
                  }}>
                  <ScrollView>
                    <Button
                      style={{ backgroundColor: "red" }}
                      onPress={handleCloseSecondModal}>
                      Close
                    </Button>

                    <Text style={{ fontSize: 20 }}>HANGER</Text>
                    <Text style={{ fontSize: 20 }}>NONE</Text>
                    <Text style={{ fontSize: 20 }}>FOLD</Text>
                    <Text style={{ fontSize: 20 }}>HALF/BOLD</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                    <Text style={{ fontSize: 20 }}>PACKING</Text>
                  </ScrollView>
                </View>
              ```</Modal>
                  </TouchableOpacity>
                 

              
              <TouchableOpacity >
                 <Text style={{ marginBottom: 16, fontSize: 16 }}>Defect</Text>
              </TouchableOpacity>   
             
               <TouchableOpacity onPress={handlePacking}>
                <Text style={{ fontSize: 16 }}>Color</Text>

                <Modal
                isVisible={visibleSecondModal}
                animationIn="bounce"
                backdropColor="transparent">
                <View
                  style={{
                    width: 200,
                    height: 300,
                    left: 35,
                    top: 70,
                    borderColor: "#DCDCDE",
                    borderWidth: 2,
                    borderStyle: "solid",
                    margin: "auto",
                    backgroundColor: "#DCDCDE",
                    borderRadius: 15,
                  }}>
                  <ScrollView>
                    <Button
                      style={{ backgroundColor: "red" }}
                      onPress={handleCloseSecondModal}>
                      Close
                    </Button>

                    <Text style={{ fontSize: 20 }}>RED</Text>
                    <Text style={{ fontSize: 20 }}>BLUE</Text>
                    <Text style={{ fontSize: 20 }}>YELLOW</Text>
                    <Text style={{ fontSize: 20 }}>GREEN</Text>
                    <Text style={{ fontSize: 20 }}>PINK</Text>
                    <Text style={{ fontSize: 20 }}>GOLDEN</Text>
                    <Text style={{ fontSize: 20 }}>PURPLW</Text>
                    <Text style={{ fontSize: 20 }}>SKY-BLUE</Text>
                    <Text style={{ fontSize: 20 }}>PEACH</Text>
                    <Text style={{ fontSize: 20 }}>ORANGE</Text>
                    <Text style={{ fontSize: 20 }}>PINK</Text>
                    <Text style={{ fontSize: 20 }}>DAISY</Text>
                    <Text style={{ fontSize: 20 }}>ROSE</Text>
                    <Text style={{ fontSize: 20 }}>BABY PINK</Text>
                    <Text style={{ fontSize: 20 }}>HALF</Text>
                    <Text style={{ fontSize: 20 }}>HALF</Text>
                    <Text style={{ fontSize: 20 }}>VIOLET</Text>
                    <Text style={{ fontSize: 20 }}>BLACK</Text>
                    <Text style={{ fontSize: 20 }}>CREAM</Text>
                    <Text style={{ fontSize: 20 }}>LIGHT BLUE</Text>
                    <Text style={{ fontSize: 20 }}>NAVY NLUE</Text>
                    <Text style={{ fontSize: 20 }}>BROWN</Text>
                    <Text style={{ fontSize: 20 }}>GREY</Text>
                    <Text style={{ fontSize: 20 }}>GOLD</Text>
                    <Text style={{ fontSize: 20 }}>GRAY</Text>
                  </ScrollView>
                </View>
              </Modal>
                </TouchableOpacity>   
              

            </View>

            <View style={{ top: 200 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="deepskyblue">
                ADD GARMENT
              </Button>
            </View>
            <View style={{ top: 250 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="red.500">
                Close
              </Button>
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <SafeAreaView>
        <ScrollView>
          <SwipeListView

            data={LimitMenItem}
    
            renderItem={(term, index) => (

              <View

                style={{
                  width: 368,
                  height: 90,
                  marginTop: 18,
                  display: "flex",
                  flexDirection: "row",
                  borderStyle: "solid",
                  borderColor: "#FFDBE680",
                  borderWidth: 1,
                  backgroundColor: "#FFDBE680",
                  marginLeft: 8,
                  borderRadius: 10,
                }}>
                <View style={{ marginLeft: 18 }}>
                  <Image
                    style={{ height: 74, width: 74 }}
                    alt="product-image"
                    source={{ uri: term?.item?.[ "garmentImagePath" ] }}
                  />
                </View>
                <View
                  style={{
                    width: 57,
                    height: 65,
                    marginLeft: 40,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                  <Text style={{ fontSize: 16, textAlign: "center" }}>
                    {term?.item?.[ "garmentName" ]}
                  </Text>
                  <View
                    style={{
                      width: 46,
                      height: 23,
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 4,
                      backgroundColor: "#DBDBDB",
                      justifyContent: "center",
                    }}>
                    <TouchableOpacity onPress={decrementCount}>
                      <AntDesign
                        name="minussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: "#002B6B",
                        fontSize: 14,
                        fontWeight: "700",
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}>
                      {count}
                    </Text>
                    <TouchableOpacity onPress={incrementCount}>
                      <AntDesign
                        name="plussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: 64,
                    height: 45,
                    marginLeft: 80,
                    justifyContent: "center",
                    marginTop: 14,
                  }}>
                  <Text style={{ fontSize: 16, color: "#000000" }}>
                    {"₹"} {term?.item?.[ "price" ]}
                  </Text>
                </View>

                <Button

                  onPress={() => handleAddCart(term?.item)}
                  style={{

                    backgroundColor: "#002B6B",
                    width: 60,
                    borderRadius: 10,
                    height: 90,
                    marginLeft: 40,
                  }}>
                  <Ionicons name="cart-outline" size={24} color="white" />



                  <View>



                  </View>
                </Button>
              </View>

            )}
            renderHiddenItem={RightSwipe}
            leftOpenValue={100}
            rightOpenValue={-130}
            stopLeftSwipe={1}
            closeOnRowBeginSwipe={true}
            closeOnScroll={true}
            


          />

        </ScrollView>
      </SafeAreaView>
    );
  }


 
 //============================ Women Componets =============================================================
  function WomenComponent() {

    // first modal usestate
    const [ isVisible, setIsVisible ] = useState(false);

    // second modal use state //
    const [ visibleSecondModal, setVisibleSecondModal ] = useState(false);

    const [ count, setCount ] = useState(0);

    const incrementCount = () => {
      setCount(count + 1);
    };
    const decrementCount = () => {
      setCount(count - 1);
    };
    const [ datas, setdatas ] = React.useState({})
    const handleAddCart = (item ) => {
      setIsVisible(true);
      setdatas(item);

    };
    console.log("line347", datas)

    const handlePacking = () => {
      setVisibleSecondModal(true);
    };

    const handleCloseModal = () => {
      setIsVisible(false);
    };

    const handleCloseSecondModal = () => {
      setVisibleSecondModal(false);
    };



    const RightSwipe = () => {



      return (
        <Modal
          key={index}
          isVisible={isVisible}
          animationIn="bounce"
          backdropColor="transparent">

          <View
            style={{
              width: 330,
              height: 720,
              left: 15,
              top: 0,
              borderColor: "#FFFFFF",
              borderWidth: 2,
              borderStyle: "solid",
              margin: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            }}>
            <View
              style={{
                width: 310,
                height: 50,
                backgroundColor: "green",
                left: 8,
                top: 40,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  marginTop: 15,
                  color: "#FFFFFF",
                }}>
                Garments Details
              </Text>
            </View>
            <View style={{ top: 130, left: 14 }}>
              <View>
                <Text style={{ left: 6 }}>Price</Text>
                <TextInput
                  style={styles.input1}
                  keyboardType="number-pad"
                  // @ts-ignore
                  placeholder={`₹ ${datas?.price}`}
                  placeholderTextColor="black"

                />
              </View>
              <View>
                <Text style={{ top: 20, left: 6 }}>Quantity</Text>
                <TextInput
                  style={styles.input2}
                  keyboardType="number-pad"
                  placeholder="1"
                  placeholderTextColor="black"
                />
              </View>
            </View>
            <View style={{ top: 150, left: 6 }}>
              <TouchableOpacity onPress={handlePacking}>
                <Text style={{ marginBottom: 16, fontSize: 16 }}>
                  Packing
                </Text>
              </TouchableOpacity>

              <Modal
                isVisible={visibleSecondModal}
                animationIn="bounce"
                backdropColor="transparent">
                <View
                  style={{
                    width: 200,
                    height: 300,
                    left: 35,
                    top: 70,
                    borderColor: "#DCDCDE",
                    borderWidth: 2,
                    borderStyle: "solid",
                    margin: "auto",
                    backgroundColor: "#DCDCDE",
                    borderRadius: 15,
                  }}>
                  <ScrollView>
                    <Button
                      style={{ backgroundColor: "red" }}
                      onPress={handleCloseSecondModal}>
                      Close
                    </Button>

                    <Text style={{ fontSize: 26 }}>HANGER</Text>
                    <Text style={{ fontSize: 26 }}>NONE</Text>
                    <Text style={{ fontSize: 26 }}>FOLD</Text>
                    <Text style={{ fontSize: 26 }}>HALF/BOLD</Text>
                    <Text style={{ fontSize: 26 }}>PACKING</Text>
                  </ScrollView>
                </View>
              </Modal>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Brand</Text>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Defect</Text>

              <Text style={{ fontSize: 16 }}>Color</Text>
            </View>

            <View style={{ top: 200 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="deepskyblue">
                ADD GARMENT
              </Button>
            </View>
            <View style={{ top: 250 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="red.500">
                Close
              </Button>
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <SafeAreaView>
        <ScrollView>
          <SwipeListView

            data={LimitWomenItem}
    
            renderItem={(term, index) => (

              <View

                style={{
                  width: 368,
                  height: 90,
                  marginTop: 18,
                  display: "flex",
                  flexDirection: "row",
                  borderStyle: "solid",
                  borderColor: "#FFDBE680",
                  borderWidth: 1,
                  backgroundColor: "#FFDBE680",
                  marginLeft: 8,
                  borderRadius: 10,
                }}>
                <View style={{ marginLeft: 18 }}>
                  <Image
                    style={{ height: 74, width: 74 }}
                    alt="product-image"
                    source={{ uri: term?.item?.[ "garmentImagePath" ] }}
                  />
                </View>
                <View
                  style={{
                    width: 57,
                    height: 65,
                    marginLeft: 40,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                  <Text style={{ fontSize: 16, textAlign: "center" }}>
                    {term?.item?.[ "garmentName" ]}
                  </Text>
                  <View
                    style={{
                      width: 46,
                      height: 23,
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 4,
                      backgroundColor: "#DBDBDB",
                      justifyContent: "center",
                    }}>
                    <TouchableOpacity onPress={decrementCount}>
                      <AntDesign
                        name="minussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: "#002B6B",
                        fontSize: 14,
                        fontWeight: "700",
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}>
                      {count}
                    </Text>
                    <TouchableOpacity onPress={incrementCount}>
                      <AntDesign
                        name="plussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: 64,
                    height: 45,
                    marginLeft: 80,
                    justifyContent: "center",
                    marginTop: 14,
                  }}>
                  <Text style={{ fontSize: 16, color: "#000000" }}>
                    {"₹"} {term?.item?.[ "price" ]}
                  </Text>
                </View>

                <Button

                  onPress={() => handleAddCart(term?.item)}
                  style={{

                    backgroundColor: "#002B6B",
                    width: 60,
                    borderRadius: 10,
                    height: 90,
                    marginLeft: 40,
                  }}>
                  <Ionicons name="cart-outline" size={24} color="white" />



                  <View>



                  </View>
                </Button>
              </View>

            )}
            renderHiddenItem={RightSwipe}
            leftOpenValue={100}
            rightOpenValue={-130}
            stopLeftSwipe={1}
            closeOnRowBeginSwipe={true}
            closeOnScroll={true}
            


          />

        </ScrollView>
      </SafeAreaView>
    );
  }


  //=============================== Kids Components ===========================================================
  function KidsComponent() {

    // first modal usestate
    const [ isVisible, setIsVisible ] = useState(false);

    // second modal use state //
    const [ visibleSecondModal, setVisibleSecondModal ] = useState(false);

    const [ count, setCount ] = useState(0);

    const incrementCount = () => {
      setCount(count + 1);
    };
    const decrementCount = () => {
      setCount(count - 1);
    };
    const [ datas, setdatas ] = React.useState({})
    const handleAddCart = (item) => {
      setIsVisible(true);
      setdatas(item);

    };
    console.log("line347", datas)

    const handlePacking = () => {
      setVisibleSecondModal(true);
    };

    const handleCloseModal = () => {
      setIsVisible(false);
    };

    const handleCloseSecondModal = () => {
      setVisibleSecondModal(false);
    };



    const RightSwipe = () => {



      return (
        <Modal
          key={index}
          isVisible={isVisible}
          animationIn="bounce"
          backdropColor="transparent">

          <View
            style={{
              width: 330,
              height: 720,
              left: 15,
              top: 0,
              borderColor: "#FFFFFF",
              borderWidth: 2,
              borderStyle: "solid",
              margin: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            }}>
            <View
              style={{
                width: 310,
                height: 50,
                backgroundColor: "green",
                left: 8,
                top: 40,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  marginTop: 15,
                  color: "#FFFFFF",
                }}>
                Garments Details
              </Text>
            </View>
            <View style={{ top: 130, left: 14 }}>
              <View>
                <Text style={{ left: 6 }}>Price</Text>
                <TextInput
                  style={styles.input1}
                  keyboardType="number-pad"
                  // @ts-ignore
                  placeholder={`₹ ${datas?.price}`}
                  placeholderTextColor="black"

                />
              </View>
              <View>
                <Text style={{ top: 20, left: 6 }}>Quantity</Text>
                <TextInput
                  style={styles.input2}
                  keyboardType="number-pad"
                  placeholder="1"
                  placeholderTextColor="black"
                />
              </View>
            </View>
            <View style={{ top: 150, left: 6 }}>
              <TouchableOpacity onPress={handlePacking}>
                <Text style={{ marginBottom: 16, fontSize: 16 }}>
                  Packing
                </Text>
              </TouchableOpacity>

              <Modal
                isVisible={visibleSecondModal}
                animationIn="bounce"
                backdropColor="transparent">
                <View
                  style={{
                    width: 200,
                    height: 300,
                    left: 35,
                    top: 70,
                    borderColor: "#DCDCDE",
                    borderWidth: 2,
                    borderStyle: "solid",
                    margin: "auto",
                    backgroundColor: "#DCDCDE",
                    borderRadius: 15,
                  }}>
                  <ScrollView>
                    <Button
                      style={{ backgroundColor: "red" }}
                      onPress={handleCloseSecondModal}>
                      Close
                    </Button>

                    <Text style={{ fontSize: 26 }}>HANGER</Text>
                    <Text style={{ fontSize: 26 }}>NONE</Text>
                    <Text style={{ fontSize: 26 }}>FOLD</Text>
                    <Text style={{ fontSize: 26 }}>HALF/BOLD</Text>
                    <Text style={{ fontSize: 26 }}>PACKING</Text>
                  </ScrollView>
                </View>
              </Modal>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Brand</Text>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Defect</Text>

              <Text style={{ fontSize: 16 }}>Color</Text>
            </View>

            <View style={{ top: 200 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="deepskyblue">
                ADD GARMENT
              </Button>
            </View>
            <View style={{ top: 250 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="red.500">
                Close
              </Button>
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <SafeAreaView>
        <ScrollView>
          <SwipeListView

            data={LimitKidsItem}
    
            renderItem={(term, index) => (

              <View
              
                style={{
                  width: 368,
                  height: 90,
                  marginTop: 18,
                  display: "flex",
                  flexDirection: "row",
                  borderStyle: "solid",
                  borderColor: "#FFDBE680",
                  borderWidth: 1,
                  backgroundColor: "#FFDBE680",
                  marginLeft: 8,
                  borderRadius: 10,
                }}>
                <View style={{ marginLeft: 18 }}>
                  <Image
                    style={{ height: 74, width: 74 }}
                    alt="product-image"
                    source={{ uri: term?.item?.[ "garmentImagePath" ] }}
                  />
                </View>
                <View
                  style={{
                    width: 57,
                    height: 65,
                    marginLeft: 40,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                  <Text style={{ fontSize: 16, textAlign: "center" }}>
                    {term?.item?.[ "garmentName" ]}
                  </Text>
                  <View
                    style={{
                      width: 46,
                      height: 23,
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 4,
                      backgroundColor: "#DBDBDB",
                      justifyContent: "center",
                    }}>
                    <TouchableOpacity onPress={decrementCount}>
                      <AntDesign
                        name="minussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: "#002B6B",
                        fontSize: 14,
                        fontWeight: "700",
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}>
                      {count}
                    </Text>
                    <TouchableOpacity onPress={incrementCount}>
                      <AntDesign
                        name="plussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: 64,
                    height: 45,
                    marginLeft: 80,
                    justifyContent: "center",
                    marginTop: 14,
                  }}>
                  <Text style={{ fontSize: 16, color: "#000000" }}>
                    {"₹"} {term?.item?.[ "price" ]}
                  </Text>
                </View>

                <Button

                  onPress={() => handleAddCart(term?.item)}
                  style={{

                    backgroundColor: "#002B6B",
                    width: 60,
                    borderRadius: 10,
                    height: 90,
                    marginLeft: 40,
                  }}>
                  <Ionicons name="cart-outline" size={24} color="white" />



                  <View>



                  </View>
                </Button>
              </View>

            )}
            renderHiddenItem={RightSwipe}
            leftOpenValue={100}
            rightOpenValue={-130}
            stopLeftSwipe={1}
            closeOnRowBeginSwipe={true}
            closeOnScroll={true}
            


          />

        </ScrollView>
      </SafeAreaView>
    );
  }


  //================================= Household Componnets =====================================================
  function HouseholdComponent() {

    // first modal usestate
    const [ isVisible, setIsVisible ] = useState(false);

    // second modal use state //
    const [ visibleSecondModal, setVisibleSecondModal ] = useState(false);

    const [ count, setCount ] = useState(0);

    const incrementCount = () => {
      setCount(count + 1);
    };
    const decrementCount = () => {
      setCount(count - 1);
    };
    const [ datas, setdatas ] = React.useState({})
    const handleAddCart = (item) => {
      setIsVisible(true);
      setdatas(item);

    };
    console.log("line347", datas)

    const handlePacking = () => {
      setVisibleSecondModal(true);
    };

    const handleCloseModal = () => {
      setIsVisible(false);
    };

    const handleCloseSecondModal = () => {
      setVisibleSecondModal(false);
    };



    const RightSwipe = () => {



      return (
        <Modal
          key={index}
          isVisible={isVisible}
          animationIn="bounce"
          backdropColor="transparent">

          <View
            style={{
              width: 330,
              height: 720,
              left: 15,
              top: 0,
              borderColor: "#FFFFFF",
              borderWidth: 2,
              borderStyle: "solid",
              margin: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            }}>
            <View
              style={{
                width: 310,
                height: 50,
                backgroundColor: "green",
                left: 8,
                top: 40,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  marginTop: 15,
                  color: "#FFFFFF",
                }}>
                Garments Details
              </Text>
            </View>
            <View style={{ top: 130, left: 14 }}>
              <View>
                <Text style={{ left: 6 }}>Price</Text>
                <TextInput
                  style={styles.input1}
                  keyboardType="number-pad"
                  // @ts-ignore
                  placeholder={`₹ ${datas?.price}`}
                  placeholderTextColor="black"

                />
              </View>
              <View>
                <Text style={{ top: 20, left: 6 }}>Quantity</Text>
                <TextInput
                  style={styles.input2}
                  keyboardType="number-pad"
                  placeholder="1"
                  placeholderTextColor="black"
                />
              </View>
            </View>
            <View style={{ top: 150, left: 6 }}>
              <TouchableOpacity onPress={handlePacking}>
                <Text style={{ marginBottom: 16, fontSize: 16 }}>
                  Packing
                </Text>
              </TouchableOpacity>

              <Modal
                isVisible={visibleSecondModal}
                animationIn="bounce"
                backdropColor="transparent">
                <View
                  style={{
                    width: 200,
                    height: 300,
                    left: 35,
                    top: 70,
                    borderColor: "#DCDCDE",
                    borderWidth: 2,
                    borderStyle: "solid",
                    margin: "auto",
                    backgroundColor: "#DCDCDE",
                    borderRadius: 15,
                  }}>
                  <ScrollView>
                    <Button
                      style={{ backgroundColor: "red" }}
                      onPress={handleCloseSecondModal}>
                      Close
                    </Button>

                    <Text style={{ fontSize: 26 }}>HANGER</Text>
                    <Text style={{ fontSize: 26 }}>NONE</Text>
                    <Text style={{ fontSize: 26 }}>FOLD</Text>
                    <Text style={{ fontSize: 26 }}>HALF/BOLD</Text>
                    <Text style={{ fontSize: 26 }}>PACKING</Text>
                  </ScrollView>
                </View>
              </Modal>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Brand</Text>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Defect</Text>

              <Text style={{ fontSize: 16 }}>Color</Text>
            </View>

            <View style={{ top: 200 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="deepskyblue">
                ADD GARMENT
              </Button>
            </View>
            <View style={{ top: 250 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="red.500">
                Close
              </Button>
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <SafeAreaView>
        <ScrollView>
          <SwipeListView

            data={LimitHouseholdItem}
    
            renderItem={(term, index) => (

              <View

                style={{
                  width: 368,
                  height: 90,
                  marginTop: 18,
                  display: "flex",
                  flexDirection: "row",
                  borderStyle: "solid",
                  borderColor: "#FFDBE680",
                  borderWidth: 1,
                  backgroundColor: "#FFDBE680",
                  marginLeft: 8,
                  borderRadius: 10,
                }}>
                <View style={{ marginLeft: 18 }}>
                  <Image
                    style={{ height: 74, width: 74 }}
                    alt="product-image"
                    source={{ uri: term?.item?.[ "garmentImagePath" ] }}
                  />
                </View>
                <View
                  style={{
                    width: 67,
                    height: 63,
                    marginLeft: 40,
                    alignItems: "center",
                    justifyContent:"center"
                    
                  
                  }}>
                  <Text style={{ fontSize: 16, textAlign: "center" }}>
                    {term?.item?.[ "garmentName" ]}
                  </Text>
                  <View
                    style={{
                      width: 46,
                      height: 23,
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 4,
                      backgroundColor: "#DBDBDB",
                      justifyContent: "center",
                    }}>
                    <TouchableOpacity onPress={decrementCount}>
                      <AntDesign
                        name="minussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: "#002B6B",
                        fontSize: 14,
                        fontWeight: "700",
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}>
                      {count}
                    </Text>
                    <TouchableOpacity onPress={incrementCount}>
                      <AntDesign
                        name="plussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: 64,
                    height: 45,
                    marginLeft: 80,
                    justifyContent: "center",
                    marginTop: 14,
                  }}>
                  <Text style={{ fontSize: 16, color: "#000000" }}>
                    {"₹"} {term?.item?.[ "price" ]}
                  </Text>
                </View>

                <Button

                  onPress={() => handleAddCart(term?.item)}
                  style={{

                    backgroundColor: "#002B6B",
                    width: 60,
                    borderRadius: 10,
                    height: 90,
                    marginLeft: 40,
                  }}>
                  <Ionicons name="cart-outline" size={24} color="white" />



                  <View>



                  </View>
                </Button>
              </View>

            )}
            renderHiddenItem={RightSwipe}
            leftOpenValue={100}
            rightOpenValue={-130}
            stopLeftSwipe={1}
            closeOnRowBeginSwipe={true}
            closeOnScroll={true}
            


          />

        </ScrollView>
      </SafeAreaView>
    );
  }


//=================================== INSTITUTONAL COMPONENTS ===============================================================
 function InstitutionalComponent() {

    // first modal usestate
    const [ isVisible, setIsVisible ] = useState(false);

    // second modal use state //
    const [ visibleSecondModal, setVisibleSecondModal ] = useState(false);

    const [ count, setCount ] = useState(0);

    const incrementCount = () => {
      setCount(count + 1);
    };
    const decrementCount = () => {
      setCount(count - 1);
    };
    const [ datas, setdatas ] = React.useState({})
    const handleAddCart = (item) => {
      setIsVisible(true);
      setdatas(item);

    };
    console.log("line347", datas)

    const handlePacking = () => {
      setVisibleSecondModal(true);
    };

    const handleCloseModal = () => {
      setIsVisible(false);
    };

    const handleCloseSecondModal = () => {
      setVisibleSecondModal(false);
    };



    const RightSwipe = () => {



      return (
        <Modal
          key={index}
          isVisible={isVisible}
          animationIn="bounce"
          backdropColor="transparent">

          <View
            style={{
              width: 330,
              height: 720,
              left: 15,
              top: 0,
              borderColor: "#FFFFFF",
              borderWidth: 2,
              borderStyle: "solid",
              margin: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            }}>
            <View
              style={{
                width: 310,
                height: 50,
                backgroundColor: "green",
                left: 8,
                top: 40,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  marginTop: 15,
                  color: "#FFFFFF",
                }}>
                Garments Details
              </Text>
            </View>
            <View style={{ top: 130, left: 14 }}>
              <View>
                <Text style={{ left: 6 }}>Price</Text>
                <TextInput
                  style={styles.input1}
                  keyboardType="number-pad"
                  // @ts-ignore
                  placeholder={`₹ ${datas?.price}`}
                  placeholderTextColor="black"

                />
              </View>
              <View>
                <Text style={{ top: 20, left: 6 }}>Quantity</Text>
                <TextInput
                  style={styles.input2}
                  keyboardType="number-pad"
                  placeholder="1"
                  placeholderTextColor="black"
                />
              </View>
            </View>
            <View style={{ top: 150, left: 6 }}>
              <TouchableOpacity onPress={handlePacking}>
                <Text style={{ marginBottom: 16, fontSize: 16 }}>
                  Packing
                </Text>
              </TouchableOpacity>

              <Modal
                isVisible={visibleSecondModal}
                animationIn="bounce"
                backdropColor="transparent">
                <View
                  style={{
                    width: 200,
                    height: 300,
                    left: 35,
                    top: 70,
                    borderColor: "#DCDCDE",
                    borderWidth: 2,
                    borderStyle: "solid",
                    margin: "auto",
                    backgroundColor: "#DCDCDE",
                    borderRadius: 15,
                  }}>
                  <ScrollView>
                    <Button
                      style={{ backgroundColor: "red" }}
                      onPress={handleCloseSecondModal}>
                      Close
                    </Button>

                    <Text style={{ fontSize: 26 }}>HANGER</Text>
                    <Text style={{ fontSize: 26 }}>NONE</Text>
                    <Text style={{ fontSize: 26 }}>FOLD</Text>
                    <Text style={{ fontSize: 26 }}>HALF/BOLD</Text>
                    <Text style={{ fontSize: 26 }}>PACKING</Text>
                  </ScrollView>
                </View>
              </Modal>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Brand</Text>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Defect</Text>

              <Text style={{ fontSize: 16 }}>Color</Text>
            </View>

            <View style={{ top: 200 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="deepskyblue">
                ADD GARMENT
              </Button>
            </View>
            <View style={{ top: 250 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="red.500">
                Close
              </Button>
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <SafeAreaView>
        <ScrollView>
          <SwipeListView

            data={LimitInstitutionalItem}
    
            renderItem={(term, index) => (

              <View
                style={{
                  width: 368,
                  height: 90,
                  marginTop: 18,
                  display: "flex",
                  flexDirection: "row",
                  borderStyle: "solid",
                  borderColor: "#FFDBE680",
                  borderWidth: 1,
                  backgroundColor: "#FFDBE680",
                  marginLeft: 8,
                  borderRadius: 10,
                }}>
                <View style={{ marginLeft: 18 }}>
                  <Image
                    style={{ height: 74, width: 74 }}
                    alt="product-image"
                    source={{ uri: term?.item?.[ "garmentImagePath" ] }}
                  />
                </View>
                <View
                  style={{
                    width: 67,
                    height: 63,
                    marginLeft: 40,
                    alignItems: "center",
                    justifyContent:"center"
                    
                  
                  }}>
                  <Text style={{ fontSize: 16, textAlign: "center" }}>
                    {term?.item?.[ "garmentName" ]}
                  </Text>
                  <View
                    style={{
                      width: 46,
                      height: 23,
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 4,
                      backgroundColor: "#DBDBDB",
                      justifyContent: "center",
                    }}>
                    <TouchableOpacity onPress={decrementCount}>
                      <AntDesign
                        name="minussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: "#002B6B",
                        fontSize: 14,
                        fontWeight: "700",
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}>
                      {count}
                    </Text>
                    <TouchableOpacity onPress={incrementCount}>
                      <AntDesign
                        name="plussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: 64,
                    height: 45,
                    marginLeft: 80,
                    justifyContent: "center",
                    marginTop: 14,
                  }}>
                  <Text style={{ fontSize: 16, color: "#000000" }}>
                    {"₹"} {term?.item?.[ "price" ]}
                  </Text>
                </View>

                <Button

                  onPress={() => handleAddCart(term?.item)}
                  style={{

                    backgroundColor: "#002B6B",
                    width: 60,
                    borderRadius: 10,
                    height: 90,
                    marginLeft: 40,
                  }}>
                  <Ionicons name="cart-outline" size={24} color="white" />



                  <View>



                  </View>
                </Button>
              </View>

            )}
            renderHiddenItem={RightSwipe}
            leftOpenValue={100}
            rightOpenValue={-130}
            stopLeftSwipe={1}
            closeOnRowBeginSwipe={true}
            closeOnScroll={true}
            


          />

        </ScrollView>
      </SafeAreaView>
    );
  }
//=================================== Others COMPONENTS ===============================================================
 function OthersComponent() {

    // first modal usestate
    const [ isVisible, setIsVisible ] = useState(false);

    // second modal use state //
    const [ visibleSecondModal, setVisibleSecondModal ] = useState(false);

    const [ count, setCount ] = useState(0);

    const incrementCount = () => {
      setCount(count + 1);
    };
    const decrementCount = () => {
      setCount(count - 1);
    };
    const [ datas, setdatas ] = React.useState({})
    const handleAddCart = (item) => {
      setIsVisible(true);
      setdatas(item);

    };
    console.log("line347", datas)

    const handlePacking = () => {
      setVisibleSecondModal(true);
    };

    const handleCloseModal = () => {
      setIsVisible(false);
    };

    const handleCloseSecondModal = () => {
      setVisibleSecondModal(false);
    };



    const RightSwipe = () => {



      return (
        <Modal
          key={index}
          isVisible={isVisible}
          animationIn="bounce"
          backdropColor="transparent">

          <View
            style={{
              width: 330,
              height: 720,
              left: 15,
              top: 0,
              borderColor: "#FFFFFF",
              borderWidth: 2,
              borderStyle: "solid",
              margin: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            }}>
            <View
              style={{
                width: 310,
                height: 50,
                backgroundColor: "green",
                left: 8,
                top: 40,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  marginTop: 15,
                  color: "#FFFFFF",
                }}>
                Garments Details
              </Text>
            </View>
            <View style={{ top: 130, left: 14 }}>
              <View>
                <Text style={{ left: 6 }}>Price</Text>
                <TextInput
                  style={styles.input1}
                  keyboardType="number-pad"
                  // @ts-ignore
                  placeholder={`₹ ${datas?.price}`}
                  placeholderTextColor="black"

                />
              </View>
              <View>
                <Text style={{ top: 20, left: 6 }}>Quantity</Text>
                <TextInput
                  style={styles.input2}
                  keyboardType="number-pad"
                  placeholder="1"
                  placeholderTextColor="black"
                />
              </View>
            </View>
            <View style={{ top: 150, left: 6 }}>
              <TouchableOpacity onPress={handlePacking}>
                <Text style={{ marginBottom: 16, fontSize: 16 }}>
                  Packing
                </Text>
              </TouchableOpacity>

              <Modal
                isVisible={visibleSecondModal}
                animationIn="bounce"
                backdropColor="transparent">
                <View
                  style={{
                    width: 200,
                    height: 300,
                    left: 35,
                    top: 70,
                    borderColor: "#DCDCDE",
                    borderWidth: 2,
                    borderStyle: "solid",
                    margin: "auto",
                    backgroundColor: "#DCDCDE",
                    borderRadius: 15,
                  }}>
                  <ScrollView>
                    <Button
                      style={{ backgroundColor: "red" }}
                      onPress={handleCloseSecondModal}>
                      Close
                    </Button>

                    <Text style={{ fontSize: 26 }}>HANGER</Text>
                    <Text style={{ fontSize: 26 }}>NONE</Text>
                    <Text style={{ fontSize: 26 }}>FOLD</Text>
                    <Text style={{ fontSize: 26 }}>HALF/BOLD</Text>
                    <Text style={{ fontSize: 26 }}>PACKING</Text>
                  </ScrollView>
                </View>
              </Modal>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Brand</Text>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Defect</Text>

              <Text style={{ fontSize: 16 }}>Color</Text>
            </View>

            <View style={{ top: 200 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="deepskyblue">
                ADD GARMENT
              </Button>
            </View>
            <View style={{ top: 250 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="red.500">
                Close
              </Button>
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <SafeAreaView>
        <ScrollView>
          <SwipeListView

            data={LimitOthersItem}
    
            renderItem={(term, index) => (

              <View

                style={{
                  width: 368,
                  height: 90,
                  marginTop: 18,
                  display: "flex",
                  flexDirection: "row",
                  borderStyle: "solid",
                  borderColor: "#FFDBE680",
                  borderWidth: 1,
                  backgroundColor: "#FFDBE680",
                  marginLeft: 8,
                  borderRadius: 10,
                }}>
                <View style={{ marginLeft: 18 }}>
                  <Image
                    style={{ height: 74, width: 74 }}
                    alt="product-image"
                    source={{ uri: term?.item?.[ "garmentImagePath" ] }}
                  />
                </View>
                <View
                  style={{
                    width: 67,
                    height: 63,
                    marginLeft: 40,
                    alignItems: "center",
                    justifyContent:"center"
                    
                  
                  }}>
                  <Text style={{ fontSize: 16, textAlign: "center" }}>
                    {term?.item?.[ "garmentName" ]}
                  </Text>
                  <View
                    style={{
                      width: 46,
                      height: 23,
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 4,
                      backgroundColor: "#DBDBDB",
                      justifyContent: "center",
                    }}>
                    <TouchableOpacity onPress={decrementCount}>
                      <AntDesign
                        name="minussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: "#002B6B",
                        fontSize: 14,
                        fontWeight: "700",
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}>
                      {count}
                    </Text>
                    <TouchableOpacity onPress={incrementCount}>
                      <AntDesign
                        name="plussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: 64,
                    height: 45,
                    marginLeft: 80,
                    justifyContent: "center",
                    marginTop: 14,
                  }}>
                  <Text style={{ fontSize: 16, color: "#000000" }}>
                    {"₹"} {term?.item?.[ "price" ]}
                  </Text>
                </View>

                <Button

                  onPress={() => handleAddCart(term?.item)}
                  style={{

                    backgroundColor: "#002B6B",
                    width: 60,
                    borderRadius: 10,
                    height: 90,
                    marginLeft: 40,
                  }}>
                  <Ionicons name="cart-outline" size={24} color="white" />



                  <View>



                  </View>
                </Button>
              </View>

            )}
            renderHiddenItem={RightSwipe}
            leftOpenValue={100}
            rightOpenValue={-130}
            stopLeftSwipe={1}
            closeOnRowBeginSwipe={true}
            closeOnScroll={true}
            


          />

        </ScrollView>
      </SafeAreaView>
    );
  }




//=================================== KIDS GIRLS COMPONENTS ===============================================================
 function KidsGirlsComponent() {

    // first modal usestate
    const [ isVisible, setIsVisible ] = useState(false);

    // second modal use state //
    const [ visibleSecondModal, setVisibleSecondModal ] = useState(false);

    const [ count, setCount ] = useState(0);

    const incrementCount = () => {
      setCount(count + 1);
    };
    const decrementCount = () => {
      setCount(count - 1);
    };
    const [ datas, setdatas ] = React.useState({})
    const handleAddCart = (item) => {
      setIsVisible(true);
      setdatas(item);

    };
    console.log("line347", datas)

    const handlePacking = () => {
      setVisibleSecondModal(true);
    };

    const handleCloseModal = () => {
      setIsVisible(false);
    };

    const handleCloseSecondModal = () => {
      setVisibleSecondModal(false);
    };



    const RightSwipe = () => {



      return (
        <Modal
          key={index}
          isVisible={isVisible}
          animationIn="bounce"
          backdropColor="transparent">

          <View
            style={{
              width: 330,
              height: 720,
              left: 15,
              top: 0,
              borderColor: "#FFFFFF",
              borderWidth: 2,
              borderStyle: "solid",
              margin: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            }}>
            <View
              style={{
                width: 310,
                height: 50,
                backgroundColor: "green",
                left: 8,
                top: 40,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  marginTop: 15,
                  color: "#FFFFFF",
                }}>
                Garments Details
              </Text>
            </View>
            <View style={{ top: 130, left: 14 }}>
              <View>
                <Text style={{ left: 6 }}>Price</Text>
                <TextInput
                  style={styles.input1}
                  keyboardType="number-pad"
                  // @ts-ignore
                  placeholder={`₹ ${datas?.price}`}
                  placeholderTextColor="black"

                />
              </View>
              <View>
                <Text style={{ top: 20, left: 6 }}>Quantity</Text>
                <TextInput
                  style={styles.input2}
                  keyboardType="number-pad"
                  placeholder="1"
                  placeholderTextColor="black"
                />
              </View>
            </View>
            <View style={{ top: 150, left: 6 }}>
              <TouchableOpacity onPress={handlePacking}>
                <Text style={{ marginBottom: 16, fontSize: 16 }}>
                  Packing
                </Text>
              </TouchableOpacity>

              <Modal
                isVisible={visibleSecondModal}
                animationIn="bounce"
                backdropColor="transparent">
                <View
                  style={{
                    width: 200,
                    height: 300,
                    left: 35,
                    top: 70,
                    borderColor: "#DCDCDE",
                    borderWidth: 2,
                    borderStyle: "solid",
                    margin: "auto",
                    backgroundColor: "#DCDCDE",
                    borderRadius: 15,
                  }}>
                  <ScrollView>
                    <Button
                      style={{ backgroundColor: "red" }}
                      onPress={handleCloseSecondModal}>
                      Close
                    </Button>

                    <Text style={{ fontSize: 26 }}>HANGER</Text>
                    <Text style={{ fontSize: 26 }}>NONE</Text>
                    <Text style={{ fontSize: 26 }}>FOLD</Text>
                    <Text style={{ fontSize: 26 }}>HALF/BOLD</Text>
                    <Text style={{ fontSize: 26 }}>PACKING</Text>
                  </ScrollView>
                </View>
              </Modal>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Brand</Text>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Defect</Text>

              <Text style={{ fontSize: 16 }}>Color</Text>
            </View>

            <View style={{ top: 200 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="deepskyblue">
                ADD GARMENT
              </Button>
            </View>
            <View style={{ top: 250 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="red.500">
                Close
              </Button>
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <SafeAreaView>
        <ScrollView>
          <SwipeListView

            data={LimitKidsGirlsItem}
    
            renderItem={(term, index) => (

              <View
                style={{
                  width: 368,
                  height: 90,
                  marginTop: 18,
                  display: "flex",
                  flexDirection: "row",
                  borderStyle: "solid",
                  borderColor: "#FFDBE680",
                  borderWidth: 1,
                  backgroundColor: "#FFDBE680",
                  marginLeft: 8,
                  borderRadius: 10,
                }}>
                <View style={{ marginLeft: 18 }}>
                  <Image
                    style={{ height: 74, width: 74 }}
                    alt="product-image"
                    source={{ uri: term?.item?.[ "garmentImagePath" ] }}
                  />
                </View>
                <View
                  style={{
                    width: 67,
                    height: 63,
                    marginLeft: 40,
                    alignItems: "center",
                    justifyContent:"center"
                    
                  
                  }}>
                  <Text style={{ fontSize: 16, textAlign: "center" }}>
                    {term?.item?.[ "garmentName" ]}
                  </Text>
                  <View
                    style={{
                      width: 46,
                      height: 23,
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 4,
                      backgroundColor: "#DBDBDB",
                      justifyContent: "center",
                    }}>
                    <TouchableOpacity onPress={decrementCount}>
                      <AntDesign
                        name="minussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: "#002B6B",
                        fontSize: 14,
                        fontWeight: "700",
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}>
                      {count}
                    </Text>
                    <TouchableOpacity onPress={incrementCount}>
                      <AntDesign
                        name="plussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: 64,
                    height: 45,
                    marginLeft: 80,
                    justifyContent: "center",
                    marginTop: 14,
                  }}>
                  <Text style={{ fontSize: 16, color: "#000000" }}>
                    {"₹"} {term?.item?.[ "price" ]}
                  </Text>
                </View>

                <Button

                  onPress={() => handleAddCart(term?.item)}
                  style={{

                    backgroundColor: "#002B6B",
                    width: 60,
                    borderRadius: 10,
                    height: 90,
                    marginLeft: 40,
                  }}>
                  <Ionicons name="cart-outline" size={24} color="white" />



                  <View>



                  </View>
                </Button>
              </View>

            )}
            renderHiddenItem={RightSwipe}
            leftOpenValue={100}
            rightOpenValue={-130}
            stopLeftSwipe={1}
            closeOnRowBeginSwipe={true}
            closeOnScroll={true}
            


          />

        </ScrollView>
      </SafeAreaView>
    );
  }

//=================================== KIDS Boys COMPONENTS ===============================================================
 function KidsBoysComponent() {

    // first modal usestate
    const [ isVisible, setIsVisible ] = useState(false);

    // second modal use state //
    const [ visibleSecondModal, setVisibleSecondModal ] = useState(false);

    const [ count, setCount ] = useState(0);

    const incrementCount = () => {
      setCount(count + 1);
    };
    const decrementCount = () => {
      setCount(count - 1);
    };
    const [ datas, setdatas ] = React.useState({})
    const handleAddCart = (item) => {
      setIsVisible(true);
      setdatas(item);

    };
    console.log("line347", datas)

    const handlePacking = () => {
      setVisibleSecondModal(true);
    };

    const handleCloseModal = () => {
      setIsVisible(false);
    };

    const handleCloseSecondModal = () => {
      setVisibleSecondModal(false);
    };



    const RightSwipe = () => {



      return (
        <Modal
          key={index}
          isVisible={isVisible}
          animationIn="bounce"
          backdropColor="transparent">

          <View
            style={{
              width: 330,
              height: 720,
              left: 15,
              top: 0,
              borderColor: "#FFFFFF",
              borderWidth: 2,
              borderStyle: "solid",
              margin: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            }}>
            <View
              style={{
                width: 310,
                height: 50,
                backgroundColor: "green",
                left: 8,
                top: 40,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  marginTop: 15,
                  color: "#FFFFFF",
                }}>
                Garments Details
              </Text>
            </View>
            <View style={{ top: 130, left: 14 }}>
              <View>
                <Text style={{ left: 6 }}>Price</Text>
                <TextInput
                  style={styles.input1}
                  keyboardType="number-pad"
                  // @ts-ignore
                  placeholder={`₹ ${datas?.price}`}
                  placeholderTextColor="black"

                />
              </View>
              <View>
                <Text style={{ top: 20, left: 6 }}>Quantity</Text>
                <TextInput
                  style={styles.input2}
                  keyboardType="number-pad"
                  placeholder="1"
                  placeholderTextColor="black"
                />
              </View>
            </View>
            <View style={{ top: 150, left: 6 }}>
              <TouchableOpacity onPress={handlePacking}>
                <Text style={{ marginBottom: 16, fontSize: 16 }}>
                  Packing
                </Text>
              </TouchableOpacity>

              <Modal
                isVisible={visibleSecondModal}
                animationIn="bounce"
                backdropColor="transparent">
                <View
                  style={{
                    width: 200,
                    height: 300,
                    left: 35,
                    top: 70,
                    borderColor: "#DCDCDE",
                    borderWidth: 2,
                    borderStyle: "solid",
                    margin: "auto",
                    backgroundColor: "#DCDCDE",
                    borderRadius: 15,
                  }}>
                  <ScrollView>
                    <Button
                      style={{ backgroundColor: "red" }}
                      onPress={handleCloseSecondModal}>
                      Close
                    </Button>

                    <Text style={{ fontSize: 26 }}>HANGER</Text>
                    <Text style={{ fontSize: 26 }}>NONE</Text>
                    <Text style={{ fontSize: 26 }}>FOLD</Text>
                    <Text style={{ fontSize: 26 }}>HALF/BOLD</Text>
                    <Text style={{ fontSize: 26 }}>PACKING</Text>
                  </ScrollView>
                </View>
              </Modal>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Brand</Text>

              <Text style={{ marginBottom: 16, fontSize: 16 }}>Defect</Text>

              <Text style={{ fontSize: 16 }}>Color</Text>
            </View>

            <View style={{ top: 200 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="deepskyblue">
                ADD GARMENT
              </Button>
            </View>
            <View style={{ top: 250 }}>
              <Button
                style={{ width: 300, left: 14, height: 40 }}
                onPress={handleCloseModal}
                bgColor="red.500">
                Close
              </Button>
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <SafeAreaView>
        <ScrollView>
          <SwipeListView

            data={LimitKidsBoysItem}
    
            renderItem={(term, index) => (

              <View
                style={{
                  width: 368,
                  height: 90,
                  marginTop: 18,
                  display: "flex",
                  flexDirection: "row",
                  borderStyle: "solid",
                  borderColor: "#FFDBE680",
                  borderWidth: 1,
                  backgroundColor: "#FFDBE680",
                  marginLeft: 8,
                  borderRadius: 10,
                }}>
                <View style={{ marginLeft: 18 }}>
                  <Image
                    style={{ height: 74, width: 74 }}
                    alt="product-image"
                    source={{ uri: term?.item?.[ "garmentImagePath" ] }}
                  />
                </View>
                <View
                  style={{
                    width: 67,
                    height: 63,
                    marginLeft: 40,
                    alignItems: "center",
                    justifyContent:"center"
                    
                  
                  }}>
                  <Text style={{ fontSize: 16, textAlign: "center" }}>
                    {term?.item?.[ "garmentName" ]}
                  </Text>
                  <View
                    style={{
                      width: 46,
                      height: 23,
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 4,
                      backgroundColor: "#DBDBDB",
                      justifyContent: "center",
                    }}>
                    <TouchableOpacity onPress={decrementCount}>
                      <AntDesign
                        name="minussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: "#002B6B",
                        fontSize: 14,
                        fontWeight: "700",
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}>
                      {count}
                    </Text>
                    <TouchableOpacity onPress={incrementCount}>
                      <AntDesign
                        name="plussquareo"
                        size={15}
                        color="black"
                        style={{ marginTop: 4 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: 64,
                    height: 45,
                    marginLeft: 80,
                    justifyContent: "center",
                    marginTop: 14,
                  }}>
                  <Text style={{ fontSize: 16, color: "#000000" }}>
                    {"₹"} {term?.item?.[ "price" ]}
                  </Text>
                </View>

                <Button

                  onPress={() => handleAddCart(term?.item)}
                  style={{

                    backgroundColor: "#002B6B",
                    width: 60,
                    borderRadius: 10,
                    height: 90,
                    marginLeft: 40,
                  }}>
                  <Ionicons name="cart-outline" size={24} color="white" />

                  <View>

                  </View>
                </Button>
              </View>

            )}
            renderHiddenItem={RightSwipe}
            leftOpenValue={100}
            rightOpenValue={-130}
            stopLeftSwipe={1}
            closeOnRowBeginSwipe={true}
            closeOnScroll={true}
 
          />

        </ScrollView>
      </SafeAreaView>
    );
  }
  



};
export default Category;




const styles = StyleSheet.create({
  input1: {
    width: 300,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 7,
    fontSize: 20,
    padding: 10,
  },
  input2: {
    width: 100,
    height: 60,
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 20,
    fontSize: 20,
    padding: 10,
  },
});
