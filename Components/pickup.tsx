import {
    View,
    SafeAreaView,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Touchable,
    Alert,
} from "react-native";
import { Box, Text, ScrollView } from "native-base";

import React from "react";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import Octicons from "@expo/vector-icons/build/Octicons";


interface NavigationProps {
    navigation?: any;
}

const Pickup = ({ navigation }: NavigationProps) => {

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
                                backgroundColor: "#FFFCFC",
                                width: 242,
                                height: 34,
                                marginTop: 25,
                                display: "flex",
                                flexDirection: "row",
                            }}>
                            <View style={{ marginTop: 6, marginLeft: 9.5 }}>
                                <Octicons name="search" size={20} color="black" />
                            </View>
                            <View style={{ height: 23, width: 90 }}>
                                <TextInput
                                    style={[ styles.input ]}
                                    placeholder="Search Here"></TextInput>
                            </View>
                        </Box>

                        <Image
                            alt="ios-bars"
                            source={require("../assets/Photos/bar.png")}
                            style={{ marginTop: 32, marginRight: 20, height: 22, width: 22 }}
                        />
                    </Box>
                    {/* order container starts here */}

                    {/* first card starts here */}

                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            top: 20,
                            right: 5,
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Category");
                            }}>
                            <View style={[ styles.Viewcard ]}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "400",
                                            color: "#003566",
                                            marginTop: 15,
                                            marginLeft: 8,
                                        }}>
                                        Aksha Tiyagi
                                    </Text>
                                    <Box
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            height: 20,
                                            width: 79,
                                            marginTop: 16.8,
                                            justifyContent: "center",
                                            backgroundColor: "#D9D9D9",
                                            marginLeft: 9,
                                            borderRadius: 2,
                                            paddingBottom: 2,
                                        }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text style={{ fontSize: 10 }}>02-07-2023</Text>
                                        </View>
                                        <Image
                                            style={{ marginTop: 5, marginLeft: 4 }}
                                            alt="calendar"
                                            source={require("../assets/Photos/calendar.png")}
                                        />
                                    </Box>
                                </View>

                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        height: 20,
                                        width: 104,
                                        marginTop: 5,
                                        justifyContent: "center",
                                        backgroundColor: "#D9D9D9",
                                        marginLeft: 72.9,
                                        borderRadius: 2,
                                    }}>
                                    <View style={{ justifyContent: "center" }}>
                                        <Text style={{ fontSize: 10 }}>9:00am-10:00pm</Text>
                                    </View>
                                    <Image
                                        style={{ marginTop: 5, marginLeft: 4 }}
                                        alt="calendar"
                                        source={require("../assets/Photos/stopwatch.png")}
                                    />
                                </Box>
                                <View
                                    style={{
                                        width: 169,
                                        height: 24,
                                        borderStyle: "solid",
                                        borderColor: "#002B6B1F",
                                        backgroundColor: "#002B6B",
                                        marginTop: 7,
                                        marginLeft: 5,
                                        borderRadius: 4,
                                    }}>
                                    <Text
                                        style={{
                                            color: "#FFFF",
                                            textAlign: "center",
                                            fontSize: 11,
                                            fontWeight: "500",
                                            marginTop: 1.9,
                                        }}>
                                        9765438906
                                    </Text>
                                </View>

                                <View style={{ width: 160, height: 45, marginLeft: 10 }}>
                                    <Text
                                        style={{
                                            color: "#000000",
                                            textAlign: "center",
                                            fontSize: 12,
                                            fontWeight: "500",
                                            marginTop: 5,
                                        }}>
                                        Request Received by Rider
                                    </Text>
                                </View>
                                <View style={{ width: 172, height: 70 }}>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}>
                                        <View style={{ marginLeft: 10, width: 41, height: 45 }}>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    color: "#000000",
                                                    fontWeight: "400",
                                                }}>
                                                Address
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 0 }}>
                                            <Text style={{ fontSize: 6, fontWeight: "400" }}>
                                                Edit
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ width: 161, height: 19, marginLeft: 8 }}>
                                        <Text style={{ fontSize: 10, lineHeight: 9.5 }}>
                                            GK-2 Ghyan Khand plot no-457 Floor 5th ,Near Aggarwal
                                            Sweets
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("Accountinfo");
                                            }}>
                                            <View
                                                style={{
                                                    width: 169,
                                                    height: 24,
                                                    borderStyle: "solid",
                                                    borderColor: "#002B6B1F",
                                                    backgroundColor: "#11A7E1",
                                                    marginTop: 10,
                                                    borderRadius: 4,
                                                }}>
                                                <Text
                                                    style={{
                                                        color: "#FFFF",
                                                        textAlign: "center",
                                                        fontSize: 11,
                                                        fontWeight: "500",
                                                        marginTop: 1,
                                                    }}>
                                                    Account Info
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* second card starts here */}

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Category");
                            }}>
                            <View style={[ styles.Viewcard ]}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "400",
                                            color: "#003566",
                                            marginTop: 15,
                                            marginLeft: 8,
                                        }}>
                                        Aksha Tiyagi
                                    </Text>
                                    <Box
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            height: 20,
                                            width: 79,
                                            marginTop: 16.8,
                                            justifyContent: "center",
                                            backgroundColor: "#D9D9D9",
                                            marginLeft: 10,
                                            borderRadius: 2,
                                            alignItems: "center",
                                        }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text style={{ fontSize: 10, textAlign: "center" }}>
                                                02-07-2023
                                            </Text>
                                        </View>
                                        <Image
                                            style={{ marginTop: 4, marginLeft: 4 }}
                                            alt="calendar"
                                            source={require("../assets/Photos/calendar.png")}
                                        />
                                    </Box>
                                </View>
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        height: 20,
                                        width: 104,
                                        marginTop: 5,
                                        justifyContent: "center",
                                        backgroundColor: "#D9D9D9",
                                        marginLeft: 72.9,
                                        borderRadius: 2,
                                    }}>
                                    <View style={{ justifyContent: "center" }}>
                                        <Text style={{ fontSize: 10 }}>9:00am-10:00pm</Text>
                                    </View>
                                    <Image
                                        style={{ marginTop: 5, marginLeft: 4 }}
                                        alt="calendar"
                                        source={require("../assets/Photos/stopwatch.png")}
                                    />
                                </Box>
                                <View
                                    style={{
                                        width: 169,
                                        height: 24,
                                        borderStyle: "solid",
                                        borderColor: "#002B6B1F",
                                        backgroundColor: "#002B6B",
                                        marginTop: 7,
                                        marginLeft: 5,
                                        borderRadius: 4,
                                    }}>
                                    <Text
                                        style={{
                                            color: "#FFFF",
                                            textAlign: "center",
                                            fontSize: 11,
                                            fontWeight: "500",
                                            marginTop: 1.9,
                                        }}>
                                        9765438906
                                    </Text>
                                </View>

                                <View style={{ width: 160, height: 45, marginLeft: 8 }}>
                                    <Text
                                        style={{
                                            color: "#000000",
                                            textAlign: "center",
                                            fontSize: 12,
                                            fontWeight: "500",
                                            marginTop: 5,
                                        }}>
                                        Request Received by Rider
                                    </Text>
                                </View>
                                <View style={{ width: 172, height: 70 }}>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}>
                                        <View style={{ marginLeft: 10, width: 41, height: 45 }}>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    color: "#000000",
                                                    fontWeight: "400",
                                                }}>
                                                Address
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 0 }}>
                                            <Text style={{ fontSize: 6, fontWeight: "400" }}>
                                                Edit
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ width: 161, height: 19, marginLeft: 8 }}>
                                        <Text style={{ fontSize: 10, lineHeight: 9.5 }}>
                                            GK-2 Ghyan Khand plot no-457 Floor 5th ,Near Aggarwal
                                            Sweets
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("Accountinfo");
                                            }}>
                                            <View
                                                style={{
                                                    width: 169,
                                                    height: 24,
                                                    borderStyle: "solid",
                                                    borderColor: "#002B6B1F",
                                                    backgroundColor: "#11A7E1",
                                                    marginTop: 10,
                                                    borderRadius: 4,
                                                }}>
                                                <Text
                                                    style={{
                                                        color: "#FFFF",
                                                        textAlign: "center",
                                                        fontSize: 11,
                                                        fontWeight: "500",
                                                        marginTop: 1,
                                                    }}>
                                                    Account Info
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Box>

                    {/* third card starts here */}

                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            height: 225,
                            width: 390,
                            marginTop: 16,
                            top: 10,
                            right: 5,
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Category");
                            }}>
                            <View style={[ styles.Viewcard ]}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "400",
                                            color: "#003566",
                                            marginTop: 15,
                                            marginLeft: 8,
                                        }}>
                                        Aksha Tiyagi
                                    </Text>
                                    <Box
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            height: 20,
                                            width: 79,
                                            marginTop: 16.8,
                                            justifyContent: "center",
                                            backgroundColor: "#D9D9D9",
                                            marginLeft: 9,
                                            borderRadius: 2,
                                        }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text style={{ fontSize: 10, textAlign: "center" }}>
                                                02-07-2023
                                            </Text>
                                        </View>
                                        <Image
                                            style={{ marginTop: 5, marginLeft: 4 }}
                                            alt="calendar"
                                            source={require("../assets/Photos/calendar.png")}
                                        />
                                    </Box>
                                </View>
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        height: 20,
                                        width: 104,
                                        marginTop: 5,
                                        justifyContent: "center",
                                        backgroundColor: "#D9D9D9",
                                        marginLeft: 72.9,
                                        borderRadius: 2,
                                    }}>
                                    <View style={{ justifyContent: "center" }}>
                                        <Text style={{ fontSize: 10 }}>9:00am-10:00pm</Text>
                                    </View>
                                    <Image
                                        style={{ marginTop: 5, marginLeft: 4 }}
                                        alt="calendar"
                                        source={require("../assets/Photos/stopwatch.png")}
                                    />
                                </Box>
                                <View
                                    style={{
                                        width: 169,
                                        height: 24,
                                        borderStyle: "solid",
                                        borderColor: "#002B6B1F",
                                        backgroundColor: "#002B6B",
                                        marginTop: 7,
                                        marginLeft: 5,
                                        borderRadius: 4,
                                    }}>
                                    <Text
                                        style={{
                                            color: "#FFFF",
                                            textAlign: "center",
                                            fontSize: 11,
                                            fontWeight: "500",
                                            marginTop: 1.9,
                                        }}>
                                        9765438906
                                    </Text>
                                </View>

                                <View style={{ width: 160, height: 45, marginLeft: 8 }}>
                                    <Text
                                        style={{
                                            color: "#000000",
                                            textAlign: "center",
                                            fontSize: 12,
                                            fontWeight: "500",
                                            marginTop: 5,
                                        }}>
                                        Request Received by Rider
                                    </Text>
                                </View>
                                <View style={{ width: 172, height: 70 }}>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}>
                                        <View style={{ marginLeft: 10, width: 41, height: 45 }}>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    color: "#000000",
                                                    fontWeight: "400",
                                                }}>
                                                Address
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 0 }}>
                                            <Text style={{ fontSize: 6, fontWeight: "400" }}>
                                                Edit
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ width: 161, height: 19, marginLeft: 8 }}>
                                        <Text style={{ fontSize: 10, lineHeight: 9.5 }}>
                                            GK-2 Ghyan Khand plot no-457 Floor 5th ,Near Aggarwal
                                            Sweets
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("Accountinfo");
                                            }}>
                                            <View
                                                style={{
                                                    width: 169,
                                                    height: 24,
                                                    borderStyle: "solid",
                                                    borderColor: "#002B6B1F",
                                                    backgroundColor: "#11A7E1",
                                                    marginTop: 10,
                                                    borderRadius: 4,
                                                }}>
                                                <Text
                                                    style={{
                                                        color: "#FFFF",
                                                        textAlign: "center",
                                                        fontSize: 11,
                                                        fontWeight: "500",
                                                        marginTop: 1,
                                                    }}>
                                                    Account Info
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* fourth card starts  */}

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Category");
                            }}>
                            <View style={[ styles.Viewcard ]}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "400",
                                            color: "#003566",
                                            marginTop: 15,
                                            marginLeft: 8,
                                        }}>
                                        Aksha Tiyagi
                                    </Text>
                                    <Box
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            height: 20,
                                            width: 79,
                                            marginTop: 16.8,
                                            justifyContent: "center",
                                            backgroundColor: "#D9D9D9",
                                            marginLeft: 9,
                                            borderRadius: 2,
                                        }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text style={{ fontSize: 10, textAlign: "center" }}>
                                                02-07-2023
                                            </Text>
                                        </View>
                                        <Image
                                            style={{ marginTop: 5, marginLeft: 4 }}
                                            alt="calendar"
                                            source={require("../assets/Photos/calendar.png")}
                                        />
                                    </Box>
                                </View>
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        height: 20,
                                        width: 104,
                                        marginTop: 5,
                                        justifyContent: "center",
                                        backgroundColor: "#D9D9D9",
                                        marginLeft: 72.9,
                                        borderRadius: 2,
                                    }}>
                                    <View style={{ justifyContent: "center" }}>
                                        <Text style={{ fontSize: 10 }}>9:00am-10:00pm</Text>
                                    </View>
                                    <Image
                                        style={{ marginTop: 5, marginLeft: 4 }}
                                        alt="calendar"
                                        source={require("../assets/Photos/stopwatch.png")}
                                    />
                                </Box>
                                <View
                                    style={{
                                        width: 169,
                                        height: 24,
                                        borderStyle: "solid",
                                        borderColor: "#002B6B1F",
                                        backgroundColor: "#002B6B",
                                        marginTop: 7,
                                        marginLeft: 5,
                                        borderRadius: 4,
                                    }}>
                                    <Text
                                        style={{
                                            color: "#FFFF",
                                            textAlign: "center",
                                            fontSize: 11,
                                            fontWeight: "500",
                                            marginTop: 1.9,
                                        }}>
                                        9765438906
                                    </Text>
                                </View>

                                <View style={{ width: 160, height: 45, marginLeft: 10 }}>
                                    <Text
                                        style={{
                                            color: "#000000",
                                            textAlign: "center",
                                            fontSize: 12,
                                            fontWeight: "500",
                                            marginTop: 5,
                                        }}>
                                        Request Received by Rider
                                    </Text>
                                </View>
                                <View style={{ width: 172, height: 70 }}>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}>
                                        <View style={{ marginLeft: 10, width: 41, height: 45 }}>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    color: "#000000",
                                                    fontWeight: "400",
                                                }}>
                                                Address
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 0 }}>
                                            <Text style={{ fontSize: 6, fontWeight: "400" }}>
                                                Edit
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ width: 161, height: 19, marginLeft: 8 }}>
                                        <Text style={{ fontSize: 10, lineHeight: 9.5 }}>
                                            GK-2 Ghyan Khand plot no-457 Floor 5th ,Near Aggarwal
                                            Sweets
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("Accountinfo");
                                            }}>
                                            <View
                                                style={{
                                                    width: 169,
                                                    height: 24,
                                                    borderStyle: "solid",
                                                    borderColor: "#002B6B1F",
                                                    backgroundColor: "#11A7E1",
                                                    marginTop: 10,
                                                    borderRadius: 4,
                                                }}>
                                                <Text
                                                    style={{
                                                        color: "#FFFF",
                                                        textAlign: "center",
                                                        fontSize: 11,
                                                        fontWeight: "500",
                                                        marginTop: 1,
                                                    }}>
                                                    Account Info
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Box>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    Viewcard: {
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        borderStyle: "solid",
        borderColor: "#002B6B1F",
        height: 250,
        width: 185,
        borderWidth: 1,
        marginLeft: 10,
    },
    input: {
        fontSize: 16,
        lineHeight: 22.5,
        marginTop: 7,
        marginLeft: 5,
        fontWeight: "400",
        width: 190,
        height: 23,
        textAlign: "center",
        color: "black",
        backgroundColor: "#FFFCFC",
    },
});
export default Pickup;
