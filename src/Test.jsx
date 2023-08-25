<Box style={homepage.boxLeftIcon}>
<Box style={{ width: 100, height: 50, marginTop: 10 }}>
  <Ionicons name="logo-apple" size={46} color="black" />
</Box>
<Box
  style={{
    display: "flex",
    flexDirection: "row-reverse",
    right: 14,
  }}
>
  <Image
    style={homepage.imageDp}
    alt="profile-pic"
    // source={data?.image}
    source={{
      uri: "https://lh3.googleusercontent.com/ogw/AOLn63Gvcqud18bpZN8SVHtRZYQQ-49QfjkzyNVWHyrW8w=s32-c-mo",
    }}
  />

  <View>
    <Button 
    onPress={handleLogout}
    style={{ top: 18, right: 6, borderRadius: 9 }}>
      Logout
    </Button>
    {/* <CustomButton btnTittle="Logout" bg="cyan"  /> */}
  </View>

  <TouchableOpacity
    onPress={() => {
      navigation.navigate("Notification");
    }}
  >
    <Image
      alt="ios-notifications-outline"
      source={require("../../assets/Photos/Vector.png")}
      style={{
        marginTop: 30,
        marginRight: 20,
        height: 22,
        width: 22,
      }}
    />
  </TouchableOpacity>
</Box>
</Box>