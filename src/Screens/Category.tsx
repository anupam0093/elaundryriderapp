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

} from "react-native";
// import Modal from 'react-native-modal'
import { Box, Text, Button } from "native-base";
import React, { Key, useState } from "react";
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

interface NavigationProps {
  navigation?: any;
}

const Category = ({ navigation }: NavigationProps) => {
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
  // console.log({ modalData }, "filtered item for Kids Item")

  //======================= filter for Household's====================================================================
  const HouseholdItem = showGarments.filter(item =>
    item?.[ "categoryName" ] === "Household")

  const LimitHouseholdItem = HouseholdItem.slice(startIndex, startIndex + itemsPerPage)

  console.log({ LimitHouseholdItem }, "filtered item for Household Item")
  // console.log({ modalData }, "filtered item for Household Item")



  React.useEffect(() => {
    getsearchGarmentByStoreId()
  }, [])


  const [ index, setIndex ] = React.useState(0);
  const [ routes ] = React.useState([
    { key: "mens", title: "Mens" },
    { key: "womens", title: "Womens" },
    { key: "kids", title: "Kids" },
    { key: "household", title: "Households" },
    { key: "woolens", title: "Woolens" },
    { key: "others", title: "Others" },
    { key: "offices", title: "Offices" },
  ]);
  const renderScene = SceneMap({
    mens: MensComponent,
    womens: WomenComponent,
    kids: KidsComponent,
    household: HouseholdComponent,
    woolens: WoolensComponent,
    others: OthersComponent,
    offices: OfficesComponent,
  });





  const initialLayout = { width: Dimensions.get("window").width };
  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={{ height: 926, width: "100%", backgroundColor: "#F3F1F6" }}>
          <Box
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

            <Box
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
            </Box>

            <AntDesign
              name="shoppingcart"
              size={26}
              color="#5D7EFC"
              style={{ marginTop: 30, marginRight: 30 }}
            />
          </Box>
          {/* data coming from backend */}
          <Box
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
          </Box>
          <Box style={{ display: "flex" }}>
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
          </Box>
          <Box
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
          </Box>

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
  function MensComponent() {

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
    const handleAddCart = (item: any) => {
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

            data={LimitMenItem}
    
            renderItem={(term, index) => (

              <Box

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
              </Box>

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

    const handleAddCart = () => {
      setIsVisible(true);
    };

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
        <Button
          onPress={handleAddCart}
          style={{
            marginTop: 20,
            backgroundColor: "#002B6B",
            width: 60,
            borderRadius: 10,
            height: 90,
            marginRight: 50,
          }}>
          <Ionicons name="cart-outline" size={24} color="white" />

          <View>
            <Modal
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
                      placeholder="0"
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
          </View>
        </Button>
      );
    };

    return (
      <SafeAreaView>
        <Swipelist
          data={LimitWomenItem}
          renderRightItem={(data, index) => (
            <Box
              key={index}
              style={{
                width: SCREEN_WIDTH,
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
                  source={{ uri: data.garmentImagePath }}
                />
              </View>
              <View
                style={{
                  width: 118,
                  height: 65,
                  marginLeft: 15,
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  {data.garmentName}
                </Text>
                <View
                  style={{
                    width: 45,
                    height: 23,
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 4,
                    backgroundColor: "#DBDBDB",
                    justifyContent: "center",
                  }}>
                  <AntDesign
                    name="minussquareo"
                    size={13}
                    color="black"
                    style={{ marginTop: 4 }}
                  />
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
                  <AntDesign
                    name="plussquareo"
                    size={13}
                    color="black"
                    style={{ marginTop: 4 }}
                  />
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
                  {"₹"} {data.price}
                </Text>
              </View>
            </Box>
          )}
          renderHiddenItem={RightSwipe}
          rightOpenValue={100}
        />
      </SafeAreaView>
    );
  }

  //=============================== Kids Components ===========================================================

  function KidsComponent() {
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

    const handleAddCart = () => {
      setIsVisible(true);
    };

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
        <Button
          onPress={handleAddCart}
          style={{
            marginTop: 20,
            backgroundColor: "#002B6B",
            width: 60,
            borderRadius: 10,
            height: 90,
            marginRight: 50,
          }}>
          <Ionicons name="cart-outline" size={24} color="white" />

          <View>
            <Modal
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
                      placeholder="0"
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
          </View>
        </Button>
      );
    };

    return (
      <SafeAreaView>
        <Swipelist
          data={LimitKidsItem}
          renderRightItem={(data, index) => (
            <Box
              key={index}
              style={{
                width: SCREEN_WIDTH,
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
                  source={{ uri: data.garmentImagePath }}
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
                  {data.categoryName}
                </Text>
                <View
                  style={{
                    width: 45,
                    height: 23,
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 4,
                    backgroundColor: "#DBDBDB",
                    justifyContent: "center",
                  }}>
                  <AntDesign
                    name="minussquareo"
                    size={13}
                    color="black"
                    style={{ marginTop: 4 }}
                  />
                  <Text
                    style={{
                      color: "#002B6B",
                      fontSize: 16,
                      fontWeight: "700",
                      paddingLeft: 3,
                      paddingRight: 3,
                    }}>
                    {count}
                  </Text>
                  <AntDesign
                    name="plussquareo"
                    size={13}
                    color="black"
                    style={{ marginTop: 4 }}
                  />
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
                  {"₹"} {data.price}
                </Text>
              </View>
            </Box>
          )}
          renderHiddenItem={RightSwipe}
          rightOpenValue={100}
        />
      </SafeAreaView>
    );
  }


  //================================= Household Componnets =====================================================

  function HouseholdComponent() {
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

    const handleAddCart = () => {
      setIsVisible(true);
    };

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
        <Button
          onPress={handleAddCart}
          style={{
            marginTop: 20,
            backgroundColor: "#002B6B",
            width: 60,
            borderRadius: 10,
            height: 90,
            marginRight: 50,
          }}>
          <Ionicons name="cart-outline" size={24} color="white" />

          <View>
            <Modal
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
                      placeholder="0"
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
          </View>
        </Button>
      );
    };

    return (
      <SafeAreaView>
        <Swipelist
          data={LimitHouseholdItem}
          renderRightItem={(data, index) => (
            <Box
              key={index}
              style={{
                width: SCREEN_WIDTH,
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
                  source={{ uri: data.garmentImagePath }}
                />
              </View>
              <View
                style={{
                  width: 57,
                  height: 65,
                  marginLeft: 40,
                  justifyContent: 'center',
                  alignItems: "center"

                }}>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  {data.categoryName}
                </Text>
                <View
                  style={{
                    width: 45,
                    height: 23,
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 4,
                    backgroundColor: "#DBDBDB",
                    justifyContent: "center",
                  }}>
                  <AntDesign
                    name="minussquareo"
                    size={13}
                    color="black"
                    style={{ marginTop: 4 }}
                  />
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
                  <AntDesign
                    name="plussquareo"
                    size={13}
                    color="black"
                    style={{ marginTop: 4 }}
                  />
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
                  {"₹"} {data.price}
                </Text>
              </View>
            </Box>
          )}
          renderHiddenItem={RightSwipe}
          rightOpenValue={100}
        />
      </SafeAreaView>
    );
  }




};
export default Category;

//COMPONENT RENDERING
// category Component Rendering//

// DUMMY DATA
const data = [
  {
    id: 1,
    Imageurl:
      "data:image/png;base64,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",
    name: "T-Shirt",
    Price: "₹ 50.00",
    quantity: "3",
  },

  {
    id: 2,
    Imageurl:
      "data:image/png;base64,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",
    name: "Jeans Pant",
    Price: "₹ 50.00",
    quantity: "1",
  },

  {
    id: 3,
    Imageurl:
      "data:image/png;base64,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",
    name: "Formal Shirt",
    Price: "₹ 50.00",
    quantity: "1",
  },

  {
    id: 4,
    Imageurl:
      "data:image/png;base64,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",
    name: "Blazer",
    Price: "₹ 50.00",
    quantity: "4",
  },

  {
    id: 5,
    Imageurl:
      "data:image/png;base64,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",
    name: "Night wear",
    Price: "₹ 450.00",
    quantity: "2",
  },
];



// MENS COMPONENT


// Women's COMPONENT
// function WomenComponent() {
//   const [ isVisible, setIsVisible ] = useState(false);

//   // second modal use state //
//   const [ visibleSecondModal, setVisibleSecondModal ] = useState(false);

//   const [ count, setCount ] = useState(0);

//   const incrementCount = () => {
//     setCount(count + 1);
//   };
//   const decrementCount = () => {
//     setCount(count - 1);
//   };

//   const handleAddCart = () => {
//     setIsVisible(true);
//   };

//   const handlePacking = () => {
//     setVisibleSecondModal(true);
//   };

//   const handleCloseModal = () => {
//     setIsVisible(false);
//   };

//   const handleCloseSecondModal = () => {
//     setVisibleSecondModal(false);
//   };
//   const RightSwipe = () => {
//     return (
//       <Button
//         onPress={handleAddCart}
//         style={{
//           marginTop: 20,
//           backgroundColor: "#002B6B",
//           width: 60,
//           borderRadius: 10,
//           height: 90,
//           marginRight: 50,
//         }}>
//         <Ionicons name="cart-outline" size={24} color="white" />

//         <View>
//           <Modal
//             isVisible={isVisible}
//             animationIn="bounce"
//             backdropColor="transparent">
//             <View
//               style={{
//                 width: 330,
//                 height: 720,
//                 left: 15,
//                 top: 0,
//                 borderColor: "#FFFFFF",
//                 borderWidth: 2,
//                 borderStyle: "solid",
//                 margin: "auto",
//                 backgroundColor: "#FFFFFF",
//                 borderRadius: 15,
//               }}>
//               <View
//                 style={{
//                   width: 310,
//                   height: 50,
//                   backgroundColor: "green",
//                   left: 8,
//                   top: 40,
//                 }}>
//                 <Text
//                   style={{
//                     textAlign: "center",
//                     fontSize: 22,
//                     marginTop: 15,
//                     color: "#FFFFFF",
//                   }}>
//                   Garments Details
//                 </Text>
//               </View>
//               <View style={{ top: 130, left: 14 }}>
//                 <View>
//                   <Text style={{ left: 6 }}>Price</Text>
//                   <TextInput
//                     style={styles.input1}
//                     keyboardType="number-pad"
//                     placeholder="0"
//                     placeholderTextColor="black"
//                   />
//                 </View>
//                 <View>
//                   <Text style={{ top: 20, left: 6 }}>Quantity</Text>
//                   <TextInput
//                     style={styles.input2}
//                     keyboardType="number-pad"
//                     placeholder="1"
//                     placeholderTextColor="black"
//                   />
//                 </View>
//               </View>
//               <View style={{ top: 150, left: 6 }}>
//                 <TouchableOpacity onPress={handlePacking}>
//                   <Text style={{ marginBottom: 16, fontSize: 16 }}>
//                     Packing
//                   </Text>
//                 </TouchableOpacity>

//                 <Modal
//                   isVisible={visibleSecondModal}
//                   animationIn="bounce"
//                   backdropColor="transparent">
//                   <View
//                     style={{
//                       width: 200,
//                       height: 300,
//                       left: 35,
//                       top: 70,
//                       borderColor: "#DCDCDE",
//                       borderWidth: 2,
//                       borderStyle: "solid",
//                       margin: "auto",
//                       backgroundColor: "#DCDCDE",
//                       borderRadius: 15,
//                     }}>
//                     <ScrollView>
//                       <Button
//                         style={{ backgroundColor: "red" }}
//                         onPress={handleCloseSecondModal}>
//                         Close
//                       </Button>

//                       <Text style={{ fontSize: 26 }}>HANGER</Text>
//                       <Text style={{ fontSize: 26 }}>NONE</Text>
//                       <Text style={{ fontSize: 26 }}>FOLD</Text>
//                       <Text style={{ fontSize: 26 }}>HALF/BOLD</Text>
//                       <Text style={{ fontSize: 26 }}>PACKING</Text>
//                     </ScrollView>
//                   </View>
//                 </Modal>

//                 <Text style={{ marginBottom: 16, fontSize: 16 }}>Brand</Text>

//                 <Text style={{ marginBottom: 16, fontSize: 16 }}>Defect</Text>

//                 <Text style={{ fontSize: 16 }}>Color</Text>
//               </View>

//               <View style={{ top: 200 }}>
//                 <Button
//                   style={{ width: 300, left: 14, height: 40 }}
//                   onPress={handleCloseModal}
//                   bgColor="deepskyblue">
//                   ADD GARMENT
//                 </Button>
//               </View>
//               <View style={{ top: 250 }}>
//                 <Button
//                   style={{ width: 300, left: 14, height: 40 }}
//                   onPress={handleCloseModal}
//                   bgColor="red.500">
//                   Close
//                 </Button>
//               </View>
//             </View>
//           </Modal>
//         </View>
//       </Button>
//     );
//   };

//   return (
//     <SafeAreaView>
//       <Swipelist
//         data={data}
//         renderRightItem={(data, index) => (
//           <Box
//             key={index}
//             style={{
//               width: SCREEN_WIDTH,
//               height: 90,
//               marginTop: 18,
//               display: "flex",
//               flexDirection: "row",
//               borderStyle: "solid",
//               borderColor: "#FFDBE680",
//               borderWidth: 1,
//               backgroundColor: "#FFDBE680",
//               marginLeft: 8,
//               borderRadius: 10,
//             }}>
//             <View style={{ marginLeft: 18 }}>
//               <Image
//                 style={{ height: 74, width: 74 }}
//                 alt="product-image"
//                 source={{ uri: data.Imageurl }}
//               />
//             </View>
//             <View
//               style={{
//                 width: 57,
//                 height: 65,
//                 marginLeft: 40,
//                 justifyContent: "center",
//               }}>
//               <Text style={{ fontSize: 16, textAlign: "center" }}>
//                 {data.name}
//               </Text>
//               <View
//                 style={{
//                   width: 45,
//                   height: 23,
//                   display: "flex",
//                   flexDirection: "row",
//                   marginTop: 4,
//                   backgroundColor: "#DBDBDB",
//                   justifyContent: "center",
//                 }}>
//                 <AntDesign
//                   name="minussquareo"
//                   size={13}
//                   color="black"
//                   style={{ marginTop: 4 }}
//                 />
//                 <Text
//                   style={{
//                     color: "#002B6B",
//                     fontSize: 14,
//                     fontWeight: "700",
//                     paddingLeft: 3,
//                     paddingRight: 3,
//                   }}>
//                   {data.quantity}
//                 </Text>
//                 <AntDesign
//                   name="plussquareo"
//                   size={13}
//                   color="black"
//                   style={{ marginTop: 4 }}
//                 />
//               </View>
//             </View>
//             <View
//               style={{
//                 width: 64,
//                 height: 45,
//                 marginLeft: 80,
//                 justifyContent: "center",
//                 marginTop: 14,
//               }}>
//               <Text style={{ fontSize: 16, color: "#000000" }}>
//                 {data.Price}
//               </Text>
//             </View>
//           </Box>
//         )}
//         renderHiddenItem={RightSwipe}
//         rightOpenValue={100}
//       />
//     </SafeAreaView>
//   );
// }

//Kids COMPONENT
// function KidsComponent() {
//   const [ isVisible, setIsVisible ] = useState(false);

//   // second modal use state //
//   const [ visibleSecondModal, setVisibleSecondModal ] = useState(false);

//   const [ count, setCount ] = useState(0);

//   const incrementCount = () => {
//     setCount(count + 1);
//   };
//   const decrementCount = () => {
//     setCount(count - 1);
//   };

//   const handleAddCart = () => {
//     setIsVisible(true);
//   };

//   const handlePacking = () => {
//     setVisibleSecondModal(true);
//   };

//   const handleCloseModal = () => {
//     setIsVisible(false);
//   };

//   const handleCloseSecondModal = () => {
//     setVisibleSecondModal(false);
//   };

//   const RightSwipe = () => {
//     return (
//       <Button
//         onPress={handleAddCart}
//         style={{
//           marginTop: 20,
//           backgroundColor: "#002B6B",
//           width: 60,
//           borderRadius: 10,
//           height: 90,
//           marginRight: 50,
//         }}>
//         <Ionicons name="cart-outline" size={24} color="white" />

//         <View>
//           <Modal
//             isVisible={isVisible}
//             animationIn="bounce"
//             backdropColor="transparent">
//             <View
//               style={{
//                 width: 330,
//                 height: 720,
//                 left: 15,
//                 top: 0,
//                 borderColor: "#FFFFFF",
//                 borderWidth: 2,
//                 borderStyle: "solid",
//                 margin: "auto",
//                 backgroundColor: "#FFFFFF",
//                 borderRadius: 15,
//               }}>
//               <View
//                 style={{
//                   width: 310,
//                   height: 50,
//                   backgroundColor: "green",
//                   left: 8,
//                   top: 40,
//                 }}>
//                 <Text
//                   style={{
//                     textAlign: "center",
//                     fontSize: 22,
//                     marginTop: 15,
//                     color: "#FFFFFF",
//                   }}>
//                   Garments Details
//                 </Text>
//               </View>
//               <View style={{ top: 130, left: 14 }}>
//                 <View>
//                   <Text style={{ left: 6 }}>Price</Text>
//                   <TextInput
//                     style={styles.input1}
//                     keyboardType="number-pad"
//                     placeholder="0"
//                     placeholderTextColor="black"
//                   />
//                 </View>
//                 <View>
//                   <Text style={{ top: 20, left: 6 }}>Quantity</Text>
//                   <TextInput
//                     style={styles.input2}
//                     keyboardType="number-pad"
//                     placeholder="1"
//                     placeholderTextColor="black"
//                   />
//                 </View>
//               </View>
//               <View style={{ top: 150, left: 6 }}>
//                 <TouchableOpacity onPress={handlePacking}>
//                   <Text style={{ marginBottom: 16, fontSize: 16 }}>
//                     Packing
//                   </Text>
//                 </TouchableOpacity>

//                 <Modal
//                   isVisible={visibleSecondModal}
//                   animationIn="bounce"
//                   backdropColor="transparent">
//                   <View
//                     style={{
//                       width: 200,
//                       height: 300,
//                       left: 35,
//                       top: 70,
//                       borderColor: "#DCDCDE",
//                       borderWidth: 2,
//                       borderStyle: "solid",
//                       margin: "auto",
//                       backgroundColor: "#DCDCDE",
//                       borderRadius: 15,
//                     }}>
//                     <ScrollView>
//                       <Button
//                         style={{ backgroundColor: "red" }}
//                         onPress={handleCloseSecondModal}>
//                         Close
//                       </Button>

//                       <Text style={{ fontSize: 26 }}>HANGER</Text>
//                       <Text style={{ fontSize: 26 }}>NONE</Text>
//                       <Text style={{ fontSize: 26 }}>FOLD</Text>
//                       <Text style={{ fontSize: 26 }}>HALF/BOLD</Text>
//                       <Text style={{ fontSize: 26 }}>PACKING</Text>
//                     </ScrollView>
//                   </View>
//                 </Modal>

//                 <Text style={{ marginBottom: 16, fontSize: 16 }}>Brand</Text>

//                 <Text style={{ marginBottom: 16, fontSize: 16 }}>Defect</Text>

//                 <Text style={{ fontSize: 16 }}>Color</Text>
//               </View>

//               <View style={{ top: 200 }}>
//                 <Button
//                   style={{ width: 300, left: 14, height: 40 }}
//                   onPress={handleCloseModal}
//                   bgColor="deepskyblue">
//                   ADD GARMENT
//                 </Button>
//               </View>
//               <View style={{ top: 250 }}>
//                 <Button
//                   style={{ width: 300, left: 14, height: 40 }}
//                   onPress={handleCloseModal}
//                   bgColor="red.500">
//                   Close
//                 </Button>
//               </View>
//             </View>
//           </Modal>
//         </View>
//       </Button>
//     );
//   };

//   return (
//     <SafeAreaView>
//       <Swipelist
//         data={data}
//         renderRightItem={(data, index) => (
//           <Box
//             key={index}
//             style={{
//               width: SCREEN_WIDTH,
//               height: 90,
//               marginTop: 18,
//               display: "flex",
//               flexDirection: "row",
//               borderStyle: "solid",
//               borderColor: "#FFDBE680",
//               borderWidth: 1,
//               backgroundColor: "#FFDBE680",
//               marginLeft: 8,
//               borderRadius: 10,
//             }}>
//             <View style={{ marginLeft: 18 }}>
//               <Image
//                 style={{ height: 74, width: 74 }}
//                 alt="product-image"
//                 source={{ uri: data.Imageurl }}
//               />
//             </View>
//             <View
//               style={{
//                 width: 57,
//                 height: 65,
//                 marginLeft: 40,
//                 justifyContent: "center",
//               }}>
//               <Text style={{ fontSize: 16, textAlign: "center" }}>
//                 {data.name}
//               </Text>
//               <View
//                 style={{
//                   width: 45,
//                   height: 23,
//                   display: "flex",
//                   flexDirection: "row",
//                   marginTop: 4,
//                   backgroundColor: "#DBDBDB",
//                   justifyContent: "center",
//                 }}>
//                 <AntDesign
//                   name="minussquareo"
//                   size={13}
//                   color="black"
//                   style={{ marginTop: 4 }}
//                 />
//                 <Text
//                   style={{
//                     color: "#002B6B",
//                     fontSize: 16,
//                     fontWeight: "700",
//                     paddingLeft: 3,
//                     paddingRight: 3,
//                   }}>
//                   {data.quantity}
//                 </Text>
//                 <AntDesign
//                   name="plussquareo"
//                   size={13}
//                   color="black"
//                   style={{ marginTop: 4 }}
//                 />
//               </View>
//             </View>
//             <View
//               style={{
//                 width: 64,
//                 height: 45,
//                 marginLeft: 80,
//                 justifyContent: "center",
//                 marginTop: 14,
//               }}>
//               <Text style={{ fontSize: 16, color: "#000000" }}>
//                 {data.Price}
//               </Text>
//             </View>
//           </Box>
//         )}
//         renderHiddenItem={RightSwipe}
//         rightOpenValue={100}
//       />
//     </SafeAreaView>
//   );
// }

//WEDDINGS COMPONENT
// function HouseholdComponent() {
//   const [ isVisible, setIsVisible ] = useState(false);

//   // second modal use state //
//   const [ visibleSecondModal, setVisibleSecondModal ] = useState(false);

//   const [ count, setCount ] = useState(0);

//   const incrementCount = () => {
//     setCount(count + 1);
//   };
//   const decrementCount = () => {
//     setCount(count - 1);
//   };

//   const handleAddCart = () => {
//     setIsVisible(true);
//   };

//   const handlePacking = () => {
//     setVisibleSecondModal(true);
//   };

//   const handleCloseModal = () => {
//     setIsVisible(false);
//   };

//   const handleCloseSecondModal = () => {
//     setVisibleSecondModal(false);
//   };
//   const RightSwipe = () => {
//     return (
//       <Button
//         onPress={handleAddCart}
//         style={{
//           marginTop: 20,
//           backgroundColor: "#002B6B",
//           width: 60,
//           borderRadius: 10,
//           height: 90,
//           marginRight: 50,
//         }}>
//         <Ionicons name="cart-outline" size={24} color="white" />

//         <View>
//           <Modal
//             isVisible={isVisible}
//             animationIn="bounce"
//             backdropColor="transparent">
//             <View
//               style={{
//                 width: 330,
//                 height: 720,
//                 left: 15,
//                 top: 0,
//                 borderColor: "#FFFFFF",
//                 borderWidth: 2,
//                 borderStyle: "solid",
//                 margin: "auto",
//                 backgroundColor: "#FFFFFF",
//                 borderRadius: 15,
//               }}>
//               <View
//                 style={{
//                   width: 310,
//                   height: 50,
//                   backgroundColor: "green",
//                   left: 8,
//                   top: 40,
//                 }}>
//                 <Text
//                   style={{
//                     textAlign: "center",
//                     fontSize: 22,
//                     marginTop: 15,
//                     color: "#FFFFFF",
//                   }}>
//                   Garments Details
//                 </Text>
//               </View>
//               <View style={{ top: 130, left: 14 }}>
//                 <View>
//                   <Text style={{ left: 6 }}>Price</Text>
//                   <TextInput
//                     style={styles.input1}
//                     keyboardType="number-pad"
//                     placeholder="0"
//                     placeholderTextColor="black"
//                   />
//                 </View>
//                 <View>
//                   <Text style={{ top: 20, left: 6 }}>Quantity</Text>
//                   <TextInput
//                     style={styles.input2}
//                     keyboardType="number-pad"
//                     placeholder="1"
//                     placeholderTextColor="black"
//                   />
//                 </View>
//               </View>
//               <View style={{ top: 150, left: 6 }}>
//                 <TouchableOpacity onPress={handlePacking}>
//                   <Text style={{ marginBottom: 16, fontSize: 16 }}>
//                     Packing
//                   </Text>
//                 </TouchableOpacity>

//                 <Modal
//                   isVisible={visibleSecondModal}
//                   animationIn="bounce"
//                   backdropColor="transparent">
//                   <View
//                     style={{
//                       width: 200,
//                       height: 300,
//                       left: 35,
//                       top: 70,
//                       borderColor: "#DCDCDE",
//                       borderWidth: 2,
//                       borderStyle: "solid",
//                       margin: "auto",
//                       backgroundColor: "#DCDCDE",
//                       borderRadius: 15,
//                     }}>
//                     <ScrollView>
//                       <Button
//                         style={{ backgroundColor: "red" }}
//                         onPress={handleCloseSecondModal}>
//                         Close
//                       </Button>

//                       <Text style={{ fontSize: 26 }}>HANGER</Text>
//                       <Text style={{ fontSize: 26 }}>NONE</Text>
//                       <Text style={{ fontSize: 26 }}>FOLD</Text>
//                       <Text style={{ fontSize: 26 }}>HALF/BOLD</Text>
//                       <Text style={{ fontSize: 26 }}>PACKING</Text>
//                     </ScrollView>
//                   </View>
//                 </Modal>

//                 <Text style={{ marginBottom: 16, fontSize: 16 }}>Brand</Text>

//                 <Text style={{ marginBottom: 16, fontSize: 16 }}>Defect</Text>

//                 <Text style={{ fontSize: 16 }}>Color</Text>
//               </View>

//               <View style={{ top: 200 }}>
//                 <Button
//                   style={{ width: 300, left: 14, height: 40 }}
//                   onPress={handleCloseModal}
//                   bgColor="deepskyblue">
//                   ADD GARMENT
//                 </Button>
//               </View>
//               <View style={{ top: 250 }}>
//                 <Button
//                   style={{ width: 300, left: 14, height: 40 }}
//                   onPress={handleCloseModal}
//                   bgColor="red.500">
//                   Close
//                 </Button>
//               </View>
//             </View>
//           </Modal>
//         </View>
//       </Button>
//     );
//   };

//   return (
//     <SafeAreaView>
//       <Swipelist
//         data={data}
//         renderRightItem={(data, index) => (
//           <Box
//             key={index}
//             style={{
//               width: SCREEN_WIDTH,
//               height: 90,
//               marginTop: 18,
//               display: "flex",
//               flexDirection: "row",
//               borderStyle: "solid",
//               borderColor: "#FFDBE680",
//               borderWidth: 1,
//               backgroundColor: "#FFDBE680",
//               marginLeft: 8,
//               borderRadius: 10,
//             }}>
//             <View style={{ marginLeft: 18 }}>
//               <Image
//                 style={{ height: 74, width: 74 }}
//                 alt="product-image"
//                 source={{ uri: data.Imageurl }}
//               />
//             </View>
//             <View
//               style={{
//                 width: 57,
//                 height: 65,
//                 marginLeft: 40,
//                 justifyContent: "center",
//               }}>
//               <Text style={{ fontSize: 16, textAlign: "center" }}>
//                 {data.name}
//               </Text>
//               <View
//                 style={{
//                   width: 45,
//                   height: 23,
//                   display: "flex",
//                   flexDirection: "row",
//                   marginTop: 4,
//                   backgroundColor: "#DBDBDB",
//                   justifyContent: "center",
//                 }}>
//                 <AntDesign
//                   name="minussquareo"
//                   size={13}
//                   color="black"
//                   style={{ marginTop: 4 }}
//                 />
//                 <Text
//                   style={{
//                     color: "#002B6B",
//                     fontSize: 14,
//                     fontWeight: "700",
//                     paddingLeft: 3,
//                     paddingRight: 3,
//                   }}>
//                   {data.quantity}
//                 </Text>
//                 <AntDesign
//                   name="plussquareo"
//                   size={13}
//                   color="black"
//                   style={{ marginTop: 4 }}
//                 />
//               </View>
//             </View>
//             <View
//               style={{
//                 width: 64,
//                 height: 45,
//                 marginLeft: 80,
//                 justifyContent: "center",
//                 marginTop: 14,
//               }}>
//               <Text style={{ fontSize: 16, color: "#000000" }}>
//                 {data.Price}
//               </Text>
//             </View>
//           </Box>
//         )}
//         renderHiddenItem={RightSwipe}
//         rightOpenValue={100}
//       />
//     </SafeAreaView>
//   );
// }

//WOOLENS COMPONENT
function WoolensComponent() {
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

  const handleAddCart = () => {
    setIsVisible(true);
  };

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
      <Button
        onPress={handleAddCart}
        style={{
          marginTop: 20,
          backgroundColor: "#002B6B",
          width: 60,
          borderRadius: 10,
          height: 90,
          marginRight: 50,
        }}>
        <Ionicons name="cart-outline" size={24} color="white" />

        <View>
          <Modal
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
                    placeholder="0"
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
        </View>
      </Button>
    );
  };

  return (
    <SafeAreaView>
      <Swipelist
        data={data}
        renderRightItem={(data, index) => (
          <Box
            key={index}
            style={{
              width: SCREEN_WIDTH,
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
                source={{ uri: data.Imageurl }}
              />
            </View>
            <View
              style={{
                width: 57,
                height: 65,
                marginLeft: 40,
                justifyContent: "center",
              }}>
              <Text style={{ fontSize: 16, textAlign: "center" }}>
                {data.name}
              </Text>
              <View
                style={{
                  width: 45,
                  height: 23,
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 4,
                  backgroundColor: "#DBDBDB",
                  justifyContent: "center",
                }}>
                <AntDesign
                  name="minussquareo"
                  size={13}
                  color="black"
                  style={{ marginTop: 4 }}
                />
                <Text
                  style={{
                    color: "#002B6B",
                    fontSize: 14,
                    fontWeight: "700",
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}>
                  {data.quantity}
                </Text>
                <AntDesign
                  name="plussquareo"
                  size={13}
                  color="black"
                  style={{ marginTop: 4 }}
                />
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
                {data.Price}
              </Text>
            </View>
          </Box>
        )}
        renderHiddenItem={RightSwipe}
        rightOpenValue={100}
      />
    </SafeAreaView>
  );
}

//  OTHERS COMPONENT
function OthersComponent() {
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

  const handleAddCart = () => {
    setIsVisible(true);
  };

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
      <Button
        onPress={handleAddCart}
        style={{
          marginTop: 20,
          backgroundColor: "#002B6B",
          width: 60,
          borderRadius: 10,
          height: 90,
          marginRight: 50,
        }}>
        <Ionicons name="cart-outline" size={24} color="white" />

        <View>
          <Modal
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
                    placeholder="0"
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
        </View>
      </Button>
    );
  };

  return (
    <SafeAreaView>
      <Swipelist
        data={data}
        renderRightItem={(data, index) => (
          <Box
            key={index}
            style={{
              width: SCREEN_WIDTH,
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
                source={{ uri: data.Imageurl }}
              />
            </View>
            <View
              style={{
                width: 57,
                height: 65,
                marginLeft: 40,
                justifyContent: "center",
              }}>
              <Text style={{ fontSize: 16, textAlign: "center" }}>
                {data.name}
              </Text>
              <View
                style={{
                  width: 45,
                  height: 23,
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 4,
                  backgroundColor: "#DBDBDB",
                  justifyContent: "center",
                }}>
                <AntDesign
                  name="minussquareo"
                  size={13}
                  color="black"
                  style={{ marginTop: 4 }}
                />
                <Text
                  style={{
                    color: "#002B6B",
                    fontSize: 14,
                    fontWeight: "700",
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}>
                  {data.quantity}
                </Text>
                <AntDesign
                  name="plussquareo"
                  size={13}
                  color="black"
                  style={{ marginTop: 4 }}
                />
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
                {data.Price}
              </Text>
            </View>
          </Box>
        )}
        renderHiddenItem={RightSwipe}
        rightOpenValue={100}
      />
    </SafeAreaView>
  );
}

// OFFICE COMPONENT
function OfficesComponent() {
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

  const handleAddCart = () => {
    setIsVisible(true);
  };

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
      <Button
        onPress={handleAddCart}
        style={{
          marginTop: 20,
          backgroundColor: "#002B6B",
          width: 60,
          borderRadius: 10,
          height: 90,
          marginRight: 50,
        }}>
        <Ionicons name="cart-outline" size={24} color="white" />

        <View>
          <Modal
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
                    placeholder="0"
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
        </View>
      </Button>
    );
  };

  return (
    <SafeAreaView>
      <Swipelist
        data={data}
        renderRightItem={(
          data: { Imageurl: any; name: any; quantity: any; Price: any },
          index: Key | null | undefined
        ) => (
          <Box
            key={index}
            style={{
              width: SCREEN_WIDTH,
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
                source={{ uri: data.Imageurl }}
              />
            </View>
            <View
              style={{
                width: 57,
                height: 65,
                marginLeft: 40,
                justifyContent: "center",
              }}>
              <Text style={{ fontSize: 16, textAlign: "center" }}>
                {data.name}
              </Text>
              <View
                style={{
                  width: 45,
                  height: 23,
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 4,
                  backgroundColor: "#DBDBDB",
                  justifyContent: "center",
                }}>
                <AntDesign
                  name="minussquareo"
                  size={13}
                  color="black"
                  style={{ marginTop: 4 }}
                />
                <Text
                  style={{
                    color: "#002B6B",
                    fontSize: 14,
                    fontWeight: "700",
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}>
                  {data.quantity}
                </Text>
                <AntDesign
                  name="plussquareo"
                  size={13}
                  color="black"
                  style={{ marginTop: 4 }}
                />
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
                {data.Price}
              </Text>
            </View>
          </Box>
        )}
        renderHiddenItem={RightSwipe}
        rightOpenValue={100}
      />
    </SafeAreaView>
  );
}







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
