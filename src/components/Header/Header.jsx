import { View, Text, Image } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import React from 'react'

const Header = () => {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}>
            <AntDesign
                name="left"
                size={24}
                color="#5D7EFC"
                style={{ marginTop: 30, marginLeft: 20 }}
            />

            <Image
                alt="ios-notifications-outline"
                height="22px"
                width="22px"
                source={require("../../assets/Photos/Vector.png")}
                style={{ marginTop: 30, marginRight: 30 }}
            />
        </View>
    )
}

export default Header